import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";

// app/api/auth/[...nextauth]/route.ts

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {},
            async authorize(credentials: any) {
                await connectDB();
                const user = await User.findOne({ email: credentials.email });

                if (user && bcrypt.compareSync(credentials.password, user.password)) {
                    // Make sure to convert _id to string for NextAuth compatibility
                    return {
                        id: user._id.toString(),
                        name: user.name,
                        email: user.email,
                        role: user.role
                    };
                }
                return null;
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }: any) {
            // When user logs in, attach role and id to the token
            if (user) {
                token.role = user.role;
                token.sub = user.id; // sub is the standard field for ID
            }
            return token;
        },
        async session({ session, token }: any) {
            // Pass role and id from token to the browser session
            if (session.user) {
                session.user.role = token.role;
                session.user.id = token.sub;
            }
            return session;
        },
    },
    pages: { signIn: "/login" },
    session: {
        strategy: "jwt" as const,
        maxAge: 30 * 24 * 60 * 60, // 30 Days persistence
    },
    secret: process.env.NEXTAUTH_SECRET, // Make sure this is in your .env.local!
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };