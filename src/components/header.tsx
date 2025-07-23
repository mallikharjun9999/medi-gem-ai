
'use client';

import { Home, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';

export function Header() {
  const { logout, userData } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push('/');
  }

  const handleHomeClickAndLogout = async () => {
    await logout();
    router.push('/');
  }

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <SidebarTrigger className="md:hidden" />
      
      <div className="ml-auto flex items-center gap-2">
        <Button variant="outline" size="icon" className="h-8 w-8" onClick={handleHomeClickAndLogout}>
          <Home className="h-4 w-4" />
          <span className="sr-only">Home</span>
        </Button>
        <Button variant="outline" size="icon" className="h-8 w-8" onClick={handleLogout}>
          <LogOut className="h-4 w-4" />
          <span className="sr-only">Logout</span>
        </Button>
      </div>
    </header>
  );
}
