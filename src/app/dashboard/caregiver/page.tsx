
'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { useEffect } from 'react';

export default function CaregiverDashboard() {
  const { user, userData, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || userData?.role !== 'caregiver')) {
      router.replace('/login');
    }
  }, [user, userData, loading, router]);

  if (loading || !userData) {
    return <div>Loading...</div>;
  }
  
  return (
    <div>
      <h1>Caregiver Dashboard</h1>
      <p>Welcome, {userData.name}</p>
    </div>
  );
}
