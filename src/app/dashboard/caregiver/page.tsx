
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
  SidebarInset,
} from '@/components/ui/sidebar';
import { Home, Users, Bell, FileText } from 'lucide-react';
import { Logo } from '@/components/icons';
import { Header } from '@/components/header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { db } from '@/lib/firebase';
import { collection, query, onSnapshot, orderBy, limit } from 'firebase/firestore';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface Patient {
  id: string;
  name: string;
  lastVital: string;
  lastVitalTime: string;
  status: 'Normal' | 'Elevated' | 'High';
  doctorsNote?: string;
  noteTimestamp?: Date;
}

const alertsMock = [
    { id: 1, patientName: 'Alice Williams', message: 'High blood pressure detected', time: '2h ago' },
    { id: 2, patientName: 'Jane Smith', message: 'Heart rate slightly elevated', time: '15m ago' },
];

export default function CaregiverDashboard() {
  const { user, userData, loading } = useAuth();
  const router = useRouter();
  const [activeView, setActiveView] = useState('dashboard');
  const [assignedPatients, setAssignedPatients] = useState<Patient[]>([]);
  const [alerts, setAlerts] = useState(alertsMock);

  useEffect(() => {
    if (!loading && (!user || userData?.role !== 'caregiver')) {
      router.replace('/login');
    }
  }, [user, userData, loading, router]);
  
   useEffect(() => {
    if (user && userData?.role === 'caregiver') {
        const initialPatients: Patient[] = [
          { id: 'patient1', name: 'John Doe', lastVital: '120/80 mmHg', lastVitalTime: '5m ago', status: 'Normal' },
          { id: 'patient2', name: 'Jane Smith', lastVital: '135/88 mmHg', lastVitalTime: '10m ago', status: 'Elevated' },
          { id: 'patient3', name: 'Bob Johnson', lastVital: '118/76 mmHg', lastVitalTime: '1h ago', status: 'Normal' },
          { id: 'patient4', name: 'Alice Williams', lastVital: '140/92 mmHg', lastVitalTime: '2h ago', status: 'High' },
        ];
        
        const patientSubscriptions = initialPatients.map(p => {
            const notesQuery = query(collection(db, 'users', p.id, 'notes'), orderBy('timestamp', 'desc'), limit(1));
            return onSnapshot(notesQuery, (snapshot) => {
                const latestNote = snapshot.docs[0]?.data();
                setAssignedPatients(prev => prev.map(patient => 
                    patient.id === p.id 
                    ? { ...patient, doctorsNote: latestNote?.note, noteTimestamp: latestNote?.timestamp.toDate() } 
                    : patient
                ));
            });
        });
        
        setAssignedPatients(initialPatients);

        return () => patientSubscriptions.forEach(unsub => unsub());
    }
  }, [user, userData]);


  if (loading || !userData) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }
  
  const renderPatientList = () => (
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
                </TableRow>
            </TableHeader>
            <TableBody>
                {assignedPatients.map((patient) => (
                <>
                    <TableRow key={patient.id}>
                        <TableCell className="font-medium">{patient.name}</TableCell>
                        <TableCell>{patient.lastVital}</TableCell>
                        <TableCell>{patient.lastVitalTime}</TableCell>
                        <TableCell>
                        <Badge variant={patient.status === 'Normal' ? 'default' : patient.status === 'Elevated' ? 'secondary' : 'destructive'} className={patient.status === 'Normal' ? 'bg-accent text-accent-foreground' : ''}>
                            {patient.status}
                        </Badge>
                        </TableCell>
                    </TableRow>
                    {patient.doctorsNote && (
                         <TableRow key={`${patient.id}-note`}>
                            <TableCell colSpan={4}>
                                 <Alert>
                                    <FileText className="h-4 w-4" />
                                    <AlertTitle>Doctor's Note ({patient.noteTimestamp?.toLocaleDateString()})</AlertTitle>
                                    <AlertDescription>
                                        {patient.doctorsNote}
                                    </AlertDescription>
                                </Alert>
                            </TableCell>
                         </TableRow>
                    )}
                 </>
                ))}
            </TableBody>
            </Table>
        </CardContent>
    </Card>
  )

  const renderContent = () => {
      switch(activeView) {
          case 'dashboard':
            return (
                <div className="space-y-6">
                  {renderPatientList()}
                </div>
            );
        case 'patients':
            return (
                <div className="space-y-6">
                  {renderPatientList()}
                </div>
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
              <SidebarMenuButton onClick={() => setActiveView('patients')} isActive={activeView === 'patients'}>
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
