"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";

export default function Bookings() {
const router = useRouter();
const [bookings, setBookings] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
const fetchBookings = async () => {
const storedUser = localStorage.getItem("user");
const user = storedUser ? JSON.parse(storedUser) : null;

  if (!user) {
    router.push("/login");
    return;
  }

  try {
    const res = await api.get(`/bookings?userId=${user.id}`);
    setBookings(res.data.bookings || []);
  } catch {
    setBookings([]);
  } finally {
    setLoading(false);
  }
};

fetchBookings();

}, [router]);

const handleCancel = async (bookingId) => {
const confirmed = window.confirm(
"Are you sure you want to cancel this booking?"
);

if (!confirmed) return;

try {
  await api.delete(`/bookings?id=${bookingId}`);

  setBookings(
    bookings.filter(
      (booking) => booking._id !== bookingId
    )
  );

  alert("Booking cancelled successfully.");
} catch (error) {
  console.log(error);
  alert("Unable to cancel booking.");
}

};

return ( <main className="min-h-screen bg-slate-950 text-white px-6 py-10"> <div className="mx-auto max-w-6xl space-y-8">

    <section className="rounded-[2rem] bg-slate-900/95 p-10 shadow-2xl border border-white/10">
      <p className="text-sm uppercase tracking-[0.3em] text-sky-300">
        My Trips
      </p>

      <h1 className="mt-4 text-4xl font-bold">
        Your Bookings
      </h1>

      <p className="mt-4 max-w-2xl text-slate-300">
        Review confirmed rentals, trip dates, and total costs from your account.
      </p>
    </section>

    {loading ? (
      <section className="rounded-[2rem] bg-white p-10 text-center text-slate-900">
        Loading bookings...
      </section>
    ) : bookings.length === 0 ? (
      <section className="rounded-[2rem] bg-white p-10 shadow-2xl border border-slate-200 text-slate-950">
        <p className="text-lg font-semibold">
          No bookings yet
        </p>

        <p className="mt-3 text-slate-600">
          Browse cars and make your first reservation to see it here.
        </p>
      </section>
    ) : (
      <div className="grid gap-6">
        {bookings.map((booking) => (
  <section
    key={booking._id}
    className="relative overflow-hidden rounded-[2rem] border border-slate-200 shadow-2xl"
  >
    <div
      className="absolute inset-0 bg-cover bg-center opacity-100"
      style={{
        backgroundImage: "url('/images/bg3.jpg')",
      }}
    />

    <div className="relative bg-white/80 backdrop-sm p-8 text-slate-950">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
            {booking.carId?.type || "Car"}
          </p>

          <h2 className="mt-2 text-2xl font-semibold">
            {booking.carId?.name || "Unknown Vehicle"}
          </h2>
        </div>

        <span className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">
          {booking.status}
        </span>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-slate-500">
            Start
          </p>

          <p className="mt-2 text-slate-900">
            {new Date(booking.startDate).toLocaleDateString()}
          </p>
        </div>

        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-slate-500">
            End
          </p>

          <p className="mt-2 text-slate-900">
            {new Date(booking.endDate).toLocaleDateString()}
          </p>
        </div>

        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-slate-500">
            Total
          </p>

          <p className="mt-2 text-slate-900">
            ${booking.totalPrice}
          </p>
        </div>
      </div>

      <button
        onClick={() => handleCancel(booking._id)}
        className="mt-6 rounded-full bg-red-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-red-700"
      >
        Cancel Booking
      </button>
    </div>
  </section>
))}
      </div>
    )}
  </div>
</main>

);
}
