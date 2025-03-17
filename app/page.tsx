"use client"

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { InteractiveGridPattern } from "@/components/magicui/interactive-grid-pattern";
import Link from "next/link";
import '@/styles/globals.css'; // Ensure the CSS file is imported

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
        <section className="flex flex-col items-center justify-center">
            <div className="absolute inset-0 w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background opacity-25">
                    <InteractiveGridPattern
                        className={cn(
                            "[mask-image:radial-gradient(400px_circle_at_center,white,transparent)]",
                        )}
                        width={20}
                        height={20}
                        squares={[80, 80]}
                        squaresClassName="hover:fill-blue-500"
                    />
                </div>
            <div className="justify-center text-center mt-[250px]">
                <a className={`fade-in rotate justify-center text-center font-kanit font-normal text-[50px] ${fade ? 'show' : ''}`}>
                    {languages[currentLanguage]} <span className="z-10 font-kanit text-[50px] text-[blue]" >zunzu</span>
                </a>
            </div>
        </section>
    );
}