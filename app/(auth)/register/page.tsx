"use client";

import { useState } from "react";
import { uploadImage } from "@/lib/upload";
import { registerUser } from "@/actions/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const file = formData.get("photo") as File;

        try {
            // 1. Upload Photo to ImgBB
            const photoUrl = await uploadImage(file);

            // 2. Prepare Data
            const userData = {
                name: formData.get("name"),
                email: formData.get("email"),
                password: formData.get("password"),
                photo: photoUrl,
            };

            // 3. Register in MongoDB
            const res = await registerUser(userData);

            if (res.success) {
                router.push("/login");
            } else {
                alert(res.error);
            }
        } catch (err) {
            alert("Registration failed. Check your connection.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-[#fdfcf0] p-8 rounded-2xl shadow-2xl border-2 border-[#e7e5d1] w-full max-w-md">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-serif font-bold text-[#4a3728]">BookWorm 📚</h1>
                <p className="text-[#8c7851]">Start your reading journey</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label className="block text-sm font-medium text-[#4a3728]">Full Name</label>
                    <input name="name" type="text" className="w-full mt-1 p-3 rounded-lg border border-[#dcd7c9] bg-white focus:ring-2 focus:ring-[#8c7851] outline-none transition" placeholder="John Doe" required />
                </div>

                <div>
                    <label className="block text-sm font-medium text-[#4a3728]">Email Address</label>
                    <input name="email" type="email" className="w-full mt-1 p-3 rounded-lg border border-[#dcd7c9] bg-white focus:ring-2 focus:ring-[#8c7851] outline-none transition" placeholder="john@example.com" required />
                </div>

                <div>
                    <label className="block text-sm font-medium text-[#4a3728]">Password</label>
                    <input name="password" type="password" className="w-full mt-1 p-3 rounded-lg border border-[#dcd7c9] bg-white focus:ring-2 focus:ring-[#8c7851] outline-none transition" placeholder="••••••••" required />
                </div>

                <div>
                    <label className="block text-sm font-medium text-[#4a3728]">Profile Photo</label>
                    <input name="photo" type="file" accept="image/*" className="w-full mt-1 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#8c7851] file:text-white hover:file:bg-[#4a3728]" required />
                </div>

                <button disabled={loading} className="w-full py-3 bg-[#4a3728] text-white rounded-lg font-bold shadow-md hover:bg-[#3e2e22] transition-transform active:scale-95">
                    {loading ? "Opening the library..." : "Register"}
                </button>
            </form>

            <p className="text-center mt-6 text-sm text-[#8c7851]">
                Already a member? <Link href="/login" className="font-bold text-[#4a3728] hover:underline">Log In</Link>
            </p>
        </div>
    );
}