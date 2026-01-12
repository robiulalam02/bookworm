"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X, Book as BookIcon, User, List, ImageIcon, Loader2, Trash2, ExternalLink } from "lucide-react";
import { uploadImage } from "@/lib/upload";
import { createBook, getAllBooks, deleteBook } from "@/actions/book"; // Added deleteBook
import { getAllGenres } from "@/actions/genre";

export default function ManageBooks() {
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [genres, setGenres] = useState<any[]>([]);
    const [books, setBooks] = useState<any[]>([]);
    const [fetching, setFetching] = useState(true);

    // Fetch initial data
    useEffect(() => {
        refreshData();
    }, []);

    const refreshData = async () => {
        setFetching(true);
        const [genreRes, bookRes] = await Promise.all([getAllGenres(), getAllBooks()]);
        if (genreRes.success) setGenres(genreRes.data);
        if (bookRes.success) setBooks(bookRes.data);
        setFetching(false);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        const form = e.currentTarget;
        const formData = new FormData(form);

        try {
            const imageUrl = await uploadImage(formData.get("cover") as File);
            const res = await createBook({
                title: formData.get("title"),
                author: formData.get("author"),
                genre: formData.get("genre"),
                description: formData.get("description") || "No description provided.",
                totalPages: formData.get("pages") || 0,
                coverImage: imageUrl,
            });

            if (res.success) {
                setIsOpen(false);
                form.reset();
                refreshData(); // Refresh the list
            }
        } catch (err) {
            alert("Error adding book");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (confirm("Are you sure you want to remove this book?")) {
            const res = await deleteBook(id);
            if (res.success) refreshData();
        }
    };

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-10">
                <div>
                    <h1 className="text-3xl font-bold text-stone-800 tracking-tight">Library Assets</h1>
                    <p className="text-stone-500 text-sm">Manage your physical and digital collection</p>
                </div>
                <button
                    onClick={() => setIsOpen(true)}
                    className="flex items-center gap-2 bg-orange-600 text-white px-6 py-3 rounded-2xl font-bold hover:bg-orange-700 transition-all shadow-lg shadow-orange-200"
                >
                    <Plus size={20} /> Add New Volume
                </button>
            </div>

            {/* Book List Table */}
            <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-sm">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-stone-50 border-b border-stone-200">
                        <tr>
                            <th className="px-6 py-4 text-xs font-bold text-stone-500 uppercase tracking-widest">Book Details</th>
                            <th className="px-6 py-4 text-xs font-bold text-stone-500 uppercase tracking-widest">Genre</th>
                            <th className="px-6 py-4 text-xs font-bold text-stone-500 uppercase tracking-widest text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100">
                        {fetching ? (
                            <tr><td colSpan={3} className="p-10 text-center"><Loader2 className="animate-spin mx-auto text-stone-400" /></td></tr>
                        ) : books.length === 0 ? (
                            <tr><td colSpan={3} className="p-10 text-center text-stone-400 italic">No books found in the library.</td></tr>
                        ) : (
                            books.map((book) => (
                                <motion.tr layout key={book._id} className="hover:bg-stone-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-4">
                                            <img src={book.coverImage} alt={book.title} className="w-12 h-16 object-cover rounded shadow-sm" />
                                            <div>
                                                <div className="font-bold text-stone-800">{book.title}</div>
                                                <div className="text-sm text-stone-500">{book.author}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="px-3 py-1 bg-orange-50 text-orange-700 rounded-full text-xs font-bold uppercase">
                                            {book.genre?.name || "Uncategorized"}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button
                                            onClick={() => handleDelete(book._id)}
                                            className="p-2 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </td>
                                </motion.tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Slide-over Modal */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsOpen(false)} className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40" />
                        <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 25 }} className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 p-8 shadow-2xl overflow-y-auto">
                            <div className="flex justify-between items-center mb-8">
                                <h2 className="text-xl font-bold flex items-center gap-2 text-[#4a3728]"><BookIcon /> New Book Details</h2>
                                <button onClick={() => setIsOpen(false)} className="text-stone-400 hover:text-stone-800"><X /></button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div className="space-y-1">
                                    <label className="text-xs font-bold uppercase text-stone-500">Title</label>
                                    <input name="title" className="w-full p-3 bg-stone-50 border rounded-xl outline-none focus:ring-2 focus:ring-orange-500" placeholder="e.g. The Alchemist" required />
                                </div>

                                <div className="space-y-1">
                                    <label className="text-xs font-bold uppercase text-stone-500">Author</label>
                                    <input name="author" className="w-full p-3 bg-stone-50 border rounded-xl outline-none focus:ring-2 focus:ring-orange-500" placeholder="e.g. Paulo Coelho" required />
                                </div>

                                <div className="space-y-1">
                                    <label className="text-xs font-bold uppercase text-stone-500">Genre</label>
                                    <select name="genre" className="w-full p-3 bg-stone-50 border rounded-xl outline-none focus:ring-2 focus:ring-orange-500 appearance-none" required>
                                        <option value="">Select Category</option>
                                        {genres.map(g => <option key={g._id} value={g._id}>{g.name}</option>)}
                                    </select>
                                </div>

                                <div className="space-y-1">
                                    <label className="text-xs font-bold uppercase text-stone-500">Cover Image</label>
                                    <div className="border-2 border-dashed border-stone-200 rounded-xl p-4 text-center hover:border-orange-500 transition-colors">
                                        <input name="cover" type="file" accept="image/*" className="w-full text-sm text-stone-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-orange-50 file:text-orange-700" required />
                                    </div>
                                </div>

                                <button disabled={loading} className="w-full bg-[#1a1a1a] text-white py-4 rounded-xl font-bold flex justify-center items-center gap-2 hover:bg-black transition-all shadow-xl shadow-stone-200">
                                    {loading ? <Loader2 className="animate-spin" /> : "Publish to Library"}
                                </button>
                            </form>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}