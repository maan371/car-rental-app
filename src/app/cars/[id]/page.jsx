import Link from "next/link";
import { notFound } from "next/navigation";
import CarDetailClient from "@/components/CarDetailClient";
import connectDB from "@/lib/mongodb";
import Car from "@/models/Car";

async function getCar(id) {
  try {
    await connectDB();
    return await Car.findById(id).lean();
  } catch (error) {
    return null;
  }
}

export default async function CarDetails({ params }) {
  const { id } = await params;

  const car = await getCar(id);

  if (!car) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white px-6 py-10">
      <div className="mx-auto max-w-7xl space-y-8">
        <section className="rounded-[2rem] bg-slate-900/95 p-8 shadow-2xl border border-white/10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-sky-300">Car details</p>
              <h1 className="mt-3 text-4xl font-bold">{car.name}</h1>
              <p className="mt-4 max-w-3xl text-slate-300">{car.description}</p>
            </div>
            <div className="rounded-3xl bg-slate-950/80 p-5 text-slate-100">
              <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Price per day</p>
              <p className="mt-2 text-4xl font-semibold">${car.pricePerDay}</p>
              <p className="mt-3 text-sm uppercase tracking-[0.2em] text-slate-400">{car.available ? "Available" : "Unavailable"}</p>
            </div>
          </div>
        </section>

        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <section className="rounded-[2rem] bg-slate-900/95 p-8 shadow-2xl border border-white/10">
            <div className="flex items-center justify-between gap-4 rounded-3xl bg-slate-950/80 p-5 text-slate-100">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Return to listings</p>
                <h2 className="mt-2 text-lg font-semibold">Browse more cars anytime</h2>
              </div>
              <Link href="/cars" className="rounded-full bg-sky-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-400">
                Back to cars
              </Link>
            </div>

            <div className="overflow-hidden rounded-[2rem] border border-white/10 shadow-xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={car.image} alt={car.name} className="h-96 w-full object-cover" />
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-3xl bg-slate-950/80 p-5">
                <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Brand</p>
                <p className="mt-3 text-xl font-semibold text-white">{car.brand}</p>
              </div>
              <div className="rounded-3xl bg-slate-950/80 p-5">
                <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Model</p>
                <p className="mt-3 text-xl font-semibold text-white">{car.model}</p>
              </div>
              <div className="rounded-3xl bg-slate-950/80 p-5">
                <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Year</p>
                <p className="mt-3 text-xl font-semibold text-white">{car.year}</p>
              </div>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl bg-slate-950/80 p-5">
                <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Type</p>
                <p className="mt-3 text-xl font-semibold text-white">{car.type}</p>
              </div>
              <div className="rounded-3xl bg-slate-950/80 p-5">
                <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Availability</p>
                <p className="mt-3 text-xl font-semibold text-white">{car.available ? "Available" : "Not available"}</p>
              </div>
            </div>
          </section>

          <section className="rounded-[2rem] bg-white p-8 shadow-2xl border border-slate-200 text-slate-950">
            <div className="flex items-center justify-between gap-4 rounded-3xl bg-slate-950/5 p-6">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Booking</p>
                <h2 className="mt-2 text-2xl font-bold">Confirm your rental</h2>
              </div>
              <span className={`rounded-full px-4 py-2 text-sm font-semibold ${car.available ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"}`}>
                {car.available ? "Available" : "Unavailable"}
              </span>
            </div>

            <div className="mt-8">
              <CarDetailClient car={car} />
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
