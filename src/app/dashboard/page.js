"use client";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Welcome to your Dashboard</h1>
      <div className="mb-4">
        <p>Logged in as: {user.email}</p>
        {user.photoURL && (
          <img 
            src={user.photoURL} 
            alt="Profile" 
            className="w-16 h-16 rounded-full mt-2"
          />
        )}
      </div>
      <p className="text-sm text-gray-500">
        Provider: {user.providerData?.[0]?.providerId}
      </p>
    </div>
  );
}