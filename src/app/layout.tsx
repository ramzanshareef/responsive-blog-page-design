import type { Metadata } from "next";
import { Heebo } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import clsx from "clsx";

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
            <body className={clsx(heebo.className, "dark:bg-slate-600")}>
                <Navbar />
                {children}
                <Footer />
            </body>
        </html>
    );
}