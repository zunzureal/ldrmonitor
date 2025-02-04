"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
	Navbar as NextUINavbar,
	NavbarContent,
	NavbarMenu,
	NavbarMenuToggle,
	NavbarBrand,
	NavbarMenuItem,
} from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";
import { Kbd } from "@nextui-org/kbd";
import { Link } from "@nextui-org/link";
import { Input } from "@nextui-org/input";

import { link as linkStyles } from "@nextui-org/theme";

import { siteConfig } from "@/config/site";
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

export const Navbar = () => {
	const router = useRouter();

	return (
		<NextUINavbar isBlurred={true} maxWidth="xl" position="sticky">
			<NavbarContent className="basis-1/5 sm:basis-full" justify="start">
				<NavbarBrand as="li" className="gap-3 max-w-fit">
					<NextLink className="flex justify-start items-center gap-1" href="/">
						<p className="font-bold text-inherit">~./zunzu</p>
					</NextLink>
				</NavbarBrand>
			</NavbarContent>

			<NavbarContent className="basis-1 pl-4" justify="end">
				{/* <Link isExternal href={siteConfig.links.github} aria-label="Github">
					<GithubIcon className="text-default-500" />
				</Link> */}
				<ThemeSwitch />
				{/* <NavbarMenuToggle /> */}
			</NavbarContent>

			{/* <NavbarMenu>
				<div className="mx-4 mt-2 flex flex-col gap-2 lg:mx-4 lg:mt-2 lg:flex lg:flex-col lg:gap-2 sm:flex-col sm:gap-2 lg:ml-[7rem]">
					{siteConfig.navMenuItems.map((item, index) => {
						return (
							<NavbarMenuItem key={`${item}-${index}`}>
								<Link
									href={item.href} // replace "#" with item.url
									size="lg"
								>
									{item.label}
								</Link>
							</NavbarMenuItem>
						);
					})}
				</div>
			</NavbarMenu> */}
		</NextUINavbar>
	);
};