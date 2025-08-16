import type { Metadata } from 'next';
 import './globals.css';
import NavBar from "@/app/components/NavBar";

export const metadata: Metadata = {
    title: 'Portofolio Saya',
    description: 'Dibuat dengan Next.js',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <body>
        <NavBar /> {/* Muncul di setiap halaman */}
        <main>{children}</main>
        </body>
        </html>
    );
}