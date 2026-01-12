"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { BookOpen, Search, Video, Library, LogOut, User as UserIcon } from "lucide-react";
import { signOut } from "next-auth/react";

const navItems = [
    { name: "My Library", href: "/library", icon: Library },
    { name: "Browse Books", href: "/browse", icon: Search },
    { name: "Tutorials", href: "/tutorials", icon: Video },
];

export default function UserLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    return (
        <div className="min-h-screen bg-[#fdfcf0] flex flex-col md:flex-row">
            {/* Navigation Sidebar */}
            <aside className="w-full md:w-64 bg-white border-r border-stone-200 p-6 flex flex-col justify-between">
                <div>
                    <div className="flex items-center gap-2 mb-10 text-[#4a3728]">
                        <BookOpen size={32} className="text-[#8c7851]" />
                        <h1 className="text-xl font-serif font-bold italic">BookWorm</h1>
                    </div>

                    <nav className="space-y-2">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link key={item.href} href={item.href}>
                                    <motion.div
                                        whileHover={{ x: 5 }}
                                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive
                                            ? "bg-[#4a3728] text-white shadow-md"
                                            : "text-stone-600 hover:bg-stone-100"
                                            }`}
                                    >
                                        <item.icon size={20} />
                                        <span className="font-medium">{item.name}</span>
                                    </motion.div>
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                <button
                    onClick={() => signOut()}
                    className="flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-all mt-auto"
                >
                    <LogOut size={20} />
                    <span className="font-medium">Sign Out</span>
                </button>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 p-4 md:p-8 lg:p-12 overflow-y-auto">
                {children}
            </main>
        </div>
    );
}