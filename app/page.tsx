"use client"

import { useEffect, useRef, useState } from "react";
import '../styles/globals.css';
import { InteractiveGridPattern } from "@/components/magicui/interactive-grid-pattern";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card, CardHeader } from "@/components/ui/card";

const languages = [
    "My name is",
    "สวัสดี ผมชื่อว่า",
    "Mi nombre es",
    "Je m'appelle",
    "Mein Name ist",
    "私の名前は"
];

export default function Home() {
    const titleRefs = useRef<(HTMLHeadingElement | null)[]>([]);
    const [currentLanguage, setCurrentLanguage] = useState(0);
    const [fade, setFade] = useState(true);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    console.log('Intersection Observer entry:', entry); // Debug log
                    if (entry.isIntersecting) {
                        entry.target.classList.add("show");
                    } else {
                        entry.target.classList.remove("show");
                    }
                });
            },
            { threshold: 0.1 }
        );

        titleRefs.current.forEach(ref => {
            if (ref) {
                observer.observe(ref);
            }
        });

        return () => {
            titleRefs.current.forEach(ref => {
                if (ref) {
                    observer.unobserve(ref);
                }
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
                <h1 className="justify-start items-start font-kanit pl-[54px] text-[32px] italic">Lastest Blog</h1>
                <div className="ml-[52px] bg-black" style={{ width: '207px', height: '1px' }}></div>
            </div>
            <div>
                <Card
                    className="mt-8 mx-auto w-[90%] md:w-[75%] lg:w-[688px] h-[157px] rounded-[30px] relative overflow-hidden"
                    style={{
                        backgroundImage: "url('/grad.png')",
                        backgroundPosition: "center",
                        backgroundSize: "cover"
                    }}
                >
                    <div className="absolute inset-0 bg-black/30"></div>
                    <CardHeader className="pl-4 md:pl-8 lg:ml-[267px] relative z-10 text-white flex flex-col justify-center">
                        <h3 className="text-lg md:text-xl lg:text-2xl font-bold">Latest Post Title</h3>
                        <p className="text-sm md:text-base opacity-80">Brief description of your latest blog post</p>
                    </CardHeader>
                </Card>
            </div>
        </section>
    );
}