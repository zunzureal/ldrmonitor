export type SiteConfig = typeof siteConfig;

export const siteConfig = {
	name: "SafePassage",
	description: "SafePassage Monitor.",
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
