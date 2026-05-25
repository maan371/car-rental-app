"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const [token, setToken] = useState(null);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    router.push("/login");
  };

  const user = JSON.parse(
  localStorage.getItem("user")
);

  return (
    <div className="flex justify-between items-center p-4 shadow-md bg-white">
      <h1
        className="text-xl font-bold cursor-pointer"
        onClick={() => router.push("/")}
      >
        🚗 Car Rental
      </h1>

      <div className="flex gap-4">
        <button onClick={() => router.push("/cars")}>
          Cars
        </button>

        <button onClick={() => router.push("/bookings")}>
          Bookings
        </button>

        {!token ? (
          <>
            <button onClick={() => router.push("/login")}>
              Login
            </button>

            <button onClick={() => router.push("/register")}>
              Register
            </button>
          </>
        ) : (
          <button
            onClick={logout}
            className="text-red-600 font-bold"
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
}