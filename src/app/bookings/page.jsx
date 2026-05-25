"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";

export default function Bookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    const res = await api.get("/bookings");
    setBookings(res.data.bookings);
  };

  const token = localStorage.getItem("token");

if (!token) {
  router.push("/login");
  return;
}

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-5">
        My Bookings
      </h1>

      <div className="space-y-4">
        {bookings.map((b) => (
          <div
            key={b._id}
            className="border p-4 rounded shadow"
          >
            <h2 className="font-bold">
              {b.carId?.name}
            </h2>

            <p>Start: {b.startDate}</p>
            <p>End: {b.endDate}</p>
            <p className="text-green-600">
              Total: ${b.totalPrice}
            </p>

            <p>Status: {b.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
}