"use client";

import Link from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { logOut } from "@/lib/auth";

export default function Navbar() {
  const [user] = useAuthState(auth);

  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">NextFire Auth</Link>
        <div className="flex gap-4">
          {user ? (
            <>
              <Link href="/dashboard">Dashboard</Link>
              <button onClick={logOut} className="hover:underline">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/auth/login">Login</Link>
              <Link href="/auth/signup">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}