"use client";

import { useState, useEffect } from "react";
import api from "@/lib/api";

export default function ReviewsPage() {
const [reviews, setReviews] = useState([]);

const [name, setName] = useState("");
const [comment, setComment] = useState("");
const [rating, setRating] = useState(5);
const [reviewType, setReviewType] = useState("service");
const [selectedCar, setSelectedCar] = useState("");


const carImages = {
"Toyota Corolla": "/images/toyota.jpg",
"Honda Civic": "/images/honda-civic.jpg",
"Hyundai Elantra": "/images/hyundai-elantra.jpg",
"Kia Sportage": "/images/kia-sportage.jpg",
"Toyota Fortuner": "/images/fortuner.jpg",
"Honda CR-V": "/images/crv.jpg",
"BMW 3 Series": "/images/bmw-330i.jpg",
"Mercedes C-Class": "/images/c300.jpg",
"Audi A4": "/images/audi-a4.jpg",
"Tesla Model 3": "/images/model3.jpg",
"Tesla Model Y": "/images/modely.jpg",
"Ford Mustang": "/images/mustang.jpg",
"Chevrolet Camaro": "/images/camaro.jpg",
"Nissan Altima": "/images/altima.jpg",
"Mazda CX-5": "/images/cx5.jpg",
"Jeep Wrangler": "/images/wrangler.jpg",
"Range Rover Evoque": "/images/evoque.jpg",
"Porsche Cayenne": "/images/cayenne.jpg",
"Lexus ES 350": "/images/lexus-es.jpg",
"Volkswagen Tiguan": "/images/tiguan.jpg",
"Subaru Outback": "/images/outback.jpg",
};

const cars = [
"Toyota Corolla",
"Honda Civic",
"Hyundai Elantra",
"Kia Sportage",
"Toyota Fortuner",
"Honda CR-V",
"BMW 3 Series",
"Mercedes C-Class",
"Audi A4",
"Tesla Model 3",
"Tesla Model Y",
"Ford Mustang",
"Chevrolet Camaro",
"Nissan Altima",
"Mazda CX-5",
"Jeep Wrangler",
"Range Rover Evoque",
"Porsche Cayenne",
"Lexus ES 350",
"Volkswagen Tiguan",
"Subaru Outback",
];

useEffect(() => {
  fetchReviews();
}, []);

const fetchReviews = async () => {
  try {
    const res = await api.get("/reviews");
    setReviews(res.data.reviews || []);
  } catch (error) {
    console.log(error);
  }
};

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const newReview = {
      name,
      comment,
      rating,
      reviewType,
      carName: selectedCar,
    };

    await api.post("/reviews", newReview);

    const res = await api.get("/reviews");

    setReviews(res.data.reviews || []);

    setName("");
    setComment("");
    setRating(5);
    setReviewType("service");
    setSelectedCar("");
  } catch (error) {
    console.log(error);
  }
};

return ( <main className="min-h-screen bg-slate-950 px-6 py-10 text-white"> <div className="mx-auto max-w-5xl">

    <section className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 p-10 shadow-2xl">
      <p className="text-sm uppercase tracking-[0.3em] text-sky-400">
        Customer Reviews
      </p>

      <h1 className="mt-4 text-5xl font-bold">
        What Our Customers Say
      </h1>

      <p className="mt-4 text-slate-300">
        Share your experience with our car rental service.
      </p>
    </section>

    <section className="mt-8 rounded-[2rem] border border-slate-700 bg-slate-900 p-8">
      <form onSubmit={handleSubmit} className="space-y-5">

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your Name"
          className="w-full rounded-3xl border border-slate-700 bg-slate-800 p-4 text-white"
          required
        />

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">
            What are you reviewing?
          </label>

          <select
            value={reviewType}
            onChange={(e) => setReviewType(e.target.value)}
            className="w-full rounded-3xl border border-slate-700 bg-slate-800 p-4 text-white"
          >
            <option value="service">Service</option>
            <option value="car">Car</option>
          </select>
        </div>

        {reviewType === "car" && (
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Select Car
            </label>

            <select
              value={selectedCar}
              onChange={(e) => setSelectedCar(e.target.value)}
              className="w-full rounded-3xl border border-slate-700 bg-slate-800 p-4 text-white"
              required
            >
              <option value="">Choose a Car</option>

              {cars.map((car) => (
                <option key={car} value={car}>
                  {car}
                </option>
              ))}
            </select>
          </div>
        )}

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">
            Rating
          </label>

          <select
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="w-full rounded-3xl border border-slate-700 bg-slate-800 p-4 text-white"
          >
            <option value={5}>⭐⭐⭐⭐⭐ (5 Stars)</option>
            <option value={4}>⭐⭐⭐⭐ (4 Stars)</option>
            <option value={3}>⭐⭐⭐ (3 Stars)</option>
            <option value={2}>⭐⭐ (2 Stars)</option>
            <option value={1}>⭐ (1 Star)</option>
          </select>
        </div>

        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write your review"
          rows="4"
          className="w-full rounded-3xl border border-slate-700 bg-slate-800 p-4 text-white"
          required
        />

        <button
          type="submit"
          className="rounded-full bg-sky-500 px-6 py-3 font-semibold text-slate-950 transition hover:bg-sky-400"
        >
          Submit Review
        </button>

      </form>
    </section>

    <section className="mt-10">
      <h2 className="mb-6 text-3xl font-bold">
        Customer Feedback
      </h2>

      {reviews.length === 0 ? (
        <div className="rounded-[2rem] border border-slate-700 bg-slate-900 p-8 text-center">
          <p className="text-slate-400">
            No reviews yet. Be the first to leave a review.
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="rounded-[2rem] border border-slate-700 bg-slate-900 p-6 shadow-lg"
            >
              <div className="flex items-start justify-between gap-6">

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-white">
                      {review.name}
                    </h3>

                    <span className="text-yellow-400 text-lg">
                      {"⭐".repeat(review.rating)}
                    </span>
                  </div>

                  <p className="mt-2 text-sm text-sky-400">
                    {review.reviewType === "car"
                      ? `Car Review • ${review.carName}`
                      : "Service Review"}
                  </p>

                  <p className="mt-4 text-slate-300">
                    {review.comment}
                  </p>
                </div>

                {review.reviewType === "car" &&
                  review.carName &&
                  carImages[review.carName] && (
                    <img
                      src={carImages[review.carName]}
                      alt={review.carName}
                      className="h-28 w-40 rounded-2xl border border-slate-700 object-cover"
                    />
                  )}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>

  </div>
</main>

);
}
