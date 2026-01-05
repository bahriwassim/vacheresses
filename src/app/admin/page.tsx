
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
import { sharedState } from '@/lib/mock-db';
import { supabase, authService, uploadAndOverrideMedia, setMediaOverride, saveTextOverride, loadTextOverrides } from '@/lib/supabase';
import { Input as TextInput } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { translations } from "@/lib/translations";

export default function AdminPage() {
  const { t, locale } = useLocale();
  const { toast } = useToast();

  const [clients, setClients] = useState(sharedState.getState().clients);
  const [contracts, setContracts] = useState(sharedState.getState().contracts);
  const [accommodations, setAccommodations] = useState(sharedState.getState().accommodations);
  const [packages, setPackages] = useState(sharedState.getState().packages);
  const [messages, setMessages] = useState(sharedState.getState().messages);
  const [currentUserRole, setCurrentUserRole] = useState<string | null>(null);
  const [textOverridesJson, setTextOverridesJson] = useState<string>('');
  const [imageOverrides, setImageOverrides] = useState<Record<string, string>>({});
  const [imageOverridesByPath, setImageOverridesByPath] = useState<Record<string, string>>({});
  const [videoIdOverride, setVideoIdOverride] = useState<string>('');
  const [mediaKey, setMediaKey] = useState<string>('');
  const [mediaType, setMediaType] = useState<'image' | 'video'>('image');
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [bookingIdByClient, setBookingIdByClient] = useState<Record<string, string>>({});

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

  useEffect(() => {
    try {
      const rawUser = localStorage.getItem('user');
      if (rawUser) {
        const u = JSON.parse(rawUser);
        setCurrentUserRole(u?.role || null);
      }
      const rawText = localStorage.getItem('textOverrides');
      setTextOverridesJson(rawText || '');
      const rawImages = localStorage.getItem('imageOverridesById');
      setImageOverrides(rawImages ? JSON.parse(rawImages) : {});
      const rawImagesPath = localStorage.getItem('imageOverridesByPath');
      setImageOverridesByPath(rawImagesPath ? JSON.parse(rawImagesPath) : {});
      const rawVideo = localStorage.getItem('videoId');
      setVideoIdOverride(rawVideo ? JSON.parse(rawVideo) : '');
    } catch {
      setCurrentUserRole(null);
    }
  }, []);

  useEffect(() => {
    const run = async () => {
      if (!supabase) return;
      const bRes = await supabase
        .from('bookings')
        .select(`
          id,
          event_date,
          status,
          package:packages(name_fr,name_en,package_id),
          user:users(name)
        `)
        .order('event_date', { ascending: true });
      const clientsData = Array.isArray(bRes.data) ? bRes.data.map((b: any) => {
        const name = b?.user?.name || 'Client';
        const pkgName = locale === 'fr' ? b?.package?.name_fr || '' : b?.package?.name_en || '';
        return { id: b.id, name, date: b.event_date, package: pkgName, status: b.status === 'booked' || b.status === 'confirmed' ? 'Booked' : 'Inquiry' };
      }) : [];
      const bookingMap: Record<string, string> = {};
      clientsData.forEach(c => { bookingMap[c.name] = c.id; });
      setBookingIdByClient(bookingMap);
      if (clientsData.length) setClients(clientsData);
      const cRes = await supabase
        .from('contracts')
        .select(`
          id,
          document_name,
          status,
          booking:bookings(
            id,
            user:users(name)
          )
        `);
      const contractsData = Array.isArray(cRes.data) ? cRes.data.map((r: any) => {
        const client = r?.booking?.user?.name || 'Client';
        const status = r?.status === 'completed' ? 'Completed' : 'Awaiting Signature';
        return { client, document: r?.document_name || 'Main Venue Agreement', status, dateSent: new Date().toLocaleDateString() };
      }) : [];
      if (contractsData.length) setContracts(contractsData);
      const aRes = await supabase
        .from('accommodation_bookings')
        .select(`
          id,
          check_in_date,
          check_out_date,
          status,
          user:users(name),
          accommodation:accommodations(name_fr,name_en)
        `)
        .order('check_in_date', { ascending: true });
      const accData = Array.isArray(aRes.data) ? aRes.data.map((ab: any) => {
        const room = locale === 'fr' ? ab?.accommodation?.name_fr || '' : ab?.accommodation?.name_en || '';
        const status = ab?.status === 'confirmed' ? 'Confirmed' : 'Pending';
        return { id: ab.id, client: ab?.user?.name || 'Client', room, checkIn: ab?.check_in_date, checkOut: ab?.check_out_date, status };
      }) : [];
      if (accData.length) setAccommodations(accData);
      const pRes = await supabase
        .from('packages')
        .select('package_id,name_fr,name_en,base_price')
        .order('package_id');
      const pkgData = Array.isArray(pRes.data) ? pRes.data.map((p: any) => ({
        id: p.package_id,
        name: locale === 'fr' ? p.name_fr : p.name_en,
        priceHigh: Number(p.base_price),
        priceLow: Number(p.base_price),
      })) : [];
      if (pkgData.length) setPackages(pkgData);
      const mRes = await supabase
        .from('messages')
        .select(`
          id,
          message,
          sender_role,
          booking:bookings(
            id,
            user:users(name)
          )
        `)
        .order('created_at', { ascending: true });
      const msgData = Array.isArray(mRes.data) ? mRes.data.map((m: any) => ({
        id: m.id,
        client: m?.booking?.user?.name || 'Client',
        sender: String(m.sender_role).toLowerCase() === 'admin' ? 'Admin' : 'Client',
        text: m.message,
      })) : [];
      if (msgData.length) setMessages(msgData);
      const remote = await loadTextOverrides(locale);
      if (remote) {
        try {
          setTextOverridesJson(JSON.stringify(remote));
        } catch {}
      }
    };
    run();
  }, [locale]);

  useEffect(() => {
    const run = async () => {
      if (!supabase) return;
      try {
        const seededFlag = typeof window !== 'undefined' ? localStorage.getItem('contentSeeded') : null;
        if (seededFlag === 'true') return;
        const locales: ('fr' | 'en')[] = ['fr', 'en'];
        const walk = async (obj: any, path: string[], loc: 'fr' | 'en') => {
          for (const k of Object.keys(obj)) {
            const v = obj[k];
            const next = [...path, k];
            if (typeof v === 'string') {
              await saveTextOverride(next.join('.'), loc, v);
            } else if (v && typeof v === 'object' && !Array.isArray(v)) {
              await walk(v, next, loc);
            }
          }
        };
        for (const loc of locales) {
          await walk(translations[loc], [], loc);
        }
        try {
          localStorage.setItem('contentSeeded', 'true');
        } catch {}
      } catch {}
    };
    run();
  }, []);

  const handleSaveTextOverrides = () => {
    try {
      const parsed = textOverridesJson ? JSON.parse(textOverridesJson) : {};
      localStorage.setItem('textOverrides', JSON.stringify(parsed));
      toast({ title: "Textes mis à jour", description: "Les textes ont été sauvegardés." });
      if (supabase && parsed && typeof parsed === 'object') {
        const walk = async (obj: any, path: string[]) => {
          for (const k of Object.keys(obj)) {
            const v = obj[k];
            const next = [...path, k];
            if (typeof v === 'string') {
              await saveTextOverride(next.join('.'), locale, v);
            } else if (v && typeof v === 'object' && !Array.isArray(v)) {
              await walk(v, next);
            }
          }
        };
        walk(parsed, []);
      }
    } catch (e: any) {
      toast({ variant: "destructive", title: "JSON invalide", description: "Vérifiez le format des overrides." });
    }
  };

  const handleSaveImageOverrides = () => {
    localStorage.setItem('imageOverridesById', JSON.stringify(imageOverrides));
    toast({ title: "Images mises à jour", description: "Les images ont été sauvegardées." });
  };

  const handleSaveImageOverridesByPath = () => {
    localStorage.setItem('imageOverridesByPath', JSON.stringify(imageOverridesByPath));
    toast({ title: "Images par chemin mises à jour", description: "Les images par chemin ont été sauvegardées." });
  };

  const handleSaveVideoOverride = () => {
    localStorage.setItem('videoId', JSON.stringify(videoIdOverride));
    toast({ title: "Vidéo mise à jour", description: "L’identifiant YouTube a été sauvegardé." });
  };

  const handleCreateContract = () => {
    if (newContract.client && newContract.date && newContract.package) {
      const newClient = { id: `user-${Math.random()}`, name: newContract.client, date: newContract.date, package: newContract.package, status: 'Booked' };
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

  const handlePackagePriceChange = (packageId: string, season: 'priceHigh' | 'priceLow', newPrice: number) => {
    const updatedPackages = packages.map(p => 
      p.id === packageId 
        ? { ...p, [season]: newPrice } 
        : p
    );
    setPackages(updatedPackages);
  };

  const handleSavePackagePrices = () => {
    sharedState.setState({ packages });
    const run = async () => {
      if (supabase) {
        for (const pkg of packages) {
          await supabase.from('packages').update({ base_price: pkg.priceHigh }).eq('package_id', pkg.id);
        }
      }
      toast({
          title: "Tarifs mis à jour",
          description: "Les prix des forfaits ont été sauvegardés.",
      });
    };
    run();
  };

  const dayIsHighSeason = (day: Date) => highSeasonDates.some(d => d.getTime() === day.getTime());

  const sendAdminReply = async (client: string, text: string) => {
    if (!text.trim()) return;
    const bookingId = bookingIdByClient[client];
    if (supabase && bookingId) {
      const cur = await authService.getCurrentUser();
      const senderId = cur.profile?.id || cur.user?.id;
      if (!senderId) return;
      await supabase.from('messages').insert({
        booking_id: bookingId,
        sender_id: senderId,
        sender_role: 'admin',
        message: text.trim(),
      });
      setMessages(prev => [...prev, { id: Math.floor(Date.now()), client, sender: 'Admin', text }]);
    }
  };

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
            <TabsList className="grid w-full grid-cols-4 md:grid-cols-8">
              <TabsTrigger value="dashboard"><BarChart className="mr-2"/>{t.admin.tabs.dashboard}</TabsTrigger>
              <TabsTrigger value="clients"><Users className="mr-2"/>{t.admin.tabs.clients}</TabsTrigger>
              <TabsTrigger value="contracts"><FileText className="mr-2"/>{t.admin.tabs.contracts}</TabsTrigger>
              <TabsTrigger value="accommodations"><Hotel className="mr-2"/>Hébergements</TabsTrigger>
              <TabsTrigger value="messages"><MessageSquare className="mr-2"/>Messagerie</TabsTrigger>
              <TabsTrigger value="packages"><Settings className="mr-2"/>Forfaits</TabsTrigger>
              <TabsTrigger value="calendar"><CalendarDays className="mr-2"/>{t.admin.tabs.calendar}</TabsTrigger>
              <TabsTrigger value="media"><Settings className="mr-2"/>Médias</TabsTrigger>
              
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
                            onSelect={(days) => setHighSeasonDates(days ?? [])}
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
            
            <TabsContent value="media" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Gestion des Médias</CardTitle>
                  <CardDescription>Uploader des images et définir la vidéo d’accueil.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Identifiant de l’image</Label>
                      <Input placeholder="ex: package-classic" value={mediaKey} onChange={(e) => setMediaKey(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label>Type de média</Label>
                      <Select value={mediaType} onValueChange={(v) => setMediaType(v as 'image' | 'video')}>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="image">Image</SelectItem>
                          <SelectItem value="video">Vidéo</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Fichier</Label>
                    <Input type="file" accept={mediaType === 'image' ? 'image/*' : 'video/*'} onChange={(e) => setMediaFile(e.target.files?.[0] || null)} />
                  </div>
                  <div className="flex gap-3">
                    <Button
                      disabled={!mediaKey || !mediaFile || isUploading}
                      onClick={async () => {
                        if (!mediaKey || !mediaFile) return;
                        try {
                          setIsUploading(true);
                          await uploadAndOverrideMedia(mediaKey, mediaType, mediaFile);
                          toast({ title: "Média mis à jour", description: "Le site utilisera désormais le nouveau média." });
                        } catch (e: any) {
                          toast({ variant: "destructive", title: "Échec de l’upload", description: e?.message || "Vérifiez vos droits et la connexion." });
                        } finally {
                          setIsUploading(false);
                        }
                      }}
                    >
                      {isUploading ? "Upload en cours..." : "Uploader le média"}
                    </Button>
                  </div>
                  <Separator />
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Identifiant YouTube de la vidéo d’accueil</Label>
                      <Input placeholder="ex: II3mIKxM_JI" value={videoIdOverride} onChange={(e) => setVideoIdOverride(e.target.value)} />
                    </div>
                    <div className="flex items-end">
                      <Button
                        onClick={async () => {
                          try {
                            await setMediaOverride('videoId', 'video', videoIdOverride);
                            toast({ title: "Vidéo mise à jour", description: "La vidéo d’accueil a été modifiée." });
                          } catch (e: any) {
                            toast({ variant: "destructive", title: "Échec de la mise à jour", description: e?.message || "Vérifiez vos droits et la connexion." });
                          }
                        }}
                      >
                        Sauvegarder l’identifiant
                      </Button>
                    </div>
                  </div>
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
                                    <AdminReply client={client.name} onSend={sendAdminReply} />
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
                              onChange={(e) => handlePackagePriceChange(pkg.id, 'priceHigh', Number(e.target.value))}
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
                                onChange={(e) => handlePackagePriceChange(pkg.id, 'priceLow', Number(e.target.value))}
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

function AdminReply({ client, onSend }: { client: string; onSend: (client: string, text: string) => Promise<void> | void }) {
  const [text, setText] = useState('');
  return (
    <div className="mt-4 flex gap-2">
      <Textarea placeholder="Répondre..." className="flex-1" value={text} onChange={(e)=>setText(e.target.value)} />
      <Button onClick={async () => { if (text.trim()) { await onSend(client, text.trim()); setText(''); } }}>
        <Send className="w-4 h-4"/>
      </Button>
    </div>
  );
}

    
