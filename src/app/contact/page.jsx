"use client";

import { useState } from "react";
import api from "@/lib/api";


export default function ContactPage() {
const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [message, setMessage] = useState("");
const [success, setSuccess] = useState(false);
const [showDialog, setShowDialog] = useState(false);

const handleSubmit = async (e) => {
e.preventDefault();

try {
  await api.post("/contact", {
    name,
    email,
    message,
  });

  setSuccess(true);
  setShowDialog(true);

  setName("");
  setEmail("");
  setMessage("");
} catch (error) {
  console.log(error);
}


};

return ( <main className="min-h-screen bg-slate-950 text-white px-6 py-10"> <div className="mx-auto max-w-4xl">

    <section className="rounded-[2rem] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 p-10 shadow-2xl border border-white/10">
      <p className="text-sm uppercase tracking-[0.3em] text-sky-400">
        Contact Us
      </p>

      <h1 className="mt-4 text-5xl font-bold">
        We'd Love To Hear From You
      </h1>

      <p className="mt-4 text-slate-300">
        Have questions, suggestions, or need support?
        Send us a message.
      </p>
    </section>

    <section className="mt-8 rounded-[2rem] bg-slate-900 p-8 shadow-2xl border border-slate-700">
      <form onSubmit={handleSubmit} className="space-y-5">

        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-3xl bg-slate-800 border border-slate-700 p-4 text-white"
          required
        />

        <input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-3xl bg-slate-800 border border-slate-700 p-4 text-white"
          required
        />

        <textarea
          rows="5"
          placeholder="Your Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full rounded-3xl bg-slate-800 border border-slate-700 p-4 text-white"
          required
        />

        <div className="mt-6 flex gap-4">
          <button
            type="submit"
            className="rounded-full bg-sky-500 px-6 py-3 font-semibold text-slate-950 hover:bg-sky-400"
          >
            Send Message
          </button>

          <a
            href="https://wa.me/923145045738"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700"
          >
            WhatsApp Us
          </a>
        </div>

        {success && (
          <p className="text-emerald-400">
            Message sent successfully!
          </p>
        )}

      </form>
    </section>
  </div>
  {showDialog && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
    <div className="w-full max-w-md rounded-[2rem] border border-slate-700 bg-slate-900 p-8 text-center shadow-2xl">
      
      <div className="mb-4 text-6xl">
        ✅
      </div>

      <h2 className="text-2xl font-bold text-white">
        Message Sent
      </h2>

      <p className="mt-3 text-slate-300">
        Thank you for contacting us.
        We have received your message and will get back to you soon.
      </p>

      <button
        onClick={() => setShowDialog(false)}
        className="mt-6 rounded-full bg-sky-500 px-6 py-3 font-semibold text-slate-950 transition hover:bg-sky-400"
      >
        OK
      </button>
    </div>
  </div>
)}
</main>

);
}
