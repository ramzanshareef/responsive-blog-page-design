"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { IoReorderThreeSharp } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { MdDarkMode } from "react-icons/md";
import { CiLight } from "react-icons/ci";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";

export default function Navbar() {
    const [showNavbar, setShowNavbar] = useState(false);
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    const toggleNavbar = () => {
        setShowNavbar(!showNavbar);
    };

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 450) {
                setIsSmallScreen(true);
            } else {
                setIsSmallScreen(false);
            }
        };
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <nav className="min-w-full sticky top-0 z-40 flex flex-col-reverse items-end justify-between p-4 sm:px-10 sm:py-6 bg-white dark:bg-dark text-dark dark:text-slate-200">
            <div className="min-w-full flex items-center justify-between font-medium">
                <Link
                    href="/"
                    className="hover:text-primary dark:hover:text-primary text-2xl font-bold transition-colors duration-300"
                >
                    Blog Website
                </Link>
                <div className="sm:hidden block">
                    <IoReorderThreeSharp
                        className={`w-9 h-9 cursor-pointer ${showNavbar === false ? "block" : "hidden"}`}
                        onClick={toggleNavbar}
                    />
                    <IoMdClose
                        className={`w-9 h-9 cursor-pointer ${showNavbar === true ? "block" : "hidden"}`}
                        onClick={toggleNavbar}
                    />
                    <AnimatePresence>
                        {showNavbar && (
                            <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                                className={clsx("flex flex-col items-end space-y-4 absolute top-16 right-4 bg-white dark:bg-black text-dark dark:text-white p-4 rounded-lg shadow-lg")}
                            >
                                <MdDarkMode
                                    className="w-8 h-8 cursor-pointer dark:text-white transition-colors duration-300"
                                    onClick={() => {
                                        document.documentElement.classList.toggle("dark");
                                        localStorage.setItem("theme", "light");
                                    }}
                                />
                                <Link href="/blogs" className="hover:text-primary text-primary dark:hover:text-primary transition-colors duration-300">
                                    Blogs
                                </Link>
                                <Link href="/about" className="hover:text-primary dark:hover:text-primary transition-colors duration-300">
                                    Works
                                </Link>
                                <Link href="/about" className="hover:text-primary dark:hover:text-primary transition-colors duration-300">
                                    About
                                </Link>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
                <div className="hidden sm:flex items-center space-x-4 font-medium">
                    <MdDarkMode
                        className="w-8 h-8 cursor-pointer dark:text-white transition-colors duration-300"
                        onClick={() => {
                            document.documentElement.classList.toggle("dark");
                            localStorage.setItem("theme", "dark");
                        }}
                    />
                    <Link
                        href="/blogs"
                        className="hover:text-primary text-primary dark:hover:text-primary transition-colors duration-300"
                    >
                        Blogs
                    </Link>
                    <Link
                        href="/about"
                        className="hover:text-primary dark:hover:text-primary transition-colors duration-300"
                    >
                        Works
                    </Link>
                    <Link
                        href="/about"
                        className="hover:text-primary dark:hover:text-primary transition-colors duration-300"
                    >
                        About
                    </Link>
                </div>
            </div>
        </nav>
    );
}