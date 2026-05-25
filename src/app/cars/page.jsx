"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";

export default function Cars() {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    const res = await api.get("/cars");
    setCars(res.data.cars);
  };

  const handleBookCar = async (carId) => {
  const token = localStorage.getItem("token");

  if (!token) {
    alert("Please login first");
    return;
  }

  try {
    await api.post(
      "/bookings",
      {
        carId,
        startDate: "2026-05-25",
        endDate: "2026-05-28",
        totalPrice: 200,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("Car booked successfully!");
  } catch (err) {
    alert(err.response?.data?.message || "Booking failed");
  }
};

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-5">Available Cars</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
  {cars.map((car) => (
    <div
      key={car._id}
      className="bg-white rounded-xl shadow-lg overflow-hidden hover:scale-105 transition"
    >
      <img
        src={car.image}
        className="h-48 w-full object-cover"
      />

      <div className="p-4">
        <h2 className="text-xl font-bold">{car.name}</h2>
        <p className="text-gray-500">{car.brand}</p>

        <p className="text-green-600 font-bold mt-2">
          ${car.pricePerDay} / day
        </p>

        <button
          onClick={() => handleBookCar(car._id)}
          className="mt-3 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          Book Now
        </button>
      </div>
    </div>
  ))}
</div>
    </div>
  );
}