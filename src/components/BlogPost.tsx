"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import Post from "@/types/Post";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";
import { motion, AnimatePresence } from "framer-motion";
import { IoSearch } from "react-icons/io5";
import { MdClear } from "react-icons/md";

gsap.registerPlugin(ScrollTrigger);

const BlogPost = ({ posts }: { posts: Array<Post> }) => {
    const [showModal, setShowModal] = useState(false);
    const [modalImage, setModalImage] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const component = useRef(null);
    const itemsRef = useRef<Array<HTMLDivElement | null>>([]);
    const [hovering, setHovering] = useState(false);
    const lastMousePos = useRef({ x: 0, y: 0 });

    useEffect(() => {
        let ctx = gsap.context(() => {
            itemsRef.current.forEach((item, index) => {
                gsap.fromTo(
                    item,
                    {
                        opacity: 0,
                        y: 20,
                    },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 1.3,
                        ease: "elastic.out(1,0.3)",
                        stagger: 0.2,
                        scrollTrigger: {
                            trigger: item,
                            start: "top bottom-=100px",
                            end: "bottom center",
                            toggleActions: "play none none none",
                        },
                    },
                );
            });

            return () => ctx.revert();
        }, component);
    }, []);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const mousePos = { x: e.clientX, y: e.clientY + window.scrollY };
            const speed = Math.sqrt(Math.pow(mousePos.x - lastMousePos.current.x, 2));

            let ctx = gsap.context(() => {
                lastMousePos.current = mousePos;
                return () => ctx.revert();
            }, component);
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, [hovering]);

    const onMouseEnter = (index: number) => {
        if (!hovering) setHovering(true);
    };

    const onMouseLeave = () => {
        setHovering(false);
    };

    const filteredPosts = posts.filter((post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <div ref={component} className="container py-6 space-y-6"
                onMouseLeave={onMouseLeave}
            >
                <div className="mb-6">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search blog posts"
                            id="searchBlog"
                            className="w-full h-12 px-4 py-2 border-2 border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent peer text-dark"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        {!searchTerm && (
                            <IoSearch className="absolute top-1/2 right-4 transform -translate-y-1/2 peer-focus:text-primary cursor-pointer"
                                onClick={() => document.getElementById("searchBlog")?.focus()}
                            />
                        )}
                        {searchTerm && (
                            <MdClear
                                className="absolute top-1/2 right-4 transform -translate-y-1/2 text-dark dark:text-light cursor-pointer"
                                onClick={() => setSearchTerm("")}
                            />
                        )}
                    </div>
                </div>
                {filteredPosts.map((post) => (
                    <motion.div
                        key={post.id}
                        ref={(el: any) => (itemsRef.current[post.id] = el)}
                        className="post border-b-2 border-slate-200 flex flex-col sm:flex-row py-2 sm:py-6 gap-x-10"
                        transition={{ duration: 0.3 }}
                    >
                        <div>
                            <Image
                                src={post.thumbnail}
                                alt="blog"
                                width={800}
                                height={400}
                                className="rounded w-full sm:w-80 h-auto sm:h-48 cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out"
                                onClick={() => {
                                    setModalImage(post.thumbnail);
                                    setShowModal(true);
                                }}
                            />
                        </div>
                        <div className="max-sm:py-4 sm:px-4 flex flex-col w-full">
                            <motion.span
                                className="text-dark text-2xl font-semibold transition-colors duration-300 ease-in-out hover:text-primary dark:text-slate-200"
                            >
                                {post.title}
                            </motion.span>
                            <span className="space-x-4 mt-4">
                                <span className="font-semibold bg-dark text-white py-[0.05rem] px-[0.75rem] rounded-full">
                                    {post.date}
                                </span>
                                <span className="text-light transition-colors duration-300 ease-in-out hover:text-dark dark:text-slate-300">
                                    {post.author}
                                </span>
                            </span>
                            <div className="text-dark text-sm mt-4 dark:text-slate-200 prose min-w-full">
                                {post.description.length > 300 ? post.description.slice(0, 300) + "..." : post.description}
                            </div>
                        </div>
                    </motion.div>
                ))}
                {filteredPosts.length === 0 && (
                    <div className="text-dark dark:text-slate-200 text-center text-2xl font-semibold">
                        No Blogs Found! 😢
                    </div>
                )}
            </div>
            <AnimatePresence>
                {showModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed top-0 left-0 z-80 w-screen min-h-screen bg-black/80 flex justify-center items-center"
                    >
                        <button
                            className="fixed z-90 top-20 right-8 text-white dark:text-slate-200 text-5xl font-bold"
                            onClick={() => setShowModal(false)}
                        >
                            &times;
                        </button>
                        <motion.div
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.8 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Image
                                src={modalImage}
                                className="object-contain w-5/6 h-5/6 sm:w-3/4 sm:h-3/4 mx-auto"
                                alt={modalImage}
                                width={800}
                                height={600}
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default BlogPost;