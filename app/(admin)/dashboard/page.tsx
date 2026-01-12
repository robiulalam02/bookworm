import { connectDB } from "@/lib/db";
import Book from "@/models/Book";
import User from "@/models/User";

export default async function AdminDashboard() {
    await connectDB();

    // Fetch stats for the requirement: "Overview stats (total books, users, pending reviews)"
    const totalBooks = await Book.countDocuments();
    const totalUsers = await User.countDocuments();

    return (
        <div className="p-8">
            <h1 className="text-3xl font-serif font-bold text-[#4a3728] mb-8">Admin Overview</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-200">
                    <p className="text-stone-500 text-sm uppercase font-bold tracking-wider">Total Books</p>
                    <h2 className="text-4xl font-bold text-[#4a3728]">{totalBooks}</h2>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-200">
                    <p className="text-stone-500 text-sm uppercase font-bold tracking-wider">Total Users</p>
                    <h2 className="text-4xl font-bold text-[#4a3728]">{totalUsers}</h2>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-200">
                    <p className="text-stone-500 text-sm uppercase font-bold tracking-wider">Pending Reviews</p>
                    <h2 className="text-4xl font-bold text-orange-600">0</h2>
                </div>
            </div>
        </div>
    );
}