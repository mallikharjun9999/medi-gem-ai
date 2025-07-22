
'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export default function DashboardRedirector() {
  const { userData, loading, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.replace('/login');
        return;
      }
      if (userData) {
        switch (userData.role) {
          case 'patient':
            router.replace('/dashboard/patient');
            break;
          case 'caregiver':
            router.replace('/dashboard/caregiver');
            break;
          case 'doctor':
            router.replace('/dashboard/doctor');
            break;
          default:
            router.replace('/login');
        }
      }
    }
  }, [userData, loading, user, router]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center gap-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
        <p className="mt-4 text-muted-foreground">Redirecting to your dashboard...</p>
      </div>
    </div>
  );
}
