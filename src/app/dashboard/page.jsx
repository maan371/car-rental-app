export default function Dashboard() {
  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-3 gap-5 mt-8">
        <div className="bg-white p-6 shadow rounded">
          Total Cars
        </div>

        <div className="bg-white p-6 shadow rounded">
          Total Users
        </div>

        <div className="bg-white p-6 shadow rounded">
          Total Bookings
        </div>
      </div>
    </div>
  );
}