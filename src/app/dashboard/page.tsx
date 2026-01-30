
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
import { FileText, CreditCard, Heart, Calendar, Users, LogOut, User as UserIcon, Hotel, MessageSquare, Send } from "lucide-react";
import { useLocale } from "@/hooks/use-locale";
import { supabase, authService } from '@/lib/supabase';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default function DashboardPage() {
  const { t, locale } = useLocale();
  const { toast } = useToast();
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState({ name: '', email: '', phone: '' });
  const [contracts, setContracts] = useState<any[]>([]);
  const [accommodations, setAccommodations] = useState<any[]>([]);
  const [isViewDialogOpen, setViewDialogOpen] = useState(false);
  const [viewedContract, setViewedContract] = useState<any>(null);
  const [bookingInfo, setBookingInfo] = useState<any>(null);

  useEffect(() => {
    const init = async () => {
      if (!supabase) {
         setLoading(false);
         return;
      }

      // Check auth
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/login');
        return;
      }

      // Get Profile
      let userProfile: any = null;
      try {
        const stored = localStorage.getItem('user');
        if (stored) userProfile = JSON.parse(stored);
      } catch {}

      if (!userProfile || userProfile.id !== session.user.id) {
         const { data: profile } = await supabase.from('users').select('*').eq('id', session.user.id).single();
         if (profile) {
            userProfile = profile;
            localStorage.setItem('user', JSON.stringify(profile));
         } else {
             userProfile = {
                 id: session.user.id,
                 email: session.user.email,
                 name: session.user.user_metadata?.name || session.user.email?.split('@')[0],
                 phone: session.user.user_metadata?.phone,
                 role: 'client'
             };
         }
      }
      
      setCurrentUser(userProfile);
      setProfileData({ name: userProfile.name || '', email: userProfile.email || '', phone: userProfile.phone || '' });

      // Fetch Bookings & Contracts
      const { data: bookings, error: bookingsError } = await supabase
        .from('bookings')
        .select(`
            id,
            event_date,
            guest_count,
            notes,
            status,
            package:packages(name_fr, name_en),
            contracts(*)
        `)
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false });

      if (bookingsError) {
          console.error("Error fetching user bookings:", bookingsError);
      }

      console.log("Dashboard bookings fetched:", bookings);

      if (bookings && bookings.length > 0) {
        const latestBooking = bookings[0];
        const packageData = Array.isArray(latestBooking.package) ? latestBooking.package[0] : latestBooking.package;
        const pkgName = locale === 'fr' ? packageData?.name_fr : packageData?.name_en;
        let displayPackage = pkgName;
        if (!displayPackage && latestBooking?.notes) {
          const m = String(latestBooking.notes).match(/Élopement:\s*([^\.]+)/i);
          if (m && m[1]) displayPackage = m[1].trim();
        }
        
        setBookingInfo({
            date: latestBooking.event_date,
            guests: latestBooking.guest_count,
            package: displayPackage || 'Aucun forfait'
        });

        // Contracts
        if (latestBooking.contracts) {
            const mappedContracts = latestBooking.contracts.map((c: any) => ({
                id: c.id,
                document: c.document_name,
                status: c.status === 'completed' || c.status === 'signed' ? 'Completed' : 'Awaiting Signature',
                dateSent: new Date(c.created_at).toLocaleDateString(),
                client: userProfile.name, // For display in dialog
                raw: c
            }));
            setContracts(mappedContracts);
        }
      }

      // Fetch Accommodations
      const { data: accBookings } = await supabase
        .from('accommodation_bookings')
        .select(`
            id,
            check_in_date,
            check_out_date,
            status,
            accommodation:accommodations(name_fr, name_en)
        `)
        .eq('user_id', session.user.id);

      if (accBookings) {
        const mappedAcc = accBookings.map((ab: any) => ({
            id: ab.id,
            room: locale === 'fr' ? ab.accommodation?.name_fr : ab.accommodation?.name_en,
            checkIn: ab.check_in_date,
            checkOut: ab.check_out_date,
            status: ab.status === 'confirmed' ? 'Confirmed' : 'Pending'
        }));
        setAccommodations(mappedAcc);
      }

      setLoading(false);
    };

    init();
  }, [router, locale]);

  const handleSignContract = async (contractToSign: any) => {
    if (!supabase) return;

    const { error } = await supabase
        .from('contracts')
        .update({ status: 'signed', signed_at: new Date().toISOString() })
        .eq('id', contractToSign.id);

    if (error) {
        toast({ title: "Erreur", description: "Impossible de signer le contrat.", variant: "destructive" });
        return;
    }

    setContracts(prev => prev.map(c => 
        c.id === contractToSign.id 
        ? { ...c, status: "Completed" } 
        : c
    ));
    
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
  
  const handleLogout = async () => {
    if (supabase) await supabase.auth.signOut();
    localStorage.removeItem('user');
    router.push('/login');
  };

  const handleProfileUpdate = async () => {
    if (currentUser && supabase) {
        const { error } = await supabase
            .from('users')
            .update({ name: profileData.name, phone: profileData.phone })
            .eq('id', currentUser.id);

        if (error) {
            toast({ title: "Erreur", description: "Mise à jour échouée.", variant: "destructive" });
            return;
        }

        const updatedUser = { ...currentUser, ...profileData };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setCurrentUser(updatedUser);
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

  if (!currentUser) return null;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 py-12 bg-secondary/30">
        <div className="container max-w-7xl">
          <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold font-headline">{t.dashboard.title.replace("Alex & Jordan", currentUser.name)}</h1>
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
              <TabsTrigger value="overview"><Heart className="mr-2"/>{t.dashboard.tabs.overview}</TabsTrigger>
              <TabsTrigger value="contracts"><FileText className="mr-2"/>{t.dashboard.tabs.contracts}</TabsTrigger>
              <TabsTrigger value="payments"><CreditCard className="mr-2"/>{t.dashboard.tabs.payments}</TabsTrigger>
              {/* <TabsTrigger value="accommodations"><Hotel className="mr-2"/>Hébergements</TabsTrigger> */}
              <TabsTrigger value="messages"><MessageSquare className="mr-2"/>Messages</TabsTrigger>
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
                        <p className="text-muted-foreground">{bookingInfo?.date ? new Date(bookingInfo.date).toLocaleDateString() : 'Date non fixée'}</p>
                      </div>
                   </div>
                   <div className="flex items-center gap-4 p-4 border rounded-lg">
                      <Users className="w-8 h-8 text-primary"/>
                      <div>
                        <p className="font-semibold">{t.dashboard.overview.guests_title}</p>
                        <p className="text-muted-foreground">{bookingInfo?.guests || 0} invités</p>
                      </div>
                   </div>
                   <div className="flex items-center gap-4 p-4 border rounded-lg">
                      <Heart className="w-8 h-8 text-primary"/>
                      <div>
                        <p className="font-semibold">{t.dashboard.overview.package_title}</p>
                        <p className="text-muted-foreground">{bookingInfo?.package || 'Aucun forfait'}</p>
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
                         <TableRow key={contract.id}>
                           <TableCell>{contract.document}</TableCell>
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
                         <p className="text-muted-foreground p-4 text-center">Les informations de paiement seront bientôt disponibles.</p>
                    </CardContent>
                </Card>
            </TabsContent>

            {/* <TabsContent value="accommodations" className="mt-6">
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
            </TabsContent> */}

            {currentUser && (
              <TabsContent value="messages" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Messagerie</CardTitle>
                    <CardDescription>Discutez avec l'admin.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ClientChat bookingId={bookingInfo ? contracts[0]?.raw?.booking_id : null} userId={currentUser.id} />
                  </CardContent>
                </Card>
              </TabsContent>
            )}

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
                            <Input id="email" type="email" value={profileData.email} disabled />
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
                <DialogTitle>{viewedContract?.document}</DialogTitle>
              </DialogHeader>
              <div className="prose dark:prose-invert max-w-none max-h-[60vh] overflow-y-auto p-4 border rounded-md">
                <h3>{viewedContract?.document} {t.dashboard.view_contract.for} {viewedContract?.client}</h3>
                <p>{t.dashboard.view_contract.p1.replace('{date}', bookingInfo?.date ? new Date(bookingInfo.date).toLocaleDateString() : '')}</p>
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

function ClientChat({ bookingId, userId }: { bookingId: string | null, userId: string }) {
  const [messages, setMessages] = useState<any[]>([]);
  const [text, setText] = useState('');

  useEffect(()=>{
    if (!supabase || !bookingId) return;

    const fetchMessages = async () => {
        if (!supabase) return;
        const { data } = await supabase
            .from('messages')
            .select('*')
            .eq('booking_id', bookingId)
            .order('created_at', { ascending: true });
        
        if (data) {
            setMessages(data.map(m => ({
                id: m.id,
                text: m.message,
                sender: m.sender_role === 'client' ? 'Client' : 'Admin'
            })));
        }
    };

    fetchMessages();

    const subscription = supabase
        .channel('public:messages')
        .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages', filter: `booking_id=eq.${bookingId}` }, 
        (payload) => {
             const m = payload.new as any;
             setMessages(prev => [...prev, {
                 id: m.id,
                 text: m.message,
                 sender: m.sender_role === 'client' ? 'Client' : 'Admin'
             }]);
        })
        .subscribe();

    return () => { subscription.unsubscribe(); }
  },[bookingId]);

  const sendMessage = async () => {
    if (!text.trim() || !bookingId || !supabase) return;

    await supabase.from('messages').insert({
        booking_id: bookingId,
        sender_id: userId,
        sender_role: 'client',
        message: text.trim()
    });
    setText('');
  };

  if (!bookingId) return <div>Vous n'avez pas de réservation active pour envoyer des messages.</div>;

  return (
    <div>
      <div className="space-y-3 max-h-64 overflow-y-auto pr-4">
        {messages.map(msg=> (
          <div key={msg.id} className={`flex ${msg.sender === 'Client' ? 'justify-end' : 'justify-start'}`}>
            <p className={`p-3 rounded-lg max-w-[70%] ${msg.sender === 'Client' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>{msg.text}</p>
          </div>
        ))}
      </div>
      <div className="mt-4 flex gap-2">
        <Textarea placeholder="Écrire un message..." className="flex-1" value={text} onChange={(e)=>setText(e.target.value)} />
        <Button onClick={sendMessage}>
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
