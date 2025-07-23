
'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import {
  SidebarProvider,
  Sidebar,
  SidebarMenu,
  SidebarHeader,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarContent,
  SidebarInset,
} from '@/components/ui/sidebar';
import { Home, Users, Settings, BarChart3, BellRing, Bot } from 'lucide-react';
import { Logo } from '@/components/icons';
import { Header } from '@/components/header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface AppUser {
    id: string;
    name: string;
    email: string;
    role: 'patient' | 'caregiver' | 'doctor' | 'admin';
}

const systemMetrics = {
    totalLogs: 1254,
    activeUsers: 23,
    alertCount: 42,
    geminiApiCalls: 789,
    functionInvocations: 1560,
};

export default function AdminDashboard() {
  const { user, userData, loading } = useAuth();
  const router = useRouter();
  const [activeView, setActiveView] = useState('dashboard');
  const [allUsers, setAllUsers] = useState<AppUser[]>([]);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [alertConfig, setAlertConfig] = useState({
      aiAssistantEnabled: true,
      heartRateMax: 120,
      oxygenLevelMin: 90,
  });


  useEffect(() => {
    if (!loading && (!user || userData?.role !== 'admin')) {
      router.replace('/login');
    }
  }, [user, userData, loading, router]);
  
  useEffect(() => {
      if (userData?.role === 'admin') {
        setIsDataLoading(true);
        const unsubscribe = onSnapshot(collection(db, 'users'), (snapshot) => {
            const usersData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as AppUser));
            setAllUsers(usersData);
            setIsDataLoading(false);
        });

        return () => unsubscribe();
      }
  }, [userData]);


  if (loading || !userData) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }
  
  const renderUserTableByRole = (role: AppUser['role']) => {
      const filteredUsers = allUsers.filter(u => u.role === role);
      const title = role.charAt(0).toUpperCase() + role.slice(1) + 's';

      return (
          <Card key={role}>
              <CardHeader>
                  <CardTitle>{title} ({filteredUsers.length})</CardTitle>
                  <CardDescription>All users with the {role} role.</CardDescription>
              </CardHeader>
              <CardContent>
                  <ScrollArea className="h-72">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>User Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Current Role</TableHead>
                                <TableHead>Change Role</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredUsers.length > 0 ? (
                                filteredUsers.map((u) => (
                                    <TableRow key={u.id}>
                                        <TableCell className="font-medium">{u.name}</TableCell>
                                        <TableCell>{u.email}</TableCell>
                                        <TableCell>
                                            <Badge variant="outline">{u.role}</Badge>
                                        </TableCell>
                                        <TableCell>
                                            <Select defaultValue={u.role}>
                                                <SelectTrigger className="w-[180px]">
                                                    <SelectValue placeholder="Select role" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="patient">Patient</SelectItem>
                                                    <SelectItem value="caregiver">Caregiver</SelectItem>
                                                    <SelectItem value="doctor">Doctor</SelectItem>
                                                    <SelectItem value="admin">Admin</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center">No users found.</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                  </ScrollArea>
              </CardContent>
          </Card>
      );
  }
  
  const renderContent = () => {
      switch(activeView) {
        case 'dashboard':
            return (
                 <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <Card>
                        <CardHeader>
                            <CardTitle>Total Vitals Logs</CardTitle>
                            <CardDescription>{systemMetrics.totalLogs}</CardDescription>
                        </CardHeader>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Active Users</CardTitle>
                            <CardDescription>{allUsers.length}</CardDescription>
                        </CardHeader>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Critical Alerts</CardTitle>
                            <CardDescription>{systemMetrics.alertCount}</CardDescription>
                        </CardHeader>
                    </Card>
                </div>
            )
        case 'user-management':
            return (
                 <div className="space-y-6">
                    {isDataLoading ? (
                        <p>Loading users...</p>
                    ) : (
                        <>
                           {renderUserTableByRole('admin')}
                           {renderUserTableByRole('doctor')}
                           {renderUserTableByRole('caregiver')}
                           {renderUserTableByRole('patient')}
                        </>
                    )}
                 </div>
            );
        case 'system-metrics':
            return (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                            <CardTitle className="text-sm font-medium">Total Vitals Logs</CardTitle>
                            <BarChart3 className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{systemMetrics.totalLogs}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{allUsers.length}</div>
                        </CardContent>
                    </Card>
                    <Card>
                         <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                            <CardTitle className="text-sm font-medium">Critical Alerts</CardTitle>
                            <BellRing className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{systemMetrics.alertCount}</div>
                        </CardContent>
                    </Card>
                     <Card>
                         <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                            <CardTitle className="text-sm font-medium">Gemini API Calls</CardTitle>
                            <Bot className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{systemMetrics.geminiApiCalls}</div>
                            <p className="text-xs text-muted-foreground">in the last 24 hours</p>
                        </CardContent>
                    </Card>
                     <Card>
                         <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                            <CardTitle className="text-sm font-medium">Function Invocations</CardTitle>
                            <Settings className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{systemMetrics.functionInvocations}</div>
                             <p className="text-xs text-muted-foreground">in the last 24 hours</p>
                        </CardContent>
                    </Card>
                </div>
            );
        case 'alerts-config':
            return (
                <Card>
                    <CardHeader>
                        <CardTitle>Alerts Configuration</CardTitle>
                        <CardDescription>Set thresholds for critical alerts and manage AI features.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                       <div className="flex items-center justify-between space-x-2 rounded-lg border p-4">
                           <div className="space-y-0.5">
                               <Label htmlFor="ai-assistant-switch" className="text-base">AI Assistant</Label>
                               <p className="text-sm text-muted-foreground">Enable or disable the patient-facing Gemini chatbot.</p>
                           </div>
                           <Switch
                                id="ai-assistant-switch"
                                checked={alertConfig.aiAssistantEnabled}
                                onCheckedChange={(checked) => setAlertConfig(prev => ({...prev, aiAssistantEnabled: checked}))}
                           />
                       </div>
                       <div className="space-y-4">
                           <h3 className="text-lg font-medium">Alert Thresholds</h3>
                           <div className="grid gap-4 md:grid-cols-2">
                               <div>
                                   <Label htmlFor="hr-max">Max Heart Rate (BPM)</Label>
                                   <Input id="hr-max" type="number" value={alertConfig.heartRateMax} onChange={(e) => setAlertConfig(prev => ({...prev, heartRateMax: Number(e.target.value)}))} />
                                   <p className="text-xs text-muted-foreground mt-1">Alert caregiver if heart rate exceeds this value.</p>
                               </div>
                               <div>
                                   <Label htmlFor="o2-min">Min Oxygen Level (%)</Label>
                                   <Input id="o2-min" type="number" value={alertConfig.oxygenLevelMin} onChange={(e) => setAlertConfig(prev => ({...prev, oxygenLevelMin: Number(e.target.value)}))} />
                                   <p className="text-xs text-muted-foreground mt-1">Alert caregiver if O2 level drops below this value.</p>
                               </div>
                           </div>
                       </div>
                       <Button>Save Changes</Button>
                    </CardContent>
                </Card>
            );
        default:
            return null;
      }
  }

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2" data-sidebar="logo">
            <Logo className="size-8" />
            <span className="text-lg font-semibold">MediGem</span>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton onClick={() => setActiveView('dashboard')} isActive={activeView === 'dashboard'}>
                <Home />
                Admin Dashboard
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton onClick={() => setActiveView('user-management')} isActive={activeView === 'user-management'}>
                <Users />
                User Management
              </SidebarMenuButton>
            </SidebarMenuItem>
             <SidebarMenuItem>
              <SidebarMenuButton onClick={() => setActiveView('system-metrics')} isActive={activeView === 'system-metrics'}>
                <BarChart3 />
                System Metrics
              </SidebarMenuButton>
            </SidebarMenuItem>
             <SidebarMenuItem>
              <SidebarMenuButton onClick={() => setActiveView('alerts-config')} isActive={activeView === 'alerts-config'}>
                <BellRing />
                Alerts Config
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
       <SidebarInset>
        <Header />
        <main className="p-4 sm:p-6 flex-1">
          <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
          <p className="text-muted-foreground mb-6">Welcome, {userData.name}.</p>
          {renderContent()}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
