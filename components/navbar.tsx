"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
	Navbar as NextUINavbar,
	NavbarContent,
	NavbarBrand,
} from "@nextui-org/navbar";
import NextLink from "next/link";
import clsx from "clsx";

import { ThemeSwitch } from "@/components/theme-switch";
import {
	TwitterIcon,
	GithubIcon,
	DiscordIcon,
	HeartFilledIcon,
	SearchIcon,
} from "@/components/icons";

import { Logo } from "@/components/icons";
import '@/styles/globals.css';

export const Navbar = () => {
	const router = useRouter();

	return (
		<NextUINavbar isBlurred={true} maxWidth="xl" position="sticky">
			<NavbarContent className="basis-1/5 sm:basis-full" justify="start">
				<NavbarBrand as="li" className="gap-3 max-w-fit">
					<NextLink className="flex justify-start items-center gap-1" href="/">
						<h1 className="font-kanit font-normal">~./zunzu</h1>
					</NextLink>
				</NavbarBrand>
			</NavbarContent>
		</NextUINavbar>
	);
};