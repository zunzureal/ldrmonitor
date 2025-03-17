"use client"
import "@/styles/globals.css";
import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { Providers } from "./providers";
import { Navbar } from "@/components/navbar";
import { Link } from "@nextui-org/link";
import clsx from "clsx";
import { DockCustom } from "@/components/atomic/navbar/dockcustom";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head />
            <body
                className={clsx(
                    "min-h-screen bg-background font-sans antialiased",
                    fontSans.variable
                )}
            >
                <Providers themeProps={{ attribute: "class", defaultTheme: "light" }}>
                    <div className="relative flex flex-col h-screen">
                        <Navbar />
                        <DockCustom />
                        <main className="">
                            {children}
                        </main>
                        <footer className="flex items-center justify-center pt-[50rem] py-4">
                        </footer>
                    </div>
                </Providers>
            </body>
        </html>
    );
}