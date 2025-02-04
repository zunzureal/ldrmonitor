import React from "react";
import { Card, CardBody, CardHeader, Image } from "@nextui-org/react";

export default function EventPage() {
  const events = [
    {
      id: 1,
      title: "A bit of Thai tunes",
      date: "05 Apr 2024 - 06 Apr 2024",
      role: "Role",
      details: ["- Staff", "- TA (Teaching Assistant)"],
      image: "Thai_tunes.png",
    },
    {
      id: 2,
      title: "Amity Hackathon",
      date: "18 March 2023 - 19 March 2023",
      role: "Role",
      details: ["- Participants (Pitching Round)", "Learn more "],
      image: "AmityHackathon.jpg",
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      {events.map((event) => (
        <Card
          key={event.id}
          isBlurred
          className="border-none bg-background/60 dark:bg-default-100/50 max-w-[610px]"
          shadow="sm"
        >
          <CardBody>
            <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center">
              <div className="relative col-span-6 md:col-span-4">
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
      ))}
    </div>
  );
}