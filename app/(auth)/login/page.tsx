"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const email = formData.get("email");
        const password = formData.get("password");

        // This calls your [...nextauth] authorize function
        const res = await signIn("credentials", {
            email,
            password,
            redirect: false, // We handle redirect manually for better UX
        });

        if (res?.error) {
            alert("Invalid email or password");
            setLoading(false);
        } else {
            // Refresh and redirect to the default route (Middleware will handle role-based logic)
            router.push("/");
            router.refresh();
        }
    };

    return (
        <div className="bg-[#fdfcf0] p-8 rounded-2xl shadow-2xl border-2 border-[#e7e5d1] w-full max-w-md">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-serif font-bold text-[#4a3728]">Welcome Back 📖</h1>
                <p className="text-[#8c7851]">Enter your library credentials</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label className="block text-sm font-medium text-[#4a3728]">Email Address</label>
                    <input name="email" type="email" className="w-full mt-1 p-3 rounded-lg border border-[#dcd7c9] focus:ring-2 focus:ring-[#8c7851] outline-none" placeholder="your@email.com" required />
                </div>

                <div>
                    <label className="block text-sm font-medium text-[#4a3728]">Password</label>
                    <input name="password" type="password" className="w-full mt-1 p-3 rounded-lg border border-[#dcd7c9] focus:ring-2 focus:ring-[#8c7851] outline-none" placeholder="••••••••" required />
                </div>

                <button disabled={loading} className="w-full py-3 bg-[#4a3728] text-white rounded-lg font-bold shadow-md hover:bg-[#3e2e22] transition active:scale-95">
                    {loading ? "Checking records..." : "Login"}
                </button>
            </form>

            <p className="text-center mt-6 text-sm text-[#8c7851]">
                New to the library? <Link href="/register" className="font-bold text-[#4a3728] hover:underline">Create an Account</Link>
            </p>
        </div>
    );
}