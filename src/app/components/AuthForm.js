"use client";

import Link from "next/link";
import { signInWithGoogle } from "@/lib/auth";
import { useRouter } from "next/navigation";

export default function AuthForm({ 
  type, 
  email, 
  setEmail, 
  password, 
  setPassword, 
  error, 
  onSubmit 
}) {
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      // Immediate redirect after successful Google sign-in
      router.push("/dashboard");
      router.refresh(); // Ensure the page updates with the new auth state
    } catch (err) {
      console.error("Google sign in error:", err);
      // Display error to user
      setError(err.message || "Failed to sign in with Google");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">
        {type === "login" ? "Login" : "Sign Up"}
      </h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      
      {/* Google Sign In Button - Updated with better loading state */}
      <button
        onClick={handleGoogleSignIn}
        className="w-full mb-4 flex items-center justify-center gap-2 bg-red-600 text-white p-2 rounded hover:bg-red-700 transition-colors"
        disabled={!!error}
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.545 10.239v3.821h5.445c-0.712 2.315-2.647 3.972-5.445 3.972-3.332 0-6.033-2.701-6.033-6.032s2.701-6.032 6.033-6.032c1.498 0 2.866 0.549 3.921 1.453l2.814-2.814c-1.784-1.664-4.153-2.675-6.735-2.675-5.522 0-10 4.477-10 10s4.478 10 10 10c8.396 0 10-7.496 10-10 0-0.671-0.068-1.325-0.182-1.977h-9.818z"/>
        </svg>
        {type === "login" ? "Login with Google" : "Sign up with Google"}
      </button>
      
      <div className="relative mb-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">Or continue with email</span>
        </div>
      </div>
      
      <form onSubmit={onSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 mb-2" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition-colors"
        >
          {type === "login" ? "Login" : "Sign Up"}
        </button>
      </form>
      <p className="mt-4 text-center">
        {type === "login" ? (
          <>
            Don't have an account?{" "}
            <Link href="/signup" className="text-blue-600 hover:underline">
              Sign up
            </Link>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <Link href="/login" className="text-blue-600 hover:underline">
              Login
            </Link>
          </>
        )}
      </p>
    </div>
  );
}