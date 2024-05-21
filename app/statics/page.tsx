"use client"
import { useEffect } from 'react';
import { title } from "@/components/primitives";

export default function StaticsPage() {
    useEffect(() => {
        window.location.href = 'https://static-git-main-zunzureals-projects.vercel.app/';
    }, []);

    return (
        <div>
            <h1 className={title()}>Redirecting</h1>
        </div>
    );
}