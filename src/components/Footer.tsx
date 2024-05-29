import Link from "next/link";
import { FaFacebookSquare } from "react-icons/fa";
import { FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa6";

export default function Footer() {
    return (
        <footer className="flex flex-col gap-y-4 items-center justify-center w-full h-24 mt-10 dark:text-white">
            <div className="flex items-center justify-center space-x-4">
                <Link
                    href="/"
                    className="hover:text-primary dark:hover:text-white"
                >
                    <FaFacebookSquare className="w-6 h-6" />
                </Link>
                <Link
                    href="/"
                    className="hover:text-primary dark:hover:text-white"
                >
                    <FaInstagram className="w-6 h-6" />
                </Link>
                <Link
                    href="/"
                    className="hover:text-primary dark:hover:text-white"
                >
                    <FaTwitter className="w-6 h-6" />
                </Link>
                <Link
                    href="/"
                    className="hover:text-primary dark:hover:text-white"
                >
                    <FaLinkedin className="w-6 h-6" />
                </Link>
            </div>
            <div>
                <p className="text-sm text-gray-500 dark:text-slate-200">
                    © 2024 All rights reserved
                </p>
            </div>
        </footer>
    );
}