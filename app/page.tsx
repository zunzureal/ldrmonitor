"use client"

import { useEffect, useRef, useState } from "react";
import '../styles/globals.css';
import { InteractiveGridPattern } from "@/components/magicui/interactive-grid-pattern";
import { cn } from "@/lib/utils";

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
        </section>
    );
}