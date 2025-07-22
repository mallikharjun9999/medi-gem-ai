
'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { useEffect } from 'react';

export default function DashboardRedirector() {
  const { userData, loading, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) {
      return; // Wait for loading to complete
    }

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
        case 'admin':
          router.replace('/dashboard/admin');
          break;
        default:
          // If role is unknown, maybe logout or redirect to a generic error page
          router.replace('/login');
      }
    }
    // If there's a user but no userData yet, the context is still loading it.
    // The effect will re-run once userData is available.
    // Adding a timeout can help prevent infinite loops on strange edge cases.
    else {
        const timer = setTimeout(() => {
            if(!userData) {
                router.replace('/login');
            }
        }, 5000); // 5 second timeout
        return () => clearTimeout(timer);
    }

  }, [userData, loading, user, router]);

  // Render nothing, or a minimal loader, as the user will be redirected.
  // The global loader in AuthProvider covers the initial loading state.
  return null;
}
