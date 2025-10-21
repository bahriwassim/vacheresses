
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
import { BarChart, Users, FileText, CalendarDays, Euro, PlusCircle } from "lucide-react";
import { useLocale } from "@/hooks/use-locale";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Shared state simulation
const createSharedState = () => {
  let listeners: ((data: any) => void)[] = [];
  let state = {
    clients: [
      { name: "Samantha & Chloe", date: "2025-06-14", package: "Premium Romance", status: "Booked" },
      { name: "Alex & Jordan", date: "2025-07-20", package: "Classic Elegance", status: "Booked" },
      { name: "Michael & David", date: "2025-08-05", package: "Luxury Dream", status: "Booked" },
      { name: "Emily & James", date: "2025-09-01", package: "Premium Romance", status: "Inquiry" },
    ],
    contracts: [
      { client: "Samantha & Chloe", document: "Main Venue Agreement", status: "Awaiting Signature", dateSent: "May 20, 2024" },
      { client: "Alex & Jordan", document: "Main Venue Agreement", status: "Completed", dateSent: "May 15, 2024" },
      { client: "Samantha & Chloe", document: "Catering Addendum", status: "Completed", dateSent: "May 15, 2024"},
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
  const [clients, setClients] = useState(sharedState.getState().clients);
  const [contracts, setContracts] = useState(sharedState.getState().contracts);
  const [newContract, setNewContract] = useState({ client: '', date: '', package: '' });
  const [isCreateDialogOpen, setCreateDialogOpen] = useState(false);
  const [isViewDialogOpen, setViewDialogOpen] = useState(false);
  const [viewedContract, setViewedContract] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = sharedState.subscribe(state => {
      setClients(state.clients);
      setContracts(state.contracts);
    });
    return () => unsubscribe();
  }, []);

  const handleCreateContract = () => {
    if (newContract.client && newContract.date && newContract.package) {
      const newClient = { ...newContract, status: 'Booked' };
      const newContractEntry = { client: newContract.client, document: 'Main Venue Agreement', status: 'Awaiting Signature', dateSent: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: '2024' }) };

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
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
              <TabsTrigger value="dashboard"><BarChart className="mr-2"/>{t.admin.tabs.dashboard}</TabsTrigger>
              <TabsTrigger value="clients"><Users className="mr-2"/>{t.admin.tabs.clients}</TabsTrigger>
              <TabsTrigger value="calendar"><CalendarDays className="mr-2"/>{t.admin.tabs.calendar}</TabsTrigger>
              <TabsTrigger value="contracts"><FileText className="mr-2"/>{t.admin.tabs.contracts}</TabsTrigger>
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
                                    <TableRow key={client.name}>
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
                        <CardTitle>{t.admin.venue_calendar.title}</CardTitle>
                        <CardDescription>{t.admin.venue_calendar.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex justify-center">
                        <Calendar
                            mode="multiple"
                            className="p-0"
                            defaultMonth={new Date(2025, 5)}
                        />
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
                            <TableCell>{t.admin.all_contracts.doc_main}</TableCell>
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

          </Tabs>

          <Dialog open={isViewDialogOpen} onOpenChange={setViewDialogOpen}>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>{t.admin.view_contract.title}: {viewedContract?.document === 'Main Venue Agreement' ? t.dashboard.contracts.doc_main : t.dashboard.contracts.doc_catering}</DialogTitle>
              </DialogHeader>
              <div className="prose dark:prose-invert max-w-none max-h-[60vh] overflow-y-auto p-4 border rounded-md">
                <h3>{viewedContract?.document === 'Main Venue Agreement' ? t.dashboard.contracts.doc_main : t.dashboard.contracts.doc_catering} {t.admin.view_contract.for} {viewedContract?.client}</h3>
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
