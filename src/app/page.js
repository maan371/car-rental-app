import Image from "next/image";

export default function Home() {
  return (
    <main>
      <section className="h-[80vh] flex items-center justify-center bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="text-center">
          <h1 className="text-6xl font-bold">
            Rent Your Dream Car
          </h1>

          <p className="mt-4 text-xl">
            Affordable • Reliable • Fast Booking
          </p>

          <a
            href="/cars"
            className="inline-block mt-6 bg-white text-black px-6 py-3 rounded-lg"
          >
            Explore Cars
          </a>
        </div>
      </section>
    </main>
  );
}
