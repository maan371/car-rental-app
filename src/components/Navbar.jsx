"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar() {
const router = useRouter();
const pathname = usePathname();
const [user, setUser] = useState(null);

useEffect(() => {
const storedUser = localStorage.getItem("user");
setUser(storedUser ? JSON.parse(storedUser) : null);
}, [pathname]);

const logout = () => {
localStorage.removeItem("user");
setUser(null);
router.push("/login");
};

return ( <nav className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/95 backdrop-blur-md"> <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-8 py-6"> <div className="flex items-center gap-4">
<div
  onClick={() => router.push("/")}
  className="flex cursor-pointer items-center gap-3"
>
  <img
    src="/images/logo.jpg"
    alt="Logo"
    className="h-14 w-14 rounded-full object-cover border border-white/20"
  />

  <h1 className="text-4xl font-extrabold tracking-wide text-white transition hover:text-sky-400">
    Car Rental
  </h1>
</div>

      {user ? (
        <span className="rounded-full border border-sky-500/30 bg-sky-500/10 px-4 py-2 text-sm text-sky-300">
          Welcome, {user.name}
        </span>
      ) : null}
    </div>

    <div className="flex flex-wrap items-center gap-3">

      <button
        onClick={() => router.push("/")}
        className="rounded-full px-5 py-3 text-base font-semibold text-slate-200 transition hover:bg-slate-800 hover:text-white"
      >
        Home
      </button>

      <button
        onClick={() => router.push("/cars")}
        className="rounded-full px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-slate-800 hover:text-white"
      >
        Cars
      </button>

      <button
        onClick={() => router.push("/bookings")}
        className="rounded-full px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-slate-800 hover:text-white"
      >
        Bookings
      </button>

      <button
        onClick={() => router.push("/reviews")}
        className="rounded-full px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-slate-800 hover:text-white"
      >
        Reviews
      </button>

      <button
        onClick={() => router.push("/contact")}
        className="rounded-full px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-slate-800 hover:text-white"
      >
        Contact Us
      </button>

      {user ? (
        <>
          {user?.role === "admin" ? (
            <>
              <button
                onClick={() => router.push("/dashboard")}
                className="rounded-full border border-slate-700 bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:border-sky-500 hover:bg-slate-800"
              >
                Dashboard
              </button>

              <button
                onClick={() => router.push("/admin/cars")}
                className="rounded-full border border-slate-700 bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:border-sky-500 hover:bg-slate-800"
              >
                Manage Cars
              </button>
            </>
          ) : null}

          <button
            onClick={() => router.push("/profile")}
            className="rounded-full border border-slate-700 bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:border-sky-500 hover:bg-slate-800"
          >
            Profile
          </button>

          <button
            onClick={logout}
            className="rounded-full bg-red-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <button
            onClick={() => router.push("/login")}
            className="rounded-full border border-slate-700 bg-slate-900 px-6 py-3 text-base font-semibold text-white transition hover:border-sky-500 hover:bg-slate-800"
          >
            Login
          </button>

          <button
            onClick={() => router.push("/register")}
            className="rounded-full bg-sky-500 px-6 py-3 text-base font-bold text-slate-950 transition hover:bg-sky-400"
          >
            Register
          </button>
        </>
      )}
    </div>
  </div>
</nav>

);
}
