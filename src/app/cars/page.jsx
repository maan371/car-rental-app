"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import api from "@/lib/api";

export default function Cars() {
const [cars, setCars] = useState([]);

useEffect(() => {
api.get("/cars").then((res) => {
setCars(res.data.cars || []);
});
}, []);

return ( <main className="min-h-screen bg-slate-950 text-white px-6 py-10"> <div className="mx-auto max-w-7xl"> <section className="mb-12 overflow-hidden rounded-[2rem] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 p-10 shadow-2xl border border-white/10"> <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr]"> <div> <p className="text-sm uppercase tracking-[0.35em] text-sky-400">
Premium Fleet </p>

```
          <h1 className="mt-5 text-5xl font-bold leading-tight text-white">
            Find The Perfect Car
            <span className="block text-sky-400">
              For Your Journey
            </span>
          </h1>

          <p className="mt-6 max-w-3xl text-lg text-slate-300">
            Browse luxury sedans, SUVs, sports cars, and premium vehicles.
            Choose your ideal ride and book instantly with our modern
            rental platform.
          </p>
        </div>

        <div className="flex items-center justify-center">
          <div className="rounded-[2rem] bg-slate-950/60 p-8 border border-slate-700 shadow-xl backdrop-blur">
            <p className="text-sm uppercase tracking-[0.2em] text-sky-400">
              Total Cars
            </p>

            <h2 className="mt-3 text-5xl font-bold text-white">
              {cars.length}
            </h2>

            <p className="mt-3 text-slate-400">
              Vehicles ready for booking
            </p>
          </div>
        </div>
      </div>
    </section>

    <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
      {cars.map((car) => (
        <div
          key={car._id}
          className="group overflow-hidden rounded-[2rem] border border-slate-700 bg-slate-900 shadow-2xl transition duration-300 hover:-translate-y-2"
        >
          <div className="relative h-72 overflow-hidden">
            <img
              src={car.image}
              alt={car.name}
              className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

            <span className="absolute left-4 top-4 rounded-full bg-emerald-500 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white">
              View Availability
            </span>
          </div>

          <div className="p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-white">
                  {car.name}
                </h2>

                <p className="mt-2 text-sm uppercase tracking-[0.2em] text-sky-400">
                  {car.brand} • {car.type}
                </p>
              </div>
            </div>

            <p className="mt-5 line-clamp-3 text-slate-300">
              {car.description}
            </p>

            <div className="mt-6 rounded-3xl bg-slate-800 p-4 border border-slate-700">
              <p className="text-sm text-slate-400">
                Rental Price
              </p>

              <p className="mt-1 text-3xl font-bold text-white">
                ${car.pricePerDay}
                <span className="text-base font-medium text-slate-400">
                  /day
                </span>
              </p>
            </div>

            <div className="mt-6">
              <Link
                href={`/cars/${car._id}`}
                className="block w-full rounded-full bg-sky-500 px-5 py-3 text-center text-sm font-semibold text-slate-950 transition hover:bg-sky-400"
              >
                View Details
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</main>
);
}
