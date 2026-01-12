"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, Tag, Loader2 } from "lucide-react";

export default function GenresPage() {
    const [genres, setGenres] = useState<{ _id: string; name: string }[]>([]);
    const [newGenre, setNewGenre] = useState("");
    const [loading, setLoading] = useState(false);

    // Note: We will connect this to a Server Action in the next step
    const addGenre = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newGenre) return;
        setLoading(true);

        // Logic to call server action would go here
        // For now, let's simulate the UI behavior
        const tempId = Math.random().toString();
        setGenres([...genres, { _id: tempId, name: newGenre }]);
        setNewGenre("");
        setLoading(false);
    };

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <header className="mb-8">
                <h2 className="text-2xl font-bold text-stone-800">Book Genres</h2>
                <p className="text-stone-500 text-sm">Organize your library collections</p>
            </header>

            {/* Add Genre Form */}
            <form onSubmit={addGenre} className="flex gap-3 mb-10">
                <div className="relative flex-1">
                    <Tag className="absolute left-3 top-3 text-stone-400" size={18} />
                    <input
                        value={newGenre}
                        onChange={(e) => setNewGenre(e.target.value)}
                        placeholder="Enter genre name (e.g. Science Fiction)"
                        className="w-full pl-10 pr-4 py-2.5 bg-white border border-stone-200 rounded-xl outline-none focus:ring-2 focus:ring-orange-500 shadow-sm"
                    />
                </div>
                <button
                    disabled={loading}
                    className="bg-orange-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-orange-700 transition-all flex items-center gap-2"
                >
                    {loading ? <Loader2 className="animate-spin" /> : <Plus size={20} />}
                    Add
                </button>
            </form>

            {/* Genres List */}
            <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
                <div className="p-4 bg-stone-50 border-b border-stone-200 text-xs font-bold text-stone-500 uppercase tracking-widest">
                    Existing Genres
                </div>
                <ul className="divide-y divide-stone-100">
                    <AnimatePresence>
                        {genres.length === 0 ? (
                            <li className="p-10 text-center text-stone-400 text-sm italic">
                                No genres added yet. Start by adding one above.
                            </li>
                        ) : (
                            genres.map((genre) => (
                                <motion.li
                                    key={genre._id}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 10 }}
                                    className="p-4 flex justify-between items-center hover:bg-stone-50 transition-colors"
                                >
                                    <span className="font-medium text-stone-700">{genre.name}</span>
                                    <button className="text-stone-400 hover:text-red-500 p-2 rounded-lg hover:bg-red-50 transition-all">
                                        <Trash2 size={18} />
                                    </button>
                                </motion.li>
                            ))
                        )}
                    </AnimatePresence>
                </ul>
            </div>
        </div>
    );
}