"use client";

import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import api from "@/lib/api";

export default function BookingModal({ car, onClose }) {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const handleBooking = async () => {
    const token = localStorage.getItem("token");

    const days =
      Math.ceil(
        (endDate - startDate) / (1000 * 60 * 60 * 24)
      ) || 1;

    const totalPrice = days * car.pricePerDay;

    try {
      await api.post(
        "/bookings",
        {
          carId: car._id,
          startDate,
          endDate,
          totalPrice,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Booking Successful!");
      onClose();
    } catch (error) {
      alert("Booking Failed");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl w-96">
        <h2 className="text-xl font-bold mb-4">
          Book {car.name}
        </h2>

        <p>Start Date</p>
        <DatePicker
          selected={startDate}
          onChange={setStartDate}
          className="border p-2 w-full"
        />

        <p className="mt-3">End Date</p>
        <DatePicker
          selected={endDate}
          onChange={setEndDate}
          className="border p-2 w-full"
        />

        <button
          onClick={handleBooking}
          className="bg-blue-600 text-white px-4 py-2 mt-4 rounded"
        >
          Confirm Booking
        </button>
      </div>
    </div>
  );
}