"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [showPopup, setShowPopup] = useState(false);

  const handleBrowseCars = () => {
    const user = localStorage.getItem("user");

    if (!user) {
      setShowPopup(true);
      return;
    }

    router.push("/cars");
  };

  return (
    <main
  className="min-h-screen bg-cover bg-center bg-no-repeat text-white"
  style={{
    backgroundImage: "url('/images/bg.jpg')",
  }}
>
      <div className="min-h-screen bg-black/65">
  <div className="mx-auto flex min-h-screen max-w-7xl flex-col justify-center gap-10 px-6 py-16">
        <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[2rem] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 p-12 shadow-2xl border border-white/10">
            <span className="inline-flex rounded-full bg-sky-400/20 px-4 py-2 text-sm uppercase tracking-[0.3em] text-sky-200">
              Car rental
            </span>

            <h1 className="mt-8 text-5xl font-bold leading-tight tracking-tight text-white sm:text-6xl">
              Drive the ride you want with a modern booking experience.
            </h1>

            <p className="mt-6 max-w-3xl text-slate-300">
              Browse premium cars, reserve your dates, and manage trips from a beautifully designed rental app.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <button
                onClick={handleBrowseCars}
                className="inline-flex items-center justify-center rounded-full bg-sky-500 px-8 py-4 text-base font-semibold text-slate-950 transition hover:bg-sky-400"
              >
                Browse Cars
              </button>

              <Link
                href="/register"
                className="inline-flex items-center justify-center rounded-full border border-slate-200/30 px-8 py-4 text-base font-semibold text-white transition hover:bg-white/10"
              >
                Create Account
              </Link>
            </div>
          </div>

          <div className="rounded-[2rem] bg-white p-10 shadow-2xl border border-slate-800 text-slate-950">
            <h2 className="text-3xl font-bold">
              Everything you need to rent.
            </h2>

            <p className="mt-4 text-slate-600">
              A friendly interface for customers and an admin dashboard for managing cars and bookings.
            </p>

            <div className="mt-10 grid gap-4">
              <div className="rounded-3xl bg-slate-950/5 p-6">
                <p className="font-semibold text-slate-900">
                  Fast browsing
                </p>
                <p className="mt-2 text-slate-600">
                  See available cars with details, prices, and booking status at a glance.
                </p>
              </div>

              <div className="rounded-3xl bg-slate-950/5 p-6">
                <p className="font-semibold text-slate-900">
                  One-click booking
                </p>
                <p className="mt-2 text-slate-600">
                  Pick your car, choose dates, and confirm with a login-protected booking flow.
                </p>
              </div>

              <div className="rounded-3xl bg-slate-950/5 p-6">
                <p className="font-semibold text-slate-900">
                  Email confirmation
                </p>
                <p className="mt-2 text-slate-600">
                  Booked rentals can trigger confirmation emails when SMTP is configured.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
      </div> 

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 px-4">
          <div className="w-full max-w-md rounded-[2rem] bg-white p-8 text-slate-900 shadow-2xl">
            <h2 className="text-2xl font-bold">
              Login Required
            </h2>

            <p className="mt-3 text-slate-600">
              Please login or create an account before browsing and booking cars.
            </p>

            <div className="mt-6 flex flex-col gap-3">
              <button
                onClick={() => router.push("/login")}
                className="rounded-full bg-sky-600 px-5 py-3 font-semibold text-white transition hover:bg-sky-700"
              >
                Login
              </button>

              <button
                onClick={() => router.push("/register")}
                className="rounded-full border border-slate-300 px-5 py-3 font-semibold transition hover:bg-slate-100"
              >
                Register
              </button>

              <button
                onClick={() => setShowPopup(false)}
                className="rounded-full bg-slate-200 px-5 py-3 font-semibold transition hover:bg-slate-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}