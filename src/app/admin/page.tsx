
'use client';
import { useState, useEffect } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { BarChart, Users, FileText, CalendarDays, Euro, PlusCircle, Hotel, Settings, MessageSquare, Send } from "lucide-react";
import { useLocale } from "@/hooks/use-locale";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";

// Shared state simulation
const createSharedState = () => {
  let listeners: ((data: any) => void)[] = [];
  let state = {
    clients: [
      { id: 'user-123', name: "Alex & Jordan", date: "2025-06-14", package: "Premium Romance", status: "Booked" },
      { id: 'user-456', name: "Michael & David", date: "2025-08-05", package: "Luxury Dream", status: "Booked" },
      { id: 'user-789', name: "Emily & James", date: "2025-09-01", package: "Premium Romance", status: "Inquiry" },
    ],
    contracts: [
      { client: "Alex & Jordan", document: "Main Venue Agreement", status: "Awaiting Signature", dateSent: "May 20, 2024" },
      { client: "Alex & Jordan", document: "Catering Addendum", status: "Completed", dateSent: "May 15, 2024"},
      { client: "Michael & David", document: "Main Venue Agreement", status: "Completed", dateSent: "May 15, 2024" },
    ],
    accommodations: [
        { id: 1, client: "Alex & Jordan", room: "Les Heures du Jour", checkIn: "2025-06-13", checkOut: "2025-06-15", status: "Confirmed" },
        { id: 2, client: "Alex & Jordan", room: "Ruines Antiques", checkIn: "2025-06-13", checkOut: "2025-06-15", status: "Confirmed" },
        { id: 3, client: "Michael & David", room: "La Loge", checkIn: "2025-08-04", checkOut: "2025-08-06", status: "Pending" },
    ],
    packages: [
        { id: "classic", name: "Classic Elegance", priceHigh: 18000, priceLow: 15000 },
        { id: "premium", name: "Premium Romance", priceHigh: 28000, priceLow: 25000 },
        { id: "luxury", name: "Luxury Dream", priceHigh: 45000, priceLow: 40000 },
    ],
    messages: [
        { id: 1, client: "Alex & Jordan", sender: "Client", text: "Bonjour, est-il possible de visiter le domaine la semaine prochaine ?" },
        { id: 2, client: "Alex & Jordan", sender: "Admin", text: "Bien sûr ! Seriez-vous disponible mardi à 14h ?" },
        { id: 3, client: "Emily & James", sender: "Client", text: "Nous aimerions avoir des informations sur les options de traiteur." }
    ]
  };

  return {
    getState: () => state,
    setState: (newState: Partial<typeof state>) => {
      state = { ...state, ...newState };
      listeners.forEach(listener => listener(state));
    },
    subscribe: (listener: (data: any) => void) => {
      listeners.push(listener);
      return () => {
        listeners = listeners.filter(l => l !== listener);
      };
    }
  };
};

export const sharedState = createSharedState();
// --- End of shared state simulation

export default function AdminPage() {
  const { t } = useLocale();
  const { toast } = useToast();

  const [clients, setClients] = useState(sharedState.getState().clients);
  const [contracts, setContracts] = useState(sharedState.getState().contracts);
  const [accommodations, setAccommodations] = useState(sharedState.getState().accommodations);
  const [packages, setPackages] = useState(sharedState.getState().packages);
  const [messages, setMessages] = useState(sharedState.getState().messages);

  const [newContract, setNewContract] = useState({ client: '', date: '', package: '' });
  const [isCreateDialogOpen, setCreateDialogOpen] = useState(false);
  const [isViewDialogOpen, setViewDialogOpen] = useState(false);
  const [viewedContract, setViewedContract] = useState<any>(null);
  
  const [highSeasonDates, setHighSeasonDates] = useState<Date[]>([]);

  useEffect(() => {
    const unsubscribe = sharedState.subscribe(state => {
      setClients(state.clients);
      setContracts(state.contracts);
      setAccommodations(state.accommodations);
      setPackages(state.packages);
      setMessages(state.messages);
    });
    return () => unsubscribe();
  }, []);

  const handleCreateContract = () => {
    if (newContract.client && newContract.date && newContract.package) {
      const newClient = { ...newContract, id: `user-${Math.random()}`, status: 'Booked' };
      const newContractEntry = { client: newContract.client, document: 'Main Venue Agreement', status: 'Awaiting Signature', dateSent: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) };

      sharedState.setState({
        clients: [...sharedState.getState().clients, newClient],
        contracts: [...sharedState.getState().contracts, newContractEntry]
      });

      setNewContract({ client: '', date: '', package: '' });
      setCreateDialogOpen(false);
    }
  };
  
  const handleViewContract = (contract: any) => {
    setViewedContract(contract);
    setViewDialogOpen(true);
  }

  const handleViewClientContract = (clientName: string) => {
    const contract = contracts.find(c => c.client === clientName);
    if (contract) {
        handleViewContract(contract);
    }
  }

  const handlePackagePriceChange = (packageId: string, season: 'High' | 'Low', newPrice: number) => {
    const updatedPackages = packages.map(p => 
      p.id === packageId 
        ? { ...p, [`price${season}`]: newPrice } 
        : p
    );
    setPackages(updatedPackages);
  };

  const handleSavePackagePrices = () => {
    sharedState.setState({ packages });
    toast({
        title: "Tarifs mis à jour",
        description: "Les prix des forfaits ont été sauvegardés.",
    });
  };

  const dayIsHighSeason = (day: Date) => highSeasonDates.some(d => d.getTime() === day.getTime());

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 py-12 bg-secondary/30">
        <div className="container max-w-7xl">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold font-headline">{t.admin.title}</h1>
            <Dialog open={isCreateDialogOpen} onOpenChange={setCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button><PlusCircle className="mr-2"/>{t.admin.new_contract}</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{t.admin.new_contract}</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="client-name" className="text-right">
                      {t.admin.all_contracts.col_client}
                    </Label>
                    <Input id="client-name" value={newContract.client} onChange={(e) => setNewContract({...newContract, client: e.target.value})} className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="wedding-date" className="text-right">
                      {t.admin.client_management.col_date}
                    </Label>
                    <Input id="wedding-date" type="date" value={newContract.date} onChange={(e) => setNewContract({...newContract, date: e.target.value})} className="col-span-3" />
                  </div>
                   <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="package-selection" className="text-right">
                      {t.admin.client_management.col_package}
                    </Label>
                     <Select onValueChange={(value) => setNewContract({...newContract, package: value})}>
                        <SelectTrigger className="col-span-3">
                            <SelectValue placeholder={t.admin.form.select_package} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Classic Elegance">{t.packages.classic_title}</SelectItem>
                            <SelectItem value="Premium Romance">{t.packages.premium_title}</SelectItem>
                            <SelectItem value="Luxury Dream">{t.packages.luxury_title}</SelectItem>
                        </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                     <Button variant="outline">{t.admin.form.cancel}</Button>
                  </DialogClose>
                  <Button onClick={handleCreateContract}>{t.admin.form.create}</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <Tabs defaultValue="dashboard">
            <TabsList className="grid w-full grid-cols-4 md:grid-cols-7">
              <TabsTrigger value="dashboard"><BarChart className="mr-2"/>{t.admin.tabs.dashboard}</TabsTrigger>
              <TabsTrigger value="clients"><Users className="mr-2"/>{t.admin.tabs.clients}</TabsTrigger>
              <TabsTrigger value="contracts"><FileText className="mr-2"/>{t.admin.tabs.contracts}</TabsTrigger>
              <TabsTrigger value="accommodations"><Hotel className="mr-2"/>Hébergements</TabsTrigger>
              <TabsTrigger value="messages"><MessageSquare className="mr-2"/>Messagerie</TabsTrigger>
              <TabsTrigger value="packages"><Settings className="mr-2"/>Forfaits</TabsTrigger>
              <TabsTrigger value="calendar"><CalendarDays className="mr-2"/>{t.admin.tabs.calendar}</TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard" className="mt-6">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">{t.admin.revenue_title}</CardTitle>
                            <Euro className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">€125,500</div>
                            <p className="text-xs text-muted-foreground">{t.admin.revenue_desc}</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">{t.admin.upcoming_title}</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">+{clients.length}</div>
                            <p className="text-xs text-muted-foreground">{t.admin.upcoming_desc}</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">{t.admin.inquiries_title}</CardTitle>
                            <FileText className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">+{clients.filter(c => c.status === 'Inquiry').length}</div>
                            <p className="text-xs text-muted-foreground">{t.admin.inquiries_desc}</p>
                        </CardContent>
                    </Card>
                </div>
            </TabsContent>

            <TabsContent value="clients" className="mt-6">
                <Card>
                    <CardHeader>
                        <CardTitle>{t.admin.client_management.title}</CardTitle>
                        <CardDescription>{t.admin.client_management.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>{t.admin.client_management.col_name}</TableHead>
                                    <TableHead>{t.admin.client_management.col_date}</TableHead>
                                    <TableHead>{t.admin.client_management.col_package}</TableHead>
                                    <TableHead>{t.admin.client_management.col_status}</TableHead>
                                    <TableHead className="text-right">{t.admin.client_management.col_actions}</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {clients.map(client => (
                                    <TableRow key={client.id}>
                                        <TableCell>{client.name}</TableCell>
                                        <TableCell>{client.date ? new Date(client.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }) : ''}</TableCell>
                                        <TableCell>{client.package}</TableCell>
                                        <TableCell><Badge variant={client.status === 'Booked' ? 'default' : 'secondary'}>{client.status === 'Booked' ? t.admin.client_management.status_booked : t.admin.client_management.status_inquiry}</Badge></TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="outline" size="sm" onClick={() => handleViewClientContract(client.name)}>{t.admin.client_management.view_button}</Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </TabsContent>
            
            <TabsContent value="calendar" className="mt-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Calendrier des Saisons</CardTitle>
                        <CardDescription>Cliquez sur les jours pour définir la haute et basse saison.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center gap-4">
                        <Calendar
                            mode="multiple"
                            selected={highSeasonDates}
                            onSelect={setHighSeasonDates}
                            className="p-0"
                            defaultMonth={new Date(2025, 5)}
                            modifiers={{
                                highSeason: day => dayIsHighSeason(day),
                            }}
                            modifiersClassNames={{
                                highSeason: 'bg-green-200 dark:bg-green-800',
                            }}
                        />
                         <div className="flex gap-4 text-sm">
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 rounded-full bg-green-200 dark:bg-green-800 border border-muted-foreground"></div>
                                <span>Haute saison</span>
                            </div>
                             <div className="flex items-center gap-2">
                                <div className="w-4 h-4 rounded-full bg-background border border-muted-foreground"></div>
                                <span>Basse saison</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </TabsContent>

            <TabsContent value="contracts" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>{t.admin.all_contracts.title}</CardTitle>
                  <CardDescription>{t.admin.all_contracts.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>{t.admin.all_contracts.col_client}</TableHead>
                        <TableHead>{t.admin.all_contracts.col_document}</TableHead>
                        <TableHead>{t.admin.all_contracts.col_status}</TableHead>
                        <TableHead className="text-right">{t.admin.all_contracts.col_actions}</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {contracts.map(contract => (
                        <TableRow key={`${contract.client}-${contract.document}`}>
                            <TableCell>{contract.client}</TableCell>
                            <TableCell>{contract.document === 'Main Venue Agreement' ? t.admin.all_contracts.doc_main : "Avenant Traiteur"}</TableCell>
                            <TableCell>
                                <Badge variant={contract.status === 'Completed' ? 'default' : 'destructive'}>
                                {contract.status === 'Completed' ? t.admin.all_contracts.status_completed : t.admin.all_contracts.status_awaiting}
                                </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                                {contract.status === 'Completed' ? (
                                    <Button variant="outline" size="sm" onClick={() => handleViewContract(contract)}>{t.admin.all_contracts.view_button}</Button>
                                ) : (
                                    <Button size="sm">{t.admin.all_contracts.send_reminder}</Button>
                                )}
                            </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="accommodations" className="mt-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Gestion des Hébergements</CardTitle>
                        <CardDescription>Suivi des réservations de chambres.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Client</TableHead>
                                    <TableHead>Chambre</TableHead>
                                    <TableHead>Arrivée</TableHead>
                                    <TableHead>Départ</TableHead>
                                    <TableHead>Statut</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {accommodations.map(acc => (
                                    <TableRow key={acc.id}>
                                        <TableCell>{acc.client}</TableCell>
                                        <TableCell>{acc.room}</TableCell>
                                        <TableCell>{new Date(acc.checkIn).toLocaleDateString()}</TableCell>
                                        <TableCell>{new Date(acc.checkOut).toLocaleDateString()}</TableCell>
                                        <TableCell><Badge variant={acc.status === 'Confirmed' ? 'default' : 'secondary'}>{acc.status}</Badge></TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </TabsContent>

            <TabsContent value="messages" className="mt-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Messagerie</CardTitle>
                        <CardDescription>Consultez et répondez aux messages des clients.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {clients.map(client => (
                            <Card key={client.id}>
                                <CardHeader>
                                    <CardTitle className="text-lg">{client.name}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-3 max-h-48 overflow-y-auto pr-4">
                                        {messages.filter(m => m.client === client.name).map(msg => (
                                            <div key={msg.id} className={`flex ${msg.sender === 'Admin' ? 'justify-end' : 'justify-start'}`}>
                                                <p className={`p-3 rounded-lg max-w-[70%] ${msg.sender === 'Admin' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                                                    {msg.text}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-4 flex gap-2">
                                        <Textarea placeholder="Répondre..." className="flex-1"/>
                                        <Button><Send className="w-4 h-4"/></Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </CardContent>
                </Card>
            </TabsContent>

            <TabsContent value="packages" className="mt-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Gestion des Forfaits & Tarifs</CardTitle>
                        <CardDescription>Ajustez les prix de base de vos forfaits mariage par saison.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {packages.map(pkg => (
                            <div key={pkg.id} className="p-4 border rounded-lg">
                                <p className="font-semibold text-xl mb-4">{pkg.name}</p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor={`price-high-${pkg.id}`}>Prix Haute Saison</Label>
                                        <div className="flex items-center gap-2">
                                            <Input 
                                                id={`price-high-${pkg.id}`}
                                                type="number" 
                                                value={pkg.priceHigh}
                                                onChange={(e) => handlePackagePriceChange(pkg.id, 'High', Number(e.target.value))}
                                                className="w-full"
                                            />
                                            <span>€</span>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor={`price-low-${pkg.id}`}>Prix Basse Saison</Label>
                                         <div className="flex items-center gap-2">
                                            <Input 
                                                id={`price-low-${pkg.id}`}
                                                type="number" 
                                                value={pkg.priceLow}
                                                onChange={(e) => handlePackagePriceChange(pkg.id, 'Low', Number(e.target.value))}
                                                className="w-full"
                                            />
                                             <span>€</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                    <CardContent>
                        <Button onClick={handleSavePackagePrices}>Enregistrer les tarifs</Button>
                    </CardContent>
                </Card>
            </TabsContent>


          </Tabs>

          <Dialog open={isViewDialogOpen} onOpenChange={setViewDialogOpen}>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>{t.admin.view_contract.title}: {viewedContract?.document === 'Main Venue Agreement' ? t.dashboard.contracts.doc_main : "Avenant Traiteur"}</DialogTitle>
              </DialogHeader>
              <div className="prose dark:prose-invert max-w-none max-h-[60vh] overflow-y-auto p-4 border rounded-md">
                <h3>{viewedContract?.document === 'Main Venue Agreement' ? t.dashboard.contracts.doc_main : "Avenant Traiteur"} {t.admin.view_contract.for} {viewedContract?.client}</h3>
                <p>{t.admin.view_contract.p1.replace('{date}', clients.find(c => c.name === viewedContract?.client)?.date ? new Date(clients.find(c => c.name === viewedContract?.client)!.date).toLocaleDateString() : 'N/A')}</p>
                <h4>{t.admin.view_contract.h4_1}</h4>
                <p>{t.admin.view_contract.p2}</p>
                <h4>{t.admin.view_contract.h4_2}</h4>
                <p>{t.admin.view_contract.p3}</p>
                <h4>{t.admin.view_contract.h4_3}</h4>
                <p>{t.admin.view_contract.p4}</p>
                <p><strong>{t.admin.view_contract.status}:</strong> {viewedContract?.status === 'Completed' ? t.admin.all_contracts.status_completed : t.admin.all_contracts.status_awaiting}</p>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">{t.admin.view_contract.close}</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>

        </div>
      </main>
      <Footer />
    </div>
  );
}
