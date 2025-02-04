"use client"

import { useEffect, useRef, useState } from "react";
import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code";
import { button as buttonStyles } from "@nextui-org/theme";
import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import Spline from '@splinetool/react-spline';
import DynamicIsland from './DynamicIsland'; // Import the new component
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
        <section>
            <DynamicIsland />
            <div className="justify-center text-center mt-[300px]">
                <a className={`fade-in rotate justify-center text-center font-kanit font-normal text-[50px] ${fade ? 'show' : ''}`}>
                    {languages[currentLanguage]}
                </a>
                <a className="ml-[15px] font-kanit text-[50px] text-primary">zunzu</a>
            </div>
            <div className="justify-center text-center mt-[360px]">
                <h1 ref={el => titleRefs.current[0] = el} className="fade-in justify-center text-center font-kanit text-[100px]">Under Maintenance</h1>
                {/* <div className="text-center">
                    <p ref={el => titleRefs.current[1] = el} className="fade-in">2023 - Nurse Chan is born</p>
                    <p ref={el => titleRefs.current[2] = el} className="fade-in">2023 - yed tood</p>
                    <p ref={el => titleRefs.current[3] = el} className="fade-in">2023 - Nurse Chan is born</p>
                    <p ref={el => titleRefs.current[4] = el} className="fade-in">2023 - yed tood</p>
                    <p ref={el => titleRefs.current[5] = el} className="fade-in">2023 - Nurse Chan is born</p>
                    <p ref={el => titleRefs.current[6] = el} className="fade-in">2023 - yed tood</p>
                    <p ref={el => titleRefs.current[7] = el} className="fade-in">2023 - Nurse Chan is born</p>
                    <p ref={el => titleRefs.current[8] = el} className="fade-in">2023 - yed tood</p>
                </div> */}
            </div>
        </section>
    );
}