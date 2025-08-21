import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth"; // Impor dari file konfigurasi

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };