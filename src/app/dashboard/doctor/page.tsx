
'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { useEffect } from 'react';

export default function DoctorDashboard() {
  const { user, userData, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || userData?.role !== 'doctor')) {
      router.replace('/login');
    }
  }, [user, userData, loading, router]);
  
  if (loading || !userData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Doctor Dashboard</h1>
      <p>Welcome, Dr. {userData.name}</p>
    </div>
  );
}
