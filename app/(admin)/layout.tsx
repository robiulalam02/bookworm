"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { LayoutDashboard, BookPlus, Tags, Users, LogOut, ShieldCheck } from "lucide-react";
import { signOut } from "next-auth/react";

const adminNav = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Manage Books", href: "/manage-books", icon: BookPlus },
    { name: "Genres", href: "/genres", icon: Tags },
    { name: "User Base", href: "/users", icon: Users },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    return (
        <div className="min-h-screen bg-stone-50 flex flex-col md:flex-row">
            {/* Admin Sidebar */}
            <aside className="w-full md:w-64 bg-[#1a1a1a] text-stone-300 p-6 flex flex-col">
                <div className="flex items-center gap-3 mb-10 text-white">
                    <ShieldCheck size={30} className="text-orange-500" />
                    <h1 className="text-xl font-bold tracking-tight">Admin Panel</h1>
                </div>

                <nav className="flex-1 space-y-1">
                    {adminNav.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link key={item.href} href={item.href}>
                                <motion.div
                                    whileHover={{ x: 4 }}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive
                                        ? "bg-orange-600 text-white"
                                        : "hover:bg-stone-800 hover:text-white"
                                        }`}
                                >
                                    <item.icon size={20} />
                                    <span className="font-medium text-sm">{item.name}</span>
                                </motion.div>
                            </Link>
                        );
                    })}
                </nav>

                <button
                    onClick={() => signOut()}
                    className="flex items-center gap-3 px-4 py-3 text-stone-400 hover:text-red-400 transition-colors mt-auto border-t border-stone-800 pt-4"
                >
                    <LogOut size={20} />
                    <span className="text-sm font-medium">Exit Panel</span>
                </button>
            </aside>

            <main className="flex-1 overflow-y-auto">
                {children}
            </main>
        </div>
    );
}