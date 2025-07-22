
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
import { Home, Stethoscope, FileText, LogOut, Settings } from 'lucide-react';
import { Logo } from '@/components/icons';
import { Header } from '@/components/header';
import { VitalsHistoryChart } from '@/components/vitals-history-chart';
import { HealthQueryCard } from '@/components/health-query-card';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

const recentVitals = [
  { date: '2024-07-29', heartRate: 75, bp: '120/80', temp: 98.6, status: 'Normal' },
  { date: '2024-07-28', heartRate: 80, bp: '122/81', temp: 98.9, status: 'Normal' },
  { date: '2024-07-27', heartRate: 90, bp: '130/85', temp: 99.5, status: 'Elevated' },
  { date: '2024-07-26', heartRate: 72, bp: '118/78', temp: 98.4, status: 'Normal' },
];

export default function PatientDashboard() {
  const { user, userData, loading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || userData?.role !== 'patient')) {
      router.replace('/login');
    }
  }, [user, userData, loading, router]);

  if (loading || !userData) {
    // You can return a loading spinner here
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
                <Stethoscope />
                Vitals
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton href="#">
                <FileText />
                Reports
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
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <Header />
        <main className="p-4 sm:p-6 flex-1">
          <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
          <p className="text-muted-foreground mb-6">Welcome, {userData.name}.</p>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
             <div className="lg:col-span-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Vitals History</CardTitle>
                        <CardDescription>Your recent vitals overview.</CardDescription>
                    </CardHeader>
                    <CardContent>
                       <VitalsHistoryChart />
                    </CardContent>
                </Card>
             </div>
             <div>
                <HealthQueryCard />
             </div>
             <div className="lg:col-span-3">
                <Card>
                    <CardHeader>
                        <CardTitle>Recent Vitals Log</CardTitle>
                        <CardDescription>A log of your most recent vitals readings.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Heart Rate</TableHead>
                                    <TableHead>Blood Pressure</TableHead>
                                    <TableHead>Temperature</TableHead>
                                    <TableHead>Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {recentVitals.map((vital) => (
                                <TableRow key={vital.date}>
                                    <TableCell>{vital.date}</TableCell>
                                    <TableCell>{vital.heartRate} BPM</TableCell>
                                    <TableCell>{vital.bp} mmHg</TableCell>
                                    <TableCell>{vital.temp} °F</TableCell>
                                    <TableCell>
                                        <Badge variant={vital.status === 'Normal' ? 'default' : 'destructive'} className={vital.status === 'Normal' ? 'bg-accent text-accent-foreground' : ''}>{vital.status}</Badge>
                                    </TableCell>
                                </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
