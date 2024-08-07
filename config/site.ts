export type SiteConfig = typeof siteConfig;

export const siteConfig = {
	name: "Punyapat Chanthakhun",
	description: "Welcome to my world.",
	navItems: [
		{
			label: "Home",
			href: "/",
		},
    {
      label: "Docs",
      href: "/docs",
    },
    {
      label: "Pricing",
      href: "/pricing",
    },
    {
      label: "Blog",
      href: "/blog",
    },
    {
      label: "About",
      href: "/about",
    }
	],
	navMenuItems: [
		{
			label: "Event",
			href: "/event",
		},
	],
	links: {
		github: "https://github.com/zunzureal",
		
	},
};
