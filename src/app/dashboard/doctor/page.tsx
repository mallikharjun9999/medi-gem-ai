
'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { useEffect } from 'react';
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
import { Home, Users, BarChart3, LogOut, Settings } from 'lucide-react';
import { Logo } from '@/components/icons';
import { Header } from '@/components/header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { VitalsHistoryChart } from '@/components/vitals-history-chart';


const allPatients = [
    { id: 'patient1', name: 'John Doe', lastCheckup: '2024-07-15', risk: 'Low', status: 'Normal' },
    { id: 'patient2', name: 'Jane Smith', lastCheckup: '2024-07-20', risk: 'Medium', status: 'Elevated' },
    { id: 'patient3', name: 'Bob Johnson', lastCheckup: '2024-06-30', risk: 'Low', status: 'Normal' },
    { id: 'patient4', name: 'Alice Williams', lastCheckup: '2024-07-22', risk: 'High', status: 'High' },
    { id: 'patient5', name: 'Chris Green', lastCheckup: '2024-07-01', risk: 'Low', status: 'Normal' },
  ];

export default function DoctorDashboard() {
  const { user, userData, loading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || userData?.role !== 'doctor')) {
      router.replace('/login');
    }
  }, [user, userData, loading, router]);
  
  if (loading || !userData) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
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
              <SidebarMenuButton href="#" isActive>
                <Home />
                Dashboard
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton href="#">
                <Users />
                All Patients
              </SidebarMenuButton>
            </SidebarMenuItem>
             <SidebarMenuItem>
              <SidebarMenuButton href="#">
                <BarChart3 />
                Analytics
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton href="#">
                <Settings />
                Settings
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton onClick={logout}>
                <LogOut />
                Logout
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <Header />
        <main className="p-4 sm:p-6 flex-1">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
             <div className="lg:col-span-3">
                <Card>
                    <CardHeader>
                        <CardTitle>All Patients</CardTitle>
                        <CardDescription>A list of all patients in the system.</CardDescription>
                    </CardHeader>
                    <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                            <TableHead>Patient Name</TableHead>
                            <TableHead>Last Checkup</TableHead>
                            <TableHead>Risk Level</TableHead>
                            <TableHead>Current Status</TableHead>
                            <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {allPatients.map((patient) => (
                            <TableRow key={patient.id}>
                                <TableCell className="font-medium">{patient.name}</TableCell>
                                <TableCell>{patient.lastCheckup}</TableCell>
                                <TableCell>
                                    <Badge variant={patient.risk === 'Low' ? 'outline' : patient.risk === 'Medium' ? 'secondary' : 'destructive'}>
                                        {patient.risk}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <Badge variant={patient.status === 'Normal' ? 'default' : 'destructive'}  className={patient.status === 'Normal' ? 'bg-accent text-accent-foreground' : ''}>
                                        {patient.status}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <button className="text-primary hover:underline">View Chart</button>
                                </TableCell>
                            </TableRow>
                            ))}
                        </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
             <div className="lg:col-span-3">
                <Card>
                    <CardHeader>
                        <CardTitle>Population Health Analytics</CardTitle>
                        <CardDescription>Overview of patient vitals across the population.</CardDescription>
                    </CardHeader>
                    <CardContent>
                       <VitalsHistoryChart />
                    </CardContent>
                </Card>
             </div>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}

