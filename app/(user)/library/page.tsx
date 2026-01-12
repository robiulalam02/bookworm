"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Book, Clock, CheckCircle, PlusCircle } from "lucide-react";
import Link from "next/link";

const shelves = [
    { id: "reading", label: "Currently Reading", icon: Clock },
    { id: "want", label: "Want to Read", icon: Book },
    { id: "read", label: "Finished", icon: CheckCircle },
];

export default function LibraryPage() {
    const [activeShelf, setActiveShelf] = useState("reading");

    return (
        <div className="max-w-6xl mx-auto">
            {/* Header Section */}
            <div className="flex justify-between items-end mb-10">
                <div>
                    <h2 className="text-3xl font-serif font-bold text-[#4a3728]">My Shelves</h2>
                    <p className="text-stone-500">Track your personal reading journey</p>
                </div>
                <Link href="/browse">
                    <button className="flex items-center gap-2 bg-[#8c7851] text-white px-5 py-2.5 rounded-full hover:bg-[#4a3728] transition-all shadow-sm">
                        <PlusCircle size={18} />
                        <span>Add New Book</span>
                    </button>
                </Link>
            </div>

            {/* Shelf Tabs */}
            <div className="flex gap-4 border-b border-stone-200 mb-8">
                {shelves.map((shelf) => (
                    <button
                        key={shelf.id}
                        onClick={() => setActiveShelf(shelf.id)}
                        className={`flex items-center gap-2 pb-4 px-2 transition-all relative ${activeShelf === shelf.id ? "text-[#4a3728] font-bold" : "text-stone-400"
                            }`}
                    >
                        <shelf.icon size={18} />
                        {shelf.label}
                        {activeShelf === shelf.id && (
                            <motion.div
                                layoutId="activeTab"
                                className="absolute bottom-0 left-0 right-0 h-1 bg-[#4a3728] rounded-full"
                            />
                        )}
                    </button>
                ))}
            </div>

            {/* Books Grid - Empty State Example */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeShelf}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
                >
                    {/* We will map actual data here later. For now, here is the Empty State UI */}
                    <div className="col-span-full py-20 flex flex-col items-center justify-center border-2 border-dashed border-stone-200 rounded-3xl bg-white/50">
                        <div className="bg-stone-100 p-4 rounded-full mb-4 text-stone-400">
                            <Book size={48} />
                        </div>
                        <h3 className="text-lg font-medium text-stone-600">No books here yet</h3>
                        <p className="text-stone-400 text-sm mb-6 text-center max-w-xs">
                            Explore our collection and add your first book to this shelf!
                        </p>
                        <Link href="/browse" className="text-[#8c7851] font-bold hover:underline">
                            Browse the library →
                        </Link>
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}