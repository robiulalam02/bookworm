import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {},
            async authorize(credentials: any) {
                await connectDB();
                const user = await User.findOne({ email: credentials.email });
                if (user && bcrypt.compareSync(credentials.password, user.password)) {
                    return { id: user._id, name: user.name, email: user.email, role: user.role };
                }
                return null;
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }: any) {
            if (user) token.role = user.role;
            return token;
        },
        async session({ session, token }: any) {
            if (session.user) session.user.role = token.role;
            return session;
        },
    },
    pages: { signIn: "/login" },
    session: { strategy: "jwt" as const },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };