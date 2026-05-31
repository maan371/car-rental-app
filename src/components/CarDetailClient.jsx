"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import api from "@/lib/api";

export default function CarDetailClient({ car }) {
  const router = useRouter();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [isBooking, setIsBooking] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const user = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("user") || "null") : null;
  const isLoggedIn = Boolean(user?.id);
  const [bookedDates, setBookedDates] = useState([]);

  useEffect(() => {
  const fetchBookings = async () => {
    try {
      const res = await api.get(
        `/bookings/car/${car._id}`
      );

      setBookedDates(res.data.bookings || []);
    } catch (error) {
      console.log(error);
    }
  };

  fetchBookings();
}, [car._id]);

const excludedDates = [];

bookedDates.forEach((booking) => {
  const start = new Date(booking.startDate);
  const end = new Date(booking.endDate);

  const current = new Date(start);

  while (current <= end) {
    excludedDates.push(new Date(current));
    current.setDate(current.getDate() + 1);
  }
});

  const handleBooking = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (!isLoggedIn) {
      router.push("/login");
      return;
    }


    if (endDate < startDate) {
      setError("End date must be after start date.");
      return;
    }

    const days = Math.max(
      1,
      Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24))
    );
    const totalPrice = days * car.pricePerDay;

    setIsBooking(true);

    try {
      await api.post(
        "/bookings",
        {
          userId: user.id,
          carId: car._id,
          startDate,
          endDate,
          totalPrice,
        }
      );

      setSuccess("Booking confirmed! Check your email for details.");
      setTimeout(() => {
        router.push("/bookings");
      }, 900);
    } catch (error) {
      setError(error.response?.data?.message || "Unable to complete booking. Please try again.");
    } finally {
      setIsBooking(false);
    }
  };

  return (
    <form onSubmit={handleBooking} className="space-y-6">
      <div className="rounded-[2rem] bg-slate-950/90 p-6 text-white shadow-lg border border-white/10">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-sky-300">Booking form</p>
            <h3 className="mt-3 text-2xl font-bold">Schedule your rental</h3>
          </div>
          <span className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">
  Available For Booking
</span>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-slate-300">Start Date</label>
            <DatePicker
  selected={startDate}
  onChange={setStartDate}
  excludeDates={excludedDates}
  minDate={new Date()}
/>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300">End Date</label>
            <DatePicker
  selected={endDate}
  onChange={setEndDate}
  excludeDates={excludedDates}
  minDate={startDate}
/>
          </div>
        </div>

        <div className="mt-6 rounded-3xl bg-slate-900/80 p-5">
          <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Estimated total</p>
          <p className="mt-3 text-3xl font-bold text-white">${Math.max(1, Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24))) * car.pricePerDay}</p>
        </div>
      </div>

      {error ? <p className="text-sm text-rose-400">{error}</p> : null}
      {success ? <p className="text-sm text-emerald-400">{success}</p> : null}

      <div className="mt-4 rounded-3xl bg-amber-50 p-4">
  <p className="text-sm text-amber-700">
    Unavailable dates are automatically blocked.
  </p>
</div>
      <button
  type="submit"
  disabled={isBooking}
  className="w-full rounded-3xl bg-sky-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:bg-slate-500"
>
        {isBooking ? "Booking..." : isLoggedIn ? "Confirm booking" : "Login to book"}
      </button>
    </form>
  );
}
