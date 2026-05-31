"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";

export default function AdminCars() {
  const router = useRouter();
  const [cars, setCars] = useState([]);
  const [form, setForm] = useState({
    name: "",
    brand: "",
    model: "",
    year: "",
    type: "",
    pricePerDay: "",
    image: "",
    description: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  const isAdmin = user?.role === "admin";

  const loadCars = async () => {
    try {
      const res = await api.get("/cars");
      setCars(res.data.cars || []);
    } catch (err) {
      setCars([]);
    }
  };

  useEffect(() => {
    const loadAuth = () => {
      const storedUser = typeof window !== "undefined" ? localStorage.getItem("user") : null;
      setUser(storedUser ? JSON.parse(storedUser) : null);
      setAuthLoading(false);
    };

    loadAuth();
  }, []);

  useEffect(() => {
    if (!authLoading && !isAdmin) {
      router.push("/login");
    }
  }, [authLoading, isAdmin, router]);

  useEffect(() => {
    const fetchCars = async () => {
      await loadCars();
    };

    fetchCars();
  }, []);

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    if (!isAdmin) {
      router.push("/login");
      return;
    }

    try {
      await api.post("/cars", {
        isAdmin: true,
        ...form,
        year: Number(form.year),
        pricePerDay: Number(form.pricePerDay),
      });
      setForm({
        name: "",
        brand: "",
        model: "",
        year: "",
        type: "",
        pricePerDay: "",
        image: "",
        description: "",
      });
      await loadCars();
    } catch (err) {
      setError(err.response?.data?.message || "Unable to add car.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!isAdmin) {
      router.push("/login");
      return;
    }

    if (!confirm("Delete this car?")) {
      return;
    }

    try {
      await api.delete(`/cars/${id}`, {
        data: {
          isAdmin: true,
        },
      });
      await loadCars();
    } catch (err) {
      setError(err.response?.data?.message || "Unable to delete car.");
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-slate-50 px-6 py-10">
        <div className="mx-auto max-w-6xl rounded-3xl bg-white p-10 shadow-xl border border-slate-200 text-center">
          <p className="text-lg font-semibold text-slate-900">Checking admin access...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-6xl space-y-10">
        <div className="rounded-3xl bg-white p-10 shadow-xl border border-slate-200">
          <h1 className="text-4xl font-bold text-slate-900">Admin Car Management</h1>
          <p className="mt-3 text-slate-600">Create, update, and remove cars that are available for rental.</p>
        </div>

        <div className="grid gap-8 xl:grid-cols-[1.4fr_1fr]">
          <section className="rounded-3xl bg-white p-8 shadow-xl border border-slate-200">
            <h2 className="text-2xl font-semibold text-slate-900">Add New Car</h2>
            <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Car Name"
                  className="w-full rounded-3xl border border-slate-200 bg-slate-50 p-4"
                />
                <input
                  name="brand"
                  value={form.brand}
                  onChange={handleChange}
                  placeholder="Brand"
                  className="w-full rounded-3xl border border-slate-200 bg-slate-50 p-4"
                />
                <input
                  name="model"
                  value={form.model}
                  onChange={handleChange}
                  placeholder="Model"
                  className="w-full rounded-3xl border border-slate-200 bg-slate-50 p-4"
                />
                <input
                  name="year"
                  value={form.year}
                  onChange={handleChange}
                  placeholder="Year"
                  type="number"
                  className="w-full rounded-3xl border border-slate-200 bg-slate-50 p-4"
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  name="type"
                  value={form.type}
                  onChange={handleChange}
                  placeholder="Type"
                  className="w-full rounded-3xl border border-slate-200 bg-slate-50 p-4"
                />
                <input
                  name="pricePerDay"
                  value={form.pricePerDay}
                  onChange={handleChange}
                  placeholder="Price per day"
                  type="number"
                  className="w-full rounded-3xl border border-slate-200 bg-slate-50 p-4"
                />
              </div>
              <input
                name="image"
                value={form.image}
                onChange={handleChange}
                placeholder="Image URL"
                className="w-full rounded-3xl border border-slate-200 bg-slate-50 p-4"
              />
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Description"
                rows="4"
                className="w-full rounded-3xl border border-slate-200 bg-slate-50 p-4"
              />
              {error ? <p className="text-sm text-red-600">{error}</p> : null}
              <button
                type="submit"
                disabled={loading}
                className="rounded-3xl bg-sky-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:bg-slate-400"
              >
                {loading ? "Saving..." : "Add Car"}
              </button>
            </form>
          </section>

          <section className="rounded-3xl bg-white p-8 shadow-xl border border-slate-200">
            <h2 className="text-2xl font-semibold text-slate-900">Existing Cars</h2>
            <div className="mt-6 space-y-4">
              {cars.length === 0 ? (
                <p className="text-slate-600">No cars available yet.</p>
              ) : (
                cars.map((carItem) => (
                  <div key={carItem._id} className="rounded-3xl bg-slate-50 p-4">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="font-semibold text-slate-900">{carItem.name}</p>
                        <p className="text-sm text-slate-500">{carItem.brand} • {carItem.model} • ${carItem.pricePerDay}/day</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleDelete(carItem._id)}
                        className="rounded-full border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-100"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
