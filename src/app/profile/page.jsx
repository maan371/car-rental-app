"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";

export default function Profile() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const stored = localStorage.getItem("user");
      if (!stored) {
        router.push("/login");
        return;
      }

      const parsed = JSON.parse(stored);
      setUser(parsed);

      try {
        const res = await api.get(`/bookings?userId=${parsed.id}`);
        setBookings(res.data.bookings || []);
      } catch {
        setBookings([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white px-6 py-10">
        <div className="rounded-3xl bg-slate-900/95 px-8 py-10 text-center shadow-2xl">
          <p className="text-lg font-semibold">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <main
  className="min-h-screen text-white px-6 py-10 bg-cover bg-center bg-no-repeat"
  style={{
    backgroundImage: "url('/images/bg4.jpg')",
  }}
> <div className="mx-auto max-w-6xl space-y-8">
        <section className="rounded-[2rem] bg-slate-900/95 p-10 shadow-2xl border border-white/10">
          <p className="text-sm uppercase tracking-[0.3em] text-sky-300">Account</p>
          <h1 className="mt-4 text-4xl font-bold">My profile</h1>
          <p className="mt-4 max-w-2xl text-slate-300">Manage your account and keep track of your current and future rentals.</p>
        </section>

        <section className="relative overflow-hidden rounded-[2rem] shadow-2xl border border-white/20">
  <div
    className="absolute inset-0 bg-cover bg-center opacity-100"
    style={{
      backgroundImage: "url('/images/bg3.jpg')",
    }}
  />

  <div className="relative bg-white/40 backdrop-sm p-10 text-slate-950">
          <div className="grid gap-6 sm:grid-cols-3">
            <div className="rounded-3xl bg-slate-50 p-6">
              <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Name</p>
              <p className="mt-2 text-xl font-semibold text-slate-900">{user.name}</p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-6">
              <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Email</p>
              <p className="mt-2 text-xl font-semibold text-slate-900">{user.email}</p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-6">
              <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Role</p>
              <p className="mt-2 text-xl font-semibold text-slate-900 capitalize">{user.role}</p>
            </div>
          </div>
          </div>
        </section>

        <section className="relative overflow-hidden rounded-[2rem] shadow-2xl border border-white/20">
  <div
    className="absolute inset-0 bg-cover bg-center opacity-100"
    style={{
      backgroundImage: "url('/images/bg3.jpg')",
    }}
  />

  <div className="relative bg-white/40 backdrop-sm p-10 text-slate-950">
          <h2 className="text-3xl font-semibold">Recent bookings</h2>
          {bookings.length === 0 ? (
            <p className="mt-4 text-slate-600">No bookings yet. Head over to the fleet to reserve your first car.</p>
          ) : (
            <div className="mt-6 space-y-4">
              {bookings.map((booking) => (
                <div key={booking._id} className="rounded-3xl bg-slate-50 p-6">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-lg font-semibold text-slate-900">{booking.carId?.name || "Unknown vehicle"}</p>
                      <p className="text-sm text-slate-500">{new Date(booking.startDate).toLocaleDateString()} - {new Date(booking.endDate).toLocaleDateString()}</p>
                    </div>
                    <p className="text-sm font-semibold text-slate-700">${booking.totalPrice}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
          </div> 
        </section>
      </div>
    </main>
  );
}
