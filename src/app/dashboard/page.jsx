"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
const router = useRouter();
const [user, setUser] = useState(null);

useEffect(() => {
const storedUser = localStorage.getItem("user");

if (!storedUser) {
  router.push("/login");
  return;
}

const parsedUser = JSON.parse(storedUser);

if (parsedUser.role !== "admin") {
  router.push("/");
  return;
}

setUser(parsedUser);


}, [router]);

return ( <main className="min-h-screen bg-slate-950 px-6 py-10 text-white"> <div className="mx-auto max-w-7xl">

    <section className="rounded-[2rem] border border-white/10 bg-slate-900/95 p-10 shadow-2xl">
      <p className="text-sm uppercase tracking-[0.3em] text-sky-400">
        Administrator
      </p>

      <h1 className="mt-4 text-5xl font-bold">
        Admin Dashboard
      </h1>

      <p className="mt-4 text-slate-300">
        Welcome back, {user?.name}
      </p>
    </section>

    <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">

      <div className="rounded-[2rem] bg-white p-8 text-slate-950 shadow-xl">
        <h3 className="text-lg font-bold">Manage Cars</h3>
        <button
          onClick={() => router.push("/admin/cars")}
          className="mt-4 rounded-full bg-sky-500 px-5 py-2 font-semibold text-white"
        >
          Open
        </button>
      </div>

      <div className="rounded-[2rem] bg-white p-8 text-slate-950 shadow-xl">
        <h3 className="text-lg font-bold">Bookings</h3>
        <p className="mt-3 text-slate-600">
          Monitor customer reservations
        </p>
      </div>

      <div className="rounded-[2rem] bg-white p-8 text-slate-950 shadow-xl">
        <h3 className="text-lg font-bold">Reviews</h3>
        <p className="mt-3 text-slate-600">
          Monitor customer feedback
        </p>
      </div>

      <div className="rounded-[2rem] bg-white p-8 text-slate-950 shadow-xl">
        <h3 className="text-lg font-bold">Contact Messages</h3>
        <p className="mt-3 text-slate-600">
          View customer inquiries
        </p>
      </div>

    </div>
  </div>
</main>

);
}
