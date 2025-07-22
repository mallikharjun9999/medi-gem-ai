
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
import { Home, Users, Bell, Settings } from 'lucide-react';
import { Logo } from '@/components/icons';
import { Header } from '@/components/header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

// Mock data, to be replaced with Firestore data
const assignedPatients = [
  { id: 'patient1', name: 'John Doe', lastVital: '120/80 mmHg', lastVitalTime: '5m ago', status: 'Normal' },
  { id: 'patient2', name: 'Jane Smith', lastVital: '135/88 mmHg', lastVitalTime: '10m ago', status: 'Elevated' },
  { id: 'patient3', name: 'Bob Johnson', lastVital: '118/76 mmHg', lastVitalTime: '1h ago', status: 'Normal' },
  { id: 'patient4', name: 'Alice Williams', lastVital: '140/92 mmHg', lastVitalTime: '2h ago', status: 'High' },
];

const alerts = [
    { id: 1, patientName: 'Alice Williams', message: 'High blood pressure detected', time: '2h ago' },
    { id: 2, patientName: 'Jane Smith', message: 'Heart rate slightly elevated', time: '15m ago' },
];

export default function CaregiverDashboard() {
  const { user, userData, loading } = useAuth();
  const router = useRouter();
  const [activeView, setActiveView] = useState('dashboard');

  useEffect(() => {
    if (!loading && (!user || userData?.role !== 'caregiver')) {
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
                <Card>
                    <CardHeader>
                        <CardTitle>Assigned Patients</CardTitle>
                        <CardDescription>Monitor the real-time vitals and status of your patients.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                        <TableHeader>
                            <TableRow>
                            <TableHead>Patient Name</TableHead>
                            <TableHead>Last Vital Reading</TableHead>
                            <TableHead>Time</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {assignedPatients.map((patient) => (
                            <TableRow key={patient.id}>
                                <TableCell className="font-medium">{patient.name}</TableCell>
                                <TableCell>{patient.lastVital}</TableCell>
                                <TableCell>{patient.lastVitalTime}</TableCell>
                                <TableCell>
                                <Badge variant={patient.status === 'Normal' ? 'default' : patient.status === 'Elevated' ? 'secondary' : 'destructive'} className={patient.status === 'Normal' ? 'bg-accent text-accent-foreground' : ''}>
                                    {patient.status}
                                </Badge>
                                </TableCell>
                                <TableCell>
                                <button className="text-primary hover:underline">View Details</button>
                                </TableCell>
                            </TableRow>
                            ))}
                        </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            );
        case 'alerts':
            return (
                <Card>
                    <CardHeader>
                        <CardTitle>Recent Alerts</CardTitle>
                        <CardDescription>Critical alerts from your assigned patients.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Patient</TableHead>
                                    <TableHead>Alert</TableHead>
                                    <TableHead>Time</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {alerts.map((alert) => (
                                    <TableRow key={alert.id}>
                                        <TableCell>{alert.patientName}</TableCell>
                                        <TableCell>{alert.message}</TableCell>
                                        <TableCell>{alert.time}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            )
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
              <SidebarMenuButton onClick={() => setActiveView('dashboard')} isActive={false}>
                <Users />
                Patients
              </SidebarMenuButton>
            </SidebarMenuItem>
             <SidebarMenuItem>
              <SidebarMenuButton onClick={() => setActiveView('alerts')} isActive={activeView === 'alerts'}>
                <Bell />
                Alerts
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
          <h1 className="text-2xl font-bold mb-4">Caregiver Dashboard</h1>
          <p className="text-muted-foreground mb-6">Welcome, {userData.name}.</p>
           {renderContent()}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
