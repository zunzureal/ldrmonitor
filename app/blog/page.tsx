import { title } from "@/components/primitives";
import React from "react";
import { Card, CardBody, Image, Button, Slider } from "@nextui-org/react"

export default function DocsPage() {

    const blogs = [
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
          title: "Amity Hackathon 2023 : ChatGPT & Beyond",
          date: "18 March 2023 - 19 March 2023",
          disp: "two-day event held on March 18-19, 2023, at True Digital Park West in Bangkok, Thailand. Organized by Amity in collaboration with True Digital Park, the hackathon aimed to inspire developers and tech enthusiasts to create innovative solutions using advanced Generative AI technologies, such as GPT-3, Codex, and DALL-E 2, under the theme 'AI for Positive Social Impact.'",
          role: "Role",
          link: "/blog/amityhackathon",
          details: ["- Participants (Pitching Round)", "Learn more "],
          image: "https://www.checkraka.com/uploaded/img/logo/7M/7M4xfkf26QTrR94QDTcktRLRcuPKq6neCkq.webp",
        },
      ];

    return (
        <div>
            <h1 className={title()}>Blog</h1>
            <div>
            {blogs.map((blog) => (
                <Card
                    isBlurred
                    className="border-none bg-background/60 dark:bg-default-100/50 max-w-[700px] mt-[50px] w-[1000px]"
                    shadow="sm"
                >
                    <CardBody>
                        <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 justify-center">
                            <div className="col-span-6 md:col-span-4">
                                <Image
                                    alt="Album cover"
                                    className="object-cover max-w-full"
                                    height={300}
                                    shadow="md"
                                    src={blog.image}
                                />
                            </div>

                            <div className="flex flex-col col-span-6 md:col-span-8">
                                <div className="flex justify-between items-start mt-[10px]">
                                    <div className="flex flex-col gap-0">
                                        <h1 className="font-kanit text-[20px]">{blog.title}</h1>
                                        <p className="text-[12px] mt-[5px]">{blog.date}</p>
                                    </div>
                                </div>

                                <div className="flex flex-col mt-3 gap-1">
                                    <p>{blog.disp}</p>
                                    <div className="flex justify-between">
                                    </div>
                                </div>

                                <div className="flex w-full items-center justify-center">

                                </div>
                            </div>
                        </div>
                    </CardBody>
                </Card>
                ))}
            </div>
        </div>
    );
}
