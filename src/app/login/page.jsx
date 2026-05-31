"use client";

import Link from "next/link";
import { useState } from "react";
import api from "@/lib/api";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsSubmitting(true);

    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });
      
      localStorage.setItem("user", JSON.stringify(res.data.user));

      setSuccess("Login successful! Redirecting...");
      setTimeout(() => router.push("/cars"), 700);
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    
    <div
  className="min-h-screen flex items-center justify-center px-4 py-10 bg-cover bg-center bg-no-repeat"
  style={{
    backgroundImage: "url('/images/bg2.jpg')",
  }}
>
      <div className="grid w-full max-w-5xl gap-8 lg:grid-cols-[1.2fr_0.8fr] rounded-[2rem] bg-gradient-to-br from-slate-900 to-slate-700 p-8 shadow-2xl">
        <div className="space-y-6">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-sky-400">Welcome back</p>
            <h1 className="mt-4 text-4xl font-bold text-white">Sign in to your account</h1>
            <p className="mt-3 text-slate-300">Access your bookings, manage rentals, and explore premium cars.</p>
          </div>

          <div className="grid gap-4 rounded-3xl bg-slate-950/80 p-6 shadow-inner border border-slate-800">
            <div className="rounded-3xl bg-slate-900 p-4">
              <p className="text-sm uppercase tracking-[0.2em] text-sky-400">New here?</p>
              <p className="mt-2 text-slate-300 ">Create your account and start booking cars instantly.</p>
            </div>
            <Link href="/register" className="inline-flex items-center justify-center rounded-full bg-sky-500 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-sky-400">
              Create account
            </Link>
          </div>
        </div>

        <form onSubmit={handleLogin} className="rounded-[2rem] bg-white p-8 shadow-2xl text-slate-900">
          <h2 className="text-3xl font-bold">Log in</h2>
          <p className="mt-2 text-sm text-slate-500">Use your email and password to enter the app.</p>

          <div className="mt-8 space-y-4">
            <label className="block text-sm font-medium text-slate-700">Email</label>
            <input
              value={email}
              className="w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
              placeholder="you@example.com"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mt-4 space-y-4">
            <label className="block text-sm font-medium text-slate-700">Password</label>
            <input
              value={password}
              className="w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
              placeholder="Enter your password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error ? <p className="mt-4 text-sm text-red-600">{error}</p> : null}
          {success ? <p className="mt-4 text-sm text-emerald-600">{success}</p> : null}

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-8 w-full rounded-3xl bg-slate-900 px-6 py-3 text-sm font-semibold uppercase tracking-[0.15em] text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-500"
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
