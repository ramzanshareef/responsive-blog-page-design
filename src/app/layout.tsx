import type { Metadata } from "next";
import { Heebo } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const heebo = Heebo({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Responsive Blog Page",
    description: "A responsive blog page layout.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={heebo.className}>
                <Navbar />
                {children}
                <Footer />
            </body>
        </html>
    );
}