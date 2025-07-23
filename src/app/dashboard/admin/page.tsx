
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
  SidebarFooter,
  SidebarInset,
} from '@/components/ui/sidebar';
import { Home, Users, Settings, BarChart3, BellRing } from 'lucide-react';
import { Logo } from '@/components/icons';
import { Header } from '@/components/header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';

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
};

export default function AdminDashboard() {
  const { user, userData, loading } = useAuth();
  const router = useRouter();
  const [activeView, setActiveView] = useState('dashboard');
  const [allUsers, setAllUsers] = useState<AppUser[]>([]);
  const [isDataLoading, setIsDataLoading] = useState(true);

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
        case 'alerts-config':
            return (
                <Card>
                    <CardHeader>
                        <CardTitle>Coming Soon</CardTitle>
                        <CardDescription>This feature is under development.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p>Stay tuned for updates!</p>
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
                Dashboard
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
