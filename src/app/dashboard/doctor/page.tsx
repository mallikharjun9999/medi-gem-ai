
'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { useEffect, useState } from 'react';
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
import { Home, Users, BarChart3, Settings } from 'lucide-react';
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

const populationAnalytics = {
    avgHeartRate: 76,
    avgSystolic: 124,
    avgDiastolic: 81,
    avgOxygen: 97,
    highRiskCount: 1,
}

export default function DoctorDashboard() {
  const { user, userData, loading, logout } = useAuth();
  const router = useRouter();
  const [activeView, setActiveView] = useState('dashboard');

  useEffect(() => {
    if (!loading && (!user || userData?.role !== 'doctor')) {
      router.replace('/login');
    }
  }, [user, userData, loading, router]);
  
  if (loading || !userData) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  const renderContent = () => {
    switch(activeView) {
        case 'dashboard':
            return (
                <div className="grid gap-6">
                     <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1">
                        <div className="lg:col-span-1">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Population Health Analytics</CardTitle>
                                    <CardDescription>High-level overview of patient population vitals.</CardDescription>
                                </CardHeader>
                                <CardContent className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                                    <div className="rounded-lg border p-4">
                                        <h3 className="text-sm font-medium text-muted-foreground">Avg. Heart Rate</h3>
                                        <p className="text-2xl font-bold">{populationAnalytics.avgHeartRate} <span className="text-sm font-normal">BPM</span></p>
                                    </div>
                                    <div className="rounded-lg border p-4">
                                        <h3 className="text-sm font-medium text-muted-foreground">Avg. Blood Pressure</h3>
                                        <p className="text-2xl font-bold">{populationAnalytics.avgSystolic}/{populationAnalytics.avgDiastolic} <span className="text-sm font-normal">mmHg</span></p>
                                    </div>
                                    <div className="rounded-lg border p-4">
                                        <h3 className="text-sm font-medium text-muted-foreground">Avg. O2 Saturation</h3>
                                        <p className="text-2xl font-bold">{populationAnalytics.avgOxygen}<span className="text-sm font-normal">%</span></p>
                                    </div>
                                    <div className="rounded-lg border p-4">
                                        <h3 className="text-sm font-medium text-muted-foreground">High-Risk Patients</h3>
                                        <p className="text-2xl font-bold">{populationAnalytics.highRiskCount}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                        <div className="lg:col-span-1">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Recent Patient Activity</CardTitle>
                                    <CardDescription>A list of recently active patients.</CardDescription>
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
                                        {allPatients.slice(0, 5).map((patient) => (
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
                    </div>
                </div>
            );
        case 'all-patients':
            return (
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
            );
        case 'analytics':
             return (
                <Card>
                    <CardHeader>
                        <CardTitle>Patient Vitals Analytics</CardTitle>
                        <CardDescription>Overview of patient vitals across the population.</CardDescription>
                    </CardHeader>
                    <CardContent>
                       <VitalsHistoryChart />
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
              <SidebarMenuButton onClick={() => setActiveView('all-patients')} isActive={activeView === 'all-patients'}>
                <Users />
                All Patients
              </SidebarMenuButton>
            </SidebarMenuItem>
             <SidebarMenuItem>
              <SidebarMenuButton onClick={() => setActiveView('analytics')} isActive={activeView === 'analytics'}>
                <BarChart3 />
                Analytics
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <Header />
        <main className="p-4 sm:p-6 flex-1">
          <h1 className="text-2xl font-bold mb-4">Doctor Dashboard</h1>
          <p className="text-muted-foreground mb-6">Welcome, {userData.name}. You have access to all patient data.</p>
          {renderContent()}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
