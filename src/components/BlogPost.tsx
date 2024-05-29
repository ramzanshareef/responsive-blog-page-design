"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import Post from "@/types/Post";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const BlogPost = ({ posts }: { posts: Array<Post> }) => {
    const [showModal, setShowModal] = useState(false);
    const [modalImage, setModalImage] = useState("");
    const component = useRef(null);
    const itemsRef = useRef<Array<HTMLDivElement | null>>([]);

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

    const onMouseEnter = () => setShowModal(true);
    const onMouseLeave = () => setShowModal(false);

    return (
        <div ref={component} className="container">
            {posts.map((post) => (
                <motion.div
                    key={post.id}
                    className="post border-b-2 border-slate-200 flex flex-col sm:flex-row py-2 sm:py-6"
                    transition={{ duration: 0.3 }}
                >
                    <div>
                        <Image
                            src={post.thumbnail}
                            alt="blog"
                            width={800}
                            height={400}
                            className="rounded w-full h-60 sm:w-56 sm:h-auto cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out"
                            onClick={() => {
                                setModalImage(post.thumbnail);
                                setShowModal(true);
                            }}
                        />
                    </div>
                    <div className="max-sm:py-4 sm:px-4 flex flex-col">
                        <motion.span
                            className="text-dark text-2xl font-semibold transition-colors duration-300 ease-in-out hover:text-primary"
                        >
                            {post.title}
                        </motion.span>
                        <span className="space-x-4 mt-4">
                            <span className="font-semibold bg-dark text-white py-[0.05rem] px-[0.75rem] rounded-full">
                                {post.date}
                            </span>
                            <span className="text-light transition-colors duration-300 ease-in-out hover:text-dark">
                                {post.author}
                            </span>
                        </span>
                        <p className="text-dark text-sm mt-4">
                            {post.description}
                        </p>
                    </div>
                </motion.div>
            ))}
            {showModal && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed top-0 left-0 z-80 w-screen h-screen bg-black/80 flex justify-center items-center"
                >
                    <button
                        className="fixed z-90 top-20 right-8 text-white text-5xl font-bold"
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
        </div>
    );
};

export default BlogPost;