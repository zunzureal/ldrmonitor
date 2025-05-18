"use client"

import { useEffect, useRef, useState } from "react";
import '../styles/globals.css';
import { InteractiveGridPattern } from "@/components/magicui/interactive-grid-pattern";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card, CardHeader } from "@/components/ui/card";
import { Chip } from "@heroui/chip";

// Mock data for blog cards
const mockBlogPosts = [
    {
        id: 1,
        title: "Getting Started with Next.js",
        description: "A beginner's guide to setting up your first Next.js project",
        image: "/grad.png",
        urls: "graduation",
        category: "music"
    },
    {
        id: 2,
        title: "CSS Grid Layout Mastery",
        description: "Learn how to create complex layouts with CSS Grid",
        image: "/grad.png",
        urls: "",
        category: "music"
    },
    {
        id: 3,
        title: "React Hooks Deep Dive",
        description: "Understanding useState, useEffect and custom hooks",
        image: "/grad.png",
        urls: "",
        category: "music"
    },
    {
        id: 4,
        title: "React Hooks Deep Dive",
        description: "Understanding useState, useEffect and custom hooks",
        image: "/grad.png",
        urls: "",
        category: "music"
    },
    {
        id: 5,
        title: "React Hooks Deep Dive",
        description: "Understanding useState, useEffect and custom hooks",
        image: "/grad.png",
        urls: "",
        category: "music"
    }
];

const languages = [
    "My name is",
    "สวัสดี ผมชื่อว่า",
    "Mi nombre es",
    "Je m'appelle",
    "Mein Name ist",
    "私の名前は"
];

export default function Home() {
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
    const titleRefs = useRef<(HTMLHeadingElement | null)[]>([]);
    const [currentLanguage, setCurrentLanguage] = useState(0);
    const [fade, setFade] = useState(true);

    // Set up the refs array to match the number of cards
    useEffect(() => {
        cardRefs.current = cardRefs.current.slice(0, mockBlogPosts.length);
    }, [mockBlogPosts.length]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("fade-in");
                        entry.target.classList.remove("fade-out");
                    } else {
                        entry.target.classList.add("fade-out");
                        entry.target.classList.remove("fade-in");
                    }
                });
            },
            { threshold: 0.1 }
        );

        // Observer for title elements
        titleRefs.current.forEach(ref => {
            if (ref) {
                observer.observe(ref);
            }
        });

        // Observer for card elements
        cardRefs.current.forEach(ref => {
            if (ref) {
                observer.observe(ref);
            }
        });

        return () => {
            titleRefs.current.forEach(ref => {
                if (ref) observer.unobserve(ref);
            });
            
            cardRefs.current.forEach(ref => {
                if (ref) observer.unobserve(ref);
            });
        };
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setFade(false);
            setCurrentLanguage((prev) => (prev + 1) % languages.length);
            setTimeout(() => {
                setFade(true);
            }, 1000); // Wait for fade-out to complete before setting fade-in
        }, 3000); // Change language every 3 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <section className="flex flex-col min-h-screen">
            <div className="mt-[50px] text-center items-center justify-center">
                <h1 className="font-kanit text-[20px] italic">~/zunzu</h1>
                <h2 className="font-kanit text-[20px] italic">wall of blog</h2>
            </div>
            <div className="pt-[18px]">
                <h1 
                    className="justify-start items-start font-kanit pl-[54px] text-[32px] italic"
                >
                    Latest Blog
                </h1>
                <div className="ml-[52px] bg-black" style={{ width: '207px', height: '1px' }}></div>
            </div>

            <div className="flex flex-col gap-8 mt-8 mb-16">
                {mockBlogPosts.map((post, index) => (
                    <div 
                        key={post.id}
                        ref={el => cardRefs.current[index] = el}
                        className="opacity-0 transition-all duration-700 transform translate-y-10"
                    >
                        <Link 
                            href={`/blog/${post.urls}`} 
                            className="block w-full no-underline"
                        >
                            <Card
                                className="mx-auto w-[90%] md:w-[75%] lg:w-[688px] h-[157px] rounded-[30px] relative overflow-hidden hover:shadow-lg transition-shadow"
                                style={{
                                    backgroundImage: `url('${post.image}')`,
                                    backgroundPosition: "center",
                                    backgroundSize: "cover"
                                }}
                            >
                                <div className="absolute inset-0 bg-black/30"></div>
                                <CardHeader className="pl-4 md:pl-8 lg:ml-[267px] relative z-10 text-white flex flex-col justify-center">
                                    <h3 className="text-lg md:text-xl lg:text-2xl font-bold">{post.title}</h3>
                                    <p className="text-sm md:text-base opacity-80">{post.description}</p>
                                    <Chip size="md" color="primary" variant="faded">
                                        {post.category}
                                    </Chip>
                                </CardHeader>
                            </Card>
                        </Link>
                    </div>
                ))}
            </div>
        </section>
    );
}