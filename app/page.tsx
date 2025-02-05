"use client"

import { useEffect, useRef, useState } from "react";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code";
import { button as buttonStyles } from "@nextui-org/theme";
import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import Spline from '@splinetool/react-spline';
import { Card, CardBody, CardHeader, Image } from '@nextui-org/react'
import Link from "next/link";
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

    const events = [
        {
          id: 1,
          title: "A bit of Thai tunes",
          date: "05 Apr 2024 - 06 Apr 2024",
          role: "Role",
          link: "/blog/thaitunes",
          details: ["- Staff", "- TA (Teaching Assistant)"],
          image: "Thai_tunes.png",
        },
        {
          id: 2,
          title: "Amity Hackathon",
          date: "18 March 2023 - 19 March 2023",
          role: "Role",
          link: "/blog/amityhackathon",
          details: ["- Participants (Pitching Round)", "Learn more "],
          image: "AmityHackathon.jpg",
        },
      ];

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
        <section className="flex flex-col items-center justify-center min-h-screen">
            <div className="justify-center text-center mt-[300px]">
                <a className={`fade-in rotate justify-center text-center font-kanit font-normal text-[50px] ${fade ? 'show' : ''}`}>
                    {languages[currentLanguage]}
                </a>
                <a className="ml-[15px] font-kanit text-[50px] text-primary">zunzu</a>
            </div>
            {/* <div className="justify-center text-center mt-[360px]">
                <h1 ref={el => titleRefs.current[0] = el} className="fade-in justify-center text-center font-kanit text-[70px]">Past Event</h1>
                <div className="text-center">
                    <div ref={el => titleRefs.current[1] = el} className="fade-in">
                        <div>
                            <div className="gap-6 justify-center">
                                {events.map((event) => (
                                    event.link ? (
                                        <Link href={event.link} passHref key={event.id}>
                                            <Card
                                                isBlurred
                                                className="border-none bg-background/60 dark:bg-default-100/50 max-w-[610px] mx-auto"
                                                shadow="sm"
                                            >
                                                <CardBody>
                                                    <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center">
                                                        <div className="col-span-6 md:col-span-4">
                                                            <Image
                                                                alt="Album cover"
                                                                className="object-cover"
                                                                height={200}
                                                                shadow="md"
                                                                src={event.image}
                                                                width="100%"
                                                            />
                                                        </div>

                                                        <div className="flex flex-col col-span-6 md:col-span-8">
                                                            <div className="flex justify-between items-start">
                                                                <div className="flex flex-col gap-0">
                                                                    <h3 className="font-extrabold text-lg text-foreground/90">{event.title}</h3>
                                                                    <p className="text-small text-foreground/80">{event.date}</p>
                                                                    <h1 className="text-large font-medium mt-2">{event.role}</h1>
                                                                    {event.details.map((detail, index) => (
                                                                        <p key={index} className="text-small text-foreground/80 mt-2">{detail}</p>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </CardBody>
                                            </Card>
                                        </Link>
                                    ) : (
                                        <Card
                                            key={event.id}
                                            isBlurred
                                            className="border-none bg-background/60 dark:bg-default-100/50 max-w-[610px] mx-auto"
                                            shadow="sm"
                                        >
                                            <CardBody>
                                                <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center">
                                                    <div className="col-span-6 md:col-span-4">
                                                        <Image
                                                            alt="Album cover"
                                                            className="object-cover"
                                                            height={200}
                                                            shadow="md"
                                                            src={event.image}
                                                            width="100%"
                                                        />
                                                    </div>

                                                    <div className="flex flex-col col-span-6 md:col-span-8">
                                                        <div className="flex justify-between items-start">
                                                            <div className="flex flex-col gap-0">
                                                                <h3 className="font-extrabold text-lg text-foreground/90">{event.title}</h3>
                                                                <p className="text-small text-foreground/80">{event.date}</p>
                                                                <h1 className="text-large font-medium mt-2">{event.role}</h1>
                                                                {event.details.map((detail, index) => (
                                                                    <p key={index} className="text-small text-foreground/80 mt-2">{detail}</p>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    )
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
        </section>
    );
}