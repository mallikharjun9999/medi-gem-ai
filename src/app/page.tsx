import {
  Home,
  HeartPulse,
  Stethoscope,
  FileText,
  Settings,
  BotMessageSquare,
  AlertTriangle,
  Droplets,
  Thermometer,
  Activity,
  User,
  LogOut,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarInset,
} from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

import { Logo } from '@/components/icons';
import { Header } from '@/components/header';
import { VitalsHistoryChart } from '@/components/vitals-history-chart';
import { HealthQueryCard } from '@/components/health-query-card';

const symptoms = [
  { date: '2024-07-21', description: 'Mild headache and fatigue.' },
  { date: '2024-07-20', description: 'Sore throat.' },
  { date: '2024-07-19', description: 'Feeling better, slight cough remains.' },
];

export default function DashboardPage() {
  return (
    <SidebarProvider>
      <div className="min-h-screen w-full bg-background">
        <Sidebar>
          <SidebarHeader>
            <div className="flex items-center gap-2">
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
                  <HeartPulse />
                  Vitals
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton href="#">
                  <Stethoscope />
                  Appointments
                  <Badge variant="secondary" className="ml-auto">
                    2
                  </Badge>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton href="#">
                  <FileText />
                  Medical Records
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton href="#">
                  <BotMessageSquare />
                  AI Assistant
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
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="group/menu-item relative">
                    <SidebarMenuButton>
                      <Avatar className="size-7">
                        <AvatarImage src="https://placehold.co/100x100.png" alt="@shadcn" data-ai-hint="woman smiling"/>
                        <AvatarFallback>SD</AvatarFallback>
                      </Avatar>
                      <span className="font-medium">Sofia Davis</span>
                    </SidebarMenuButton>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="mb-2 ml-2" side="right" align="start">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>

        <SidebarInset>
          <Header />
          <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
            <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Heart Rate</CardTitle>
                  <HeartPulse className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">78 BPM</div>
                  <p className="text-xs text-muted-foreground">Normal</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Blood Pressure</CardTitle>
                  <Droplets className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">120/80 mmHg</div>
                  <p className="text-xs text-muted-foreground">Normal</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Temperature</CardTitle>
                  <Thermometer className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">98.6°F</div>
                  <p className="text-xs text-muted-foreground">Normal</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Activity Level</CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">8,230 Steps</div>
                  <p className="text-xs text-muted-foreground">+1,200 from yesterday</p>
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
              <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
                <Alert variant="destructive" className="bg-destructive/10">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>Critical Alert: High Blood Pressure</AlertTitle>
                  <AlertDescription>
                    Your recent reading of 165/95 mmHg is high. Please rest and monitor. If it persists, consult your doctor.
                  </AlertDescription>
                </Alert>
                <Card className="xl:col-span-2">
                  <CardHeader>
                    <CardTitle>Vitals History</CardTitle>
                    <CardDescription>
                      Your vitals history over the last 7 days.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <VitalsHistoryChart />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Symptoms</CardTitle>
                  </CardHeader>
                  <CardContent className="grid gap-4">
                    {symptoms.map((symptom, index) => (
                      <div key={index} className="flex items-start gap-4">
                         <Avatar className="h-9 w-9 border">
                            <AvatarImage src="https://placehold.co/100x100.png" alt="Avatar" data-ai-hint="woman smiling"/>
                            <AvatarFallback>SD</AvatarFallback>
                          </Avatar>
                        <div className="grid gap-1">
                          <p className="text-sm font-medium leading-none">{symptom.description}</p>
                          <p className="text-sm text-muted-foreground">{symptom.date}</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
              <div className="grid auto-rows-max items-start gap-4 md:gap-8">
                <HealthQueryCard />
              </div>
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
