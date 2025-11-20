
'use client';
import { useState, useEffect } from 'react';
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { FileText, CreditCard, Heart, Calendar, Users, LogOut, User as UserIcon, Hotel } from "lucide-react";
import { useLocale } from "@/hooks/use-locale";
import { sharedState } from '@/lib/mock-db';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Label } from '@/components/ui/label';

export default function DashboardPage() {
  const { t } = useLocale();
  const { toast } = useToast();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState({ name: '', email: '', phone: '' });
  const [contracts, setContracts] = useState<any[]>([]);
  const [accommodations, setAccommodations] = useState<any[]>([]);
  const [isViewDialogOpen, setViewDialogOpen] = useState(false);
  const [viewedContract, setViewedContract] = useState<any>(null);

  useEffect(() => {
    // We need to check if we are on the client side
    if (typeof window !== 'undefined') {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
            setProfileData({ name: parsedUser.name, email: parsedUser.email, phone: parsedUser.phone || '' });
            
            const initialState = sharedState.getState();
            setContracts(initialState.contracts.filter((c: any) => c.client === parsedUser.name));
            setAccommodations(initialState.accommodations.filter((acc: any) => acc.client === parsedUser.name));
            
            const unsubscribe = sharedState.subscribe(state => {
              setContracts(state.contracts.filter((c: any) => c.client === parsedUser.name));
              setAccommodations(state.accommodations.filter((acc: any) => acc.client === parsedUser.name));
            });

            setLoading(false);
            return () => unsubscribe();
        } else {
            router.push('/login');
        }
    }
  }, [router]);

  const handleSignContract = (contractToSign: any) => {
    const allContracts = sharedState.getState().contracts;
    const updatedContracts = allContracts.map((c: any) => 
        c.client === contractToSign.client && c.document === contractToSign.document
        ? { ...c, status: "Completed" }
        : c
    );
    sharedState.setState({ contracts: updatedContracts });
    setViewDialogOpen(false);
    toast({
      title: t.dashboard.toast.title,
      description: t.dashboard.toast.description.replace('{document}', contractToSign.document)
    });
  }

  const handleViewContract = (contract: any) => {
    setViewedContract(contract);
    setViewDialogOpen(true);
  }
  
  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/login');
  };

  const handleProfileUpdate = () => {
    // In a real app, this would call an API
    if (user) {
        const updatedUser = { ...user, ...profileData };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setUser(updatedUser);
        toast({
          title: "Profil mis à jour",
          description: "Vos informations ont été sauvegardées.",
        });
    }
  };

  if (loading) {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
        </div>
    );
  }

  if (!user) {
    // This part should ideally not be reached if the redirection logic in useEffect is correct,
    // but it's a good fallback.
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 py-12 bg-secondary/30">
        <div className="container max-w-7xl">
          <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold font-headline">{t.dashboard.title.replace("Alex & Jordan", user.name)}</h1>
              <p className="text-muted-foreground">{t.dashboard.subtitle}</p>
            </div>
             <div className="flex items-center gap-4">
               <Button asChild>
                  <Link href="/contact">{t.dashboard.contact_planner}</Link>
               </Button>
               <Button variant="outline" onClick={handleLogout}>
                 <LogOut className="mr-2" /> Déconnexion
               </Button>
             </div>
          </div>

          <Tabs defaultValue="overview">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-5">
              <TabsTrigger value="overview"><Heart className="mr-2" />{t.dashboard.tabs.overview}</TabsTrigger>
              <TabsTrigger value="contracts"><FileText className="mr-2" />{t.dashboard.tabs.contracts}</TabsTrigger>
              <TabsTrigger value="payments"><CreditCard className="mr-2" />{t.dashboard.tabs.payments}</TabsTrigger>
              <TabsTrigger value="accommodations"><Hotel className="mr-2"/>Hébergements</TabsTrigger>
              <TabsTrigger value="profile"><UserIcon className="mr-2"/>Mon Profil</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>{t.dashboard.overview.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                   <div className="flex items-center gap-4 p-4 border rounded-lg">
                      <Calendar className="w-8 h-8 text-primary"/>
                      <div>
                        <p className="font-semibold">{t.dashboard.overview.date_title}</p>
                        <p className="text-muted-foreground">{t.dashboard.overview.date_value}</p>
                      </div>
                   </div>
                   <div className="flex items-center gap-4 p-4 border rounded-lg">
                      <Users className="w-8 h-8 text-primary"/>
                      <div>
                        <p className="font-semibold">{t.dashboard.overview.guests_title}</p>
                        <p className="text-muted-foreground">{t.dashboard.overview.guests_value}</p>
                      </div>
                   </div>
                   <div className="flex items-center gap-4 p-4 border rounded-lg">
                      <Heart className="w-8 h-8 text-primary"/>
                      <div>
                        <p className="font-semibold">{t.dashboard.overview.package_title}</p>
                        <p className="text-muted-foreground">{t.dashboard.overview.package_value}</p>
                      </div>
                   </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="contracts" className="mt-6">
               <Card>
                <CardHeader>
                  <CardTitle>{t.dashboard.contracts.title}</CardTitle>
                  <CardDescription>{t.dashboard.contracts.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>{t.dashboard.contracts.col_document}</TableHead>
                        <TableHead>{t.dashboard.contracts.col_status}</TableHead>
                        <TableHead>{t.dashboard.contracts.col_date}</TableHead>
                        <TableHead className="text-right">{t.dashboard.contracts.col_action}</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {contracts.map(contract => (
                         <TableRow key={contract.document}>
                           <TableCell>{contract.document === 'Main Venue Agreement' ? t.dashboard.contracts.doc_main : "Avenant Traiteur"}</TableCell>
                           <TableCell>
                            <Badge variant={contract.status === 'Completed' ? 'default' : 'destructive'}>
                              {contract.status === 'Completed' ? t.dashboard.contracts.status_completed : t.dashboard.contracts.status_awaiting}
                            </Badge>
                           </TableCell>
                           <TableCell>{contract.dateSent}</TableCell>
                           <TableCell className="text-right">
                             {contract.status === 'Awaiting Signature' ? (
                                <Button onClick={() => handleViewContract(contract)}>{t.dashboard.contracts.action_sign}</Button>
                             ) : (
                                <Button variant="outline" onClick={() => handleViewContract(contract)}>{t.dashboard.contracts.action_view}</Button>
                             )}
                           </TableCell>
                         </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="payments" className="mt-6">
                <Card>
                    <CardHeader>
                      <CardTitle>{t.dashboard.payments.title}</CardTitle>
                      <CardDescription>{t.dashboard.payments.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>{t.dashboard.payments.col_item}</TableHead>
                                    <TableHead>{t.dashboard.payments.col_amount}</TableHead>
                                    <TableHead>{t.dashboard.payments.col_due}</TableHead>
                                    <TableHead>{t.dashboard.payments.col_status}</TableHead>
                                    <TableHead className="text-right">{t.dashboard.payments.col_action}</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow>
                                    <TableCell>{t.dashboard.payments.item_deposit}</TableCell>
                                    <TableCell>€12,500</TableCell>
                                    <TableCell>May 30, 2024</TableCell>
                                    <TableCell><Badge variant="destructive">{t.dashboard.payments.status_due}</Badge></TableCell>
                                    <TableCell className="text-right"><Button>{t.dashboard.payments.action_pay}</Button></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>{t.dashboard.payments.item_initial}</TableCell>
                                    <TableCell>€12,500</TableCell>
                                    <TableCell>Dec 1, 2024</TableCell>
                                    <TableCell><Badge variant="secondary">{t.dashboard.payments.status_pending}</Badge></TableCell>
                                    <TableCell className="text-right"><Button disabled variant="outline">{t.dashboard.payments.action_pay}</Button></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>{t.dashboard.payments.item_booking}</TableCell>
                                    <TableCell>€5,000</TableCell>
                                    <TableCell>May 15, 2024</TableCell>
                                    <TableCell><Badge>{t.dashboard.payments.status_paid}</Badge></TableCell>
                                    <TableCell className="text-right"><Button disabled variant="outline">{t.dashboard.payments.action_paid}</Button></TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </TabsContent>

            <TabsContent value="accommodations" className="mt-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Mes Hébergements</CardTitle>
                        <CardDescription>Consultez les détails de vos réservations de chambres.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {accommodations.length > 0 ? (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Chambre</TableHead>
                                    <TableHead>Arrivée</TableHead>
                                    <TableHead>Départ</TableHead>
                                    <TableHead>Statut</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {accommodations.map(acc => (
                                    <TableRow key={acc.id}>
                                        <TableCell>{acc.room}</TableCell>
                                        <TableCell>{new Date(acc.checkIn).toLocaleDateString()}</TableCell>
                                        <TableCell>{new Date(acc.checkOut).toLocaleDateString()}</TableCell>
                                        <TableCell><Badge variant={acc.status === 'Confirmed' ? 'default' : 'secondary'}>{acc.status}</Badge></TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        ) : (
                            <p className="text-muted-foreground">Vous n'avez aucune réservation d'hébergement pour le moment.</p>
                        )}
                    </CardContent>
                </Card>
            </TabsContent>

            <TabsContent value="profile" className="mt-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Mon Profil</CardTitle>
                        <CardDescription>Mettez à jour vos informations personnelles.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Nom</Label>
                            <Input id="name" value={profileData.name} onChange={(e) => setProfileData({...profileData, name: e.target.value})} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" value={profileData.email} onChange={(e) => setProfileData({...profileData, email: e.target.value})} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="phone">Téléphone</Label>
                            <Input id="phone" type="tel" value={profileData.phone} onChange={(e) => setProfileData({...profileData, phone: e.target.value})} />
                        </div>
                    </CardContent>
                    <CardContent>
                        <Button onClick={handleProfileUpdate}>Enregistrer les modifications</Button>
                    </CardContent>
                </Card>
            </TabsContent>

          </Tabs>

           <Dialog open={isViewDialogOpen} onOpenChange={setViewDialogOpen}>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>{viewedContract?.document === 'Main Venue Agreement' ? t.dashboard.contracts.doc_main : "Avenant Traiteur"}</DialogTitle>
              </DialogHeader>
              <div className="prose dark:prose-invert max-w-none max-h-[60vh] overflow-y-auto p-4 border rounded-md">
                <h3>{viewedContract?.document === 'Main Venue Agreement' ? t.dashboard.contracts.doc_main : "Avenant Traiteur"} {t.dashboard.view_contract.for} {viewedContract?.client}</h3>
                <p>{t.dashboard.view_contract.p1.replace('{date}', t.dashboard.overview.date_value)}</p>
                <h4>{t.dashboard.view_contract.h4_1}</h4>
                <p>{t.dashboard.view_contract.p2}</p>
                <h4>{t.dashboard.view_contract.h4_2}</h4>
                <p>{t.dashboard.view_contract.p3}</p>
                <h4>{t.dashboard.view_contract.h4_3}</h4>
                <p>{t.dashboard.view_contract.p4}</p>
                <p><strong>{t.dashboard.view_contract.status}:</strong> {viewedContract?.status === 'Completed' ? t.dashboard.contracts.status_completed : t.dashboard.contracts.status_awaiting}</p>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">{t.dashboard.view_contract.close}</Button>
                </DialogClose>
                {viewedContract?.status === 'Awaiting Signature' && (
                  <Button onClick={() => handleSignContract(viewedContract)}>{t.dashboard.view_contract.sign}</Button>
                )}
              </DialogFooter>
            </DialogContent>
          </Dialog>

        </div>
      </main>
      <Footer />
    </div>
  );
}

    