
'use client';

import Link from 'next/link';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/icons';
import { useRouter } from 'next/navigation';

export function MainNav() {
  const { user, logout, loading } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="flex items-center space-x-2">
            <Logo className="size-8" />
            <span className="font-bold sm:inline-block">
              MediGem
            </span>
          </Link>
        </div>
        <nav className="flex flex-1 items-center justify-end space-x-2">
            <Button variant="ghost" asChild>
                <Link href="/" prefetch={false}>Home</Link>
            </Button>
          {loading ? null : user ? (
            <Button onClick={handleLogout}>Logout</Button>
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild>
                <Link href="/signup">Sign Up</Link>
              </Button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
