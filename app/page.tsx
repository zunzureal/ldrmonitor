"use client"
import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code"
import { button as buttonStyles } from "@nextui-org/theme";
import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import Spline from '@splinetool/react-spline';
import DynamicIsland from './DynamicIsland'; // Import the new component

export default function Home() {
    return (
        <div>
            <Spline className="absolute"
                scene="https://prod.spline.design/ixfpXeueU33ARBkh/scene.splinecode"
            />
            <DynamicIsland /> {/* Use the new component */}
        </div>
    );
}