
'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { BarChart, Users, FileText, CalendarDays, Euro, PlusCircle, Hotel, Settings, MessageSquare, Send } from "lucide-react";
import { Availability } from "@/components/sections/availability";
import { useLocale } from "@/hooks/use-locale";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase, authService } from '@/lib/supabase';

export default function AdminPage() {
  const { t, locale } = useLocale();
  const { toast } = useToast();
  const router = useRouter();

  const [clients, setClients] = useState<any[]>([]);
  const [revenue, setRevenue] = useState<number>(0);
  const [contracts, setContracts] = useState<any[]>([]);
  const [accommodations, setAccommodations] = useState<any[]>([]);
  const [packages, setPackages] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [accessDeniedReason, setAccessDeniedReason] = useState<string | null>(null);
  const [currentUserRole, setCurrentUserRole] = useState<string | null>(null);
  const [textOverridesJson, setTextOverridesJson] = useState<string>('');
  const [bookingIdByClient, setBookingIdByClient] = useState<Record<string, string>>({});

  const [newContract, setNewContract] = useState({ bookingId: '', type: 'main' as 'main' | 'catering' | 'accommodation', documentName: '' });
   const [isCreatingContract, setIsCreatingContract] = useState(false);
   const [isCreateDialogOpen, setCreateDialogOpen] = useState(false);
   const [isViewDialogOpen, setViewDialogOpen] = useState(false);
   const [viewedContract, setViewedContract] = useState<any>(null);

  const handleCreateContract = async () => {
    if (!supabase || !newContract.bookingId || !newContract.documentName) {
      toast({ title: "Erreur", description: "Veuillez remplir tous les champs.", variant: "destructive" });
      return;
    }

    setIsCreatingContract(true);
    try {
      const { data, error } = await supabase
        .from('contracts')
        .insert({
          booking_id: newContract.bookingId,
          contract_type: newContract.type,
          document_name: newContract.documentName,
          status: 'awaiting_signature'
        })
        .select()
        .single();

      if (error) throw error;

      toast({ title: "Succès", description: "Contrat créé avec succès." });
      setCreateDialogOpen(false);
      setNewContract({ bookingId: '', type: 'main', documentName: '' });
      
      // Refresh contracts list
      const { data: contractsData } = await supabase
        .from('contracts')
        .select(`
            id,
            document_name,
            status,
            created_at,
            booking:bookings(user:users(name))
        `);

      if (contractsData) {
        setContracts(contractsData.map((c: any) => ({
            id: c.id,
            client: c.booking?.user?.name || 'Unknown',
            document: c.document_name,
            status: c.status === 'completed' || c.status === 'signed' ? 'Completed' : 'Awaiting Signature',
            dateSent: new Date(c.created_at).toLocaleDateString(),
            raw: c
        })));
      }
    } catch (e: any) {
      toast({ title: "Erreur", description: e.message || "Impossible de créer le contrat.", variant: "destructive" });
    } finally {
      setIsCreatingContract(false);
    }
  };
  
  const [highSeasonDates, setHighSeasonDates] = useState<Date[]>([]);

  useEffect(() => {
    // Check role
    const checkRole = async () => {
        setIsLoading(true);
        const { user, profile } = await authService.getCurrentUser();
        
        if (!user) {
             router.replace('/');
             return;
        }

        if (!profile || (profile.role !== 'admin' && profile.role !== 'super_admin')) {
             setAccessDeniedReason(`Rôle insuffisant: ${profile?.role || 'aucun'} (ID: ${user.id})`);
             setIsLoading(false);
             return;
        }

        setCurrentUserRole(profile.role);
        setIsLoading(false);
    };
    checkRole();
  }, [router]);

  useEffect(() => {
    const fetchData = async () => {
      if (!supabase) return;

      // Fetch Bookings (Clients)
      const { data: bookings, error: bookingsError } = await supabase
        .from('bookings')
        .select(`
            id,
            event_date,
            status,
            notes,
            total_amount,
            user:users(name, email),
            package:packages(name_fr, name_en, base_price)
        `)
        .order('event_date', { ascending: true });

      if (bookingsError) {
          console.error("Error fetching bookings:", bookingsError);
      }

      if (bookings) {
        const clientsData = bookings.map((b: any) => {
            let pkgName = locale === 'fr' ? b.package?.name_fr : b.package?.name_en;
            if (!pkgName && b.notes) {
                const m = String(b.notes).match(/Élopement:\s*([^\.]+)/i);
                if (m && m[1]) pkgName = m[1].trim();
                else if (String(b.notes).includes('Élopement')) pkgName = "Forfait Élopement";
            }
            
            return {
                id: b.id,
                name: b.user?.name || b.user?.email || 'Unknown',
                date: b.event_date,
                package: pkgName || 'Sur mesure',
                price: b.total_amount || b.package?.base_price || 0,
                status: b.status
            };
        });
        setClients(clientsData);

        // Calculate Revenue (only confirmed/booked bookings)
        const totalRevenue = clientsData
          .filter(c => c.status && ['confirmed', 'booked', 'paid'].includes(c.status.toLowerCase()))
          .reduce((acc, curr) => acc + (curr.price || 0), 0);
        setRevenue(totalRevenue);

        const bookingMap: Record<string, string> = {};
        clientsData.forEach(c => { bookingMap[c.name] = c.id; });
        setBookingIdByClient(bookingMap);
      }

      // Fetch Contracts
      const { data: contractsData } = await supabase
        .from('contracts')
        .select(`
            id,
            document_name,
            status,
            created_at,
            booking:bookings(user:users(name))
        `);

      if (contractsData) {
        setContracts(contractsData.map((c: any) => ({
            id: c.id,
            client: c.booking?.user?.name || 'Unknown',
            document: c.document_name,
            status: c.status === 'completed' || c.status === 'signed' ? 'Completed' : 'Awaiting Signature',
            dateSent: new Date(c.created_at).toLocaleDateString(),
            raw: c
        })));
      }

      // Fetch Accommodations
      const { data: accData } = await supabase
        .from('accommodation_bookings')
        .select(`
            id,
            check_in_date,
            check_out_date,
            status,
            user:users(name),
            accommodation:accommodations(name_fr, name_en)
        `);
        
      if (accData) {
        setAccommodations(accData.map((a: any) => ({
            id: a.id,
            client: a.user?.name || 'Unknown',
            room: locale === 'fr' ? a.accommodation?.name_fr : a.accommodation?.name_en,
            checkIn: a.check_in_date,
            checkOut: a.check_out_date,
            status: a.status === 'confirmed' ? 'Confirmed' : 'Pending'
        })));
      }

      // Fetch Packages
      const { data: pkgData } = await supabase.from('packages').select('*');
      
      const elopementPackages = [
        { id: "pack1", name_fr: "Pack 1 — Secret Elopement in the Garden", name_en: "Pack 1 — Secret Elopement in the Garden", base_price: 4950 },
        { id: "pack2", name_fr: "Pack 2 — Elopement Secret (1 Journée)", name_en: "Pack 2 — Secret Elopement (1 Day)", base_price: 5950 },
        { id: "pack3", name_fr: "Pack 3 — Overnight in Love", name_en: "Pack 3 — Overnight in Love", base_price: 7950 },
        { id: "pack4", name_fr: "Pack 4 — Elopement Raffiné (20 invités)", name_en: "Pack 4 — Refined Elopement (20 guests)", base_price: 16000 }
      ];

      if (pkgData) {
          const dbPackages = pkgData.map((p: any) => ({
              id: p.package_id,
              name: locale === 'fr' ? p.name_fr : p.name_en,
              priceHigh: p.base_price, // Simplifying for now
              priceLow: p.base_price,
              isElopement: false
          }));

          const elopementPkgs = elopementPackages.map(p => ({
              id: p.id,
              name: locale === 'fr' ? p.name_fr : p.name_en,
              priceHigh: p.base_price,
              priceLow: p.base_price,
              isElopement: true
          }));

          setPackages([...dbPackages, ...elopementPkgs]);
      }

      // Fetch Messages
      const { data: msgData } = await supabase
        .from('messages')
        .select(`
            id,
            message,
            sender_role,
            created_at,
            booking:bookings(user:users(name))
        `)
        .order('created_at', { ascending: true });

      if (msgData) {
          setMessages(msgData.map((m: any) => ({
              id: m.id,
              client: m.booking?.user?.name || 'Unknown',
              sender: m.sender_role === 'admin' ? 'Admin' : 'Client',
              text: m.message
          })));
      }
    };

    fetchData();
  }, [locale, supabase]);
  
  const handleViewContract = (contract: any) => {
    setViewedContract(contract);
    setViewDialogOpen(true);
  }

  const handlePackagePriceChange = (packageId: string, season: 'priceHigh' | 'priceLow', newPrice: number) => {
    const updatedPackages = packages.map(p => 
      p.id === packageId 
        ? { ...p, [season]: newPrice } 
        : p
    );
    setPackages(updatedPackages);
  };

  const handleSavePackagePrices = async () => {
    if (!supabase) return;
    for (const pkg of packages) {
        await supabase
            .from('packages')
            .update({ base_price: pkg.priceHigh })
            .eq('package_id', pkg.id);
    }
    toast({
          title: "Tarifs mis à jour",
          description: "Les prix des forfaits ont été sauvegardés.",
    });
  };

  const sendAdminReply = async (client: string, text: string) => {
    if (!text.trim() || !supabase) return;
    const bookingId = bookingIdByClient[client];
    if (bookingId) {
        const user = await authService.getCurrentUser();
        await supabase.from('messages').insert({
            booking_id: bookingId,
            sender_id: user.profile?.id || user.user?.id,
            sender_role: 'admin',
            message: text.trim()
        });
        
        // Optimistic update
        setMessages(prev => [...prev, { id: Date.now(), client, sender: 'Admin', text: text.trim() }]);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (accessDeniedReason) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Accès Refusé</h1>
        <p className="text-muted-foreground mb-4">{accessDeniedReason}</p>
        <p className="text-sm text-gray-500 mb-8 max-w-md">
            Si vous êtes administrateur, vérifiez que votre rôle est correctement défini dans la base de données (table users) 
            et que la clé de service (SUPABASE_SERVICE_ROLE_KEY) est valide dans le fichier .env.local pour permettre la récupération du profil.
        </p>
        <Button onClick={() => router.push('/')}>Retour à l'accueil</Button>
      </div>
    );
  }

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
                  <div className="grid gap-2">
                    <Label htmlFor="client">Client / Réservation</Label>
                    <Select value={newContract.bookingId} onValueChange={(val) => setNewContract({...newContract, bookingId: val})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner un client" />
                      </SelectTrigger>
                      <SelectContent>
                        {clients.map(client => (
                          <SelectItem key={client.id} value={client.id}>
                            {client.name} - {new Date(client.date).toLocaleDateString()}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="type">Type de contrat</Label>
                    <Select value={newContract.type} onValueChange={(val: any) => setNewContract({...newContract, type: val})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="main">Mariage Principal</SelectItem>
                        <SelectItem value="catering">Traiteur</SelectItem>
                        <SelectItem value="accommodation">Hébergement</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="docName">Nom du document</Label>
                    <Input 
                      id="docName" 
                      placeholder="Ex: Contrat de Mariage - Alex & Jordan" 
                      value={newContract.documentName}
                      onChange={(e) => setNewContract({...newContract, documentName: e.target.value})}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                     <Button variant="outline">{t.admin.form.cancel}</Button>
                  </DialogClose>
                  <Button onClick={handleCreateContract} disabled={isCreatingContract}>
                    {isCreatingContract ? "Création..." : "Créer le contrat"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <Tabs defaultValue="dashboard">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-6">
              <TabsTrigger value="dashboard"><BarChart className="mr-2"/>{t.admin.tabs.dashboard}</TabsTrigger>
              <TabsTrigger value="clients"><Users className="mr-2"/>{t.admin.tabs.clients}</TabsTrigger>
              <TabsTrigger value="contracts"><FileText className="mr-2"/>{t.admin.tabs.contracts}</TabsTrigger>
              <TabsTrigger value="calendar"><CalendarDays className="mr-2"/>{t.admin.tabs.calendar}</TabsTrigger>
              <TabsTrigger value="messages"><MessageSquare className="mr-2"/>Messagerie</TabsTrigger>
              <TabsTrigger value="packages"><Settings className="mr-2"/>Forfaits</TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard" className="mt-6">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">{t.admin.revenue_title}</CardTitle>
                            <Euro className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {new Intl.NumberFormat(locale === 'fr' ? 'fr-FR' : 'en-US', { style: 'currency', currency: 'EUR' }).format(revenue)}
                            </div>
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
                            <div className="text-2xl font-bold">+{clients.filter(c => c.status === 'inquiry').length}</div>
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
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {clients.map(client => (
                                    <TableRow key={client.id}>
                                        <TableCell>{client.name}</TableCell>
                                        <TableCell>{new Date(client.date).toLocaleDateString()}</TableCell>
                                        <TableCell>{client.package}</TableCell>
                                        <TableCell><Badge variant="outline">{client.status}</Badge></TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </TabsContent>

            <TabsContent value="contracts" className="mt-6">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle>{t.admin.all_contracts.title}</CardTitle>
                            <CardDescription>{t.admin.all_contracts.description}</CardDescription>
                        </div>
                        <Button size="sm" onClick={() => setCreateDialogOpen(true)}>
                            <PlusCircle className="mr-2 h-4 w-4"/>{t.admin.new_contract}
                        </Button>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>{t.admin.all_contracts.col_client}</TableHead>
                                    <TableHead>{t.admin.all_contracts.col_document}</TableHead>
                                    <TableHead>{t.admin.all_contracts.col_status}</TableHead>
                                    <TableHead>{t.admin.all_contracts.col_sent}</TableHead>
                                    <TableHead className="text-right">{t.admin.all_contracts.col_actions}</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {contracts.map(contract => (
                                    <TableRow key={contract.id}>
                                        <TableCell>{contract.client}</TableCell>
                                        <TableCell>{contract.document}</TableCell>
                                        <TableCell>
                                            <Badge variant={contract.status === 'Completed' ? 'default' : 'destructive'}>
                                                {contract.status === 'Completed' ? t.dashboard.contracts.status_completed : t.dashboard.contracts.status_awaiting}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>{contract.dateSent}</TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="outline" size="sm" onClick={() => handleViewContract(contract)}>
                                                {t.admin.all_contracts.view_button}
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </TabsContent>

             {/* <TabsContent value="accommodations" className="mt-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Réservations Hébergements</CardTitle>
                        <CardDescription>Vue d'ensemble des chambres réservées.</CardDescription>
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
            </TabsContent> */}

            <TabsContent value="calendar" className="mt-6">
                <Card>
                    <CardHeader>
                        <CardTitle>{t.admin.venue_calendar.title}</CardTitle>
                        <CardDescription>{t.admin.venue_calendar.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Availability />
                    </CardContent>
                </Card>
            </TabsContent>

            <TabsContent value="messages" className="mt-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Messagerie Clients</CardTitle>
                        <CardDescription>Répondez aux questions des clients.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="border rounded-lg p-4 h-[600px] overflow-y-auto col-span-1">
                                <h3 className="font-semibold mb-4">Clients</h3>
                                <div className="space-y-2">
                                    {Object.keys(bookingIdByClient).map(clientName => (
                                        <div key={clientName} className="p-3 bg-muted rounded-lg cursor-pointer hover:bg-muted/80">
                                            <p className="font-medium">{clientName}</p>
                                            <p className="text-xs text-muted-foreground">Cliquez pour voir la conversation</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="border rounded-lg p-4 h-[600px] flex flex-col col-span-2">
                                <h3 className="font-semibold mb-4">Conversation</h3>
                                <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                                    {messages.map((msg, i) => (
                                        <div key={i} className={`flex ${msg.sender === 'Admin' ? 'justify-end' : 'justify-start'}`}>
                                            <div className={`p-3 rounded-lg max-w-[70%] ${msg.sender === 'Admin' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                                                <p className="text-xs opacity-70 mb-1">{msg.sender} - {msg.client}</p>
                                                <p>{msg.text}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex gap-2">
                                    <Textarea placeholder="Répondre..." id="admin-reply-input" />
                                    <Button onClick={() => {
                                        const el = document.getElementById('admin-reply-input') as HTMLTextAreaElement;
                                        // Simple hack: grab the first client from messages or need state for selected client
                                        // For demo, we just reply to the client of the last message or first available
                                        const targetClient = messages.length > 0 ? messages[messages.length-1].client : Object.keys(bookingIdByClient)[0];
                                        if (el && targetClient) {
                                            sendAdminReply(targetClient, el.value);
                                            el.value = '';
                                        }
                                    }}>
                                        <Send className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </TabsContent>

            <TabsContent value="packages" className="mt-6">
                 <Card>
                    <CardHeader>
                        <CardTitle>Gestion des Forfaits</CardTitle>
                        <CardDescription>Ajustez les prix des forfaits.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            {packages.map(pkg => (
                                <div key={pkg.id} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end border-b pb-4">
                                    <div>
                                        <Label>{pkg.name}</Label>
                                    </div>
                                    <div>
                                        <Label>Prix (Base)</Label>
                                        <Input 
                                            type="number" 
                                            value={pkg.priceHigh} 
                                            onChange={(e) => handlePackagePriceChange(pkg.id, 'priceHigh', Number(e.target.value))}
                                        />
                                    </div>
                                </div>
                            ))}
                            <Button onClick={handleSavePackagePrices}>Enregistrer les tarifs</Button>
                        </div>
                    </CardContent>
                </Card>
            </TabsContent>

          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
}
