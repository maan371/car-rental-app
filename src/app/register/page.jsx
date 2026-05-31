"use client";

import Link from "next/link";
import { useState } from "react";
import api from "@/lib/api";
import { useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [phone, setPhone] = useState("");

  const handleRegister = async (e) => {
    if (!/^(\+92|92)\d{10}$/.test(phone)) {
  alert("Please enter a valid phone number with country code. Example: +923001234567");
  return;
}
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsSubmitting(true);

    try {
      await api.post("/auth/register", {
  name,
  email,
  phone,
  password,
});

      setSuccess("Registration successful! Redirecting to login...");
      setTimeout(() => router.push("/login"), 700);
    } catch (err) {
      setError(err.response?.data?.message || "Unable to register. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
  className="min-h-screen flex items-center justify-center px-4 py-10 bg-cover bg-center bg-no-repeat"
  style={{
    backgroundImage: "url('/images/bg1.jpg')",
  }}
>
      <div className="grid w-full max-w-5xl gap-8 lg:grid-cols-[0.9fr_1.1fr] rounded-[2rem] bg-gradient-to-br from-slate-900/90 to-slate-700/90 backdrop-blur-md p-8 shadow-2xl">
        <div className="space-y-6">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">Join the fleet</p>
          <h1 className="text-4xl font-bold text-gray-400">Create your rental account</h1>
          <p className="text-slate-300">Sign up to browse cars, save bookings, and manage trips from your dashboard.</p>
          <div className="rounded-3xl bg-slate-950/80 p-6 shadow-inner border border-slate-800">
            <p className="text-sm uppercase tracking-[0.2em] text-cyan-400">Have an account?</p>
            <Link href="/login" className="mt-3 inline-flex rounded-full bg-white px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-200">
              Log in instead
            </Link>
          </div>
        </div>

        <form onSubmit={handleRegister} className="rounded-[2rem] bg-white p-8 shadow-2xl text-slate-900">
          <h2 className="text-3xl font-bold">Register</h2>
          <p className="mt-2 text-sm text-slate-500">Enter your details to get started with a modern car rental experience.</p>

          <div className="mt-8 space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-700">Name</label>
              <input
                value={name}
                className="mt-2 w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
                placeholder="Your full name"
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Email</label>
              <input
                value={email}
                className="mt-2 w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
                placeholder="you@example.com"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
  <label className="block text-sm font-medium text-slate-700">
    Phone Number
  </label>

  <input
    value={phone}
    className="mt-2 w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
    placeholder="+923001234567"
    type="tel"
    onChange={(e) => setPhone(e.target.value)}
    required
  />
</div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Password</label>
              <input
                value={password}
                className="mt-2 w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
                placeholder="Create a strong password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          {error ? <p className="mt-4 text-sm text-red-600">{error}</p> : null}
          {success ? <p className="mt-4 text-sm text-emerald-600">{success}</p> : null}

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-8 w-full rounded-3xl bg-slate-900 px-6 py-3 text-sm font-semibold uppercase tracking-[0.15em] text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-500"
          >
            {isSubmitting ? "Creating account..." : "Create account"}
          </button>
        </form>
      </div>
    </div>
  );
}
