
'use client';

import { createContext, useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { Skeleton } from '@/components/ui/skeleton';

interface AuthContextType {
  user: User | null;
  userData: UserData | null;
  loading: boolean;
  login: (email: string, pass: string) => Promise<any>;
  signup: (email: string, pass: string, name: string, role: string) => Promise<any>;
  logout: () => Promise<any>;
}

interface UserData {
  uid: string;
  role: 'patient' | 'caregiver' | 'doctor';
  name: string;
  email: string;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          setUserData(userDoc.data() as UserData);
        }
      } else {
        setUserData(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = (email: string, pass: string) => {
    const { signInWithEmailAndPassword } = require('firebase/auth');
    return signInWithEmailAndPassword(auth, email, pass);
  };
  
  const signup = async (email: string, pass: string, name: string, role: string) => {
    const { createUserWithEmailAndPassword } = require('firebase/auth');
    const { setDoc } = require('firebase/firestore');
    const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
    const user = userCredential.user;
    await setDoc(doc(db, 'users', user.uid), {
      uid: user.uid,
      name,
      email,
      role,
    });
  };

  const logout = () => {
    const { signOut } = require('firebase/auth');
    return signOut(auth);
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
          <div className="flex flex-col items-center gap-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
              </div>
          </div>
      </div>
    );
  }


  return (
    <AuthContext.Provider value={{ user, userData, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
