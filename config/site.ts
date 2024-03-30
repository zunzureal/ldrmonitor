export type SiteConfig = typeof siteConfig;

export const siteConfig = {
	name: "zunzu",
	description: "Just a daily of zunzu life.",
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
		// {
		// 	label: "Docs",
		// 	href: "/docs",
		// },
		// {
		// 	label: "Dashboard",
		// 	href: "/dashboard",
		// },
		// {
		// 	label: "Projects",
		// 	href: "/projects",
		// },
		// {
		// 	label: "Team",
		// 	href: "/team",
		// },
		// {
		// 	label: "Calendar",
		// 	href: "/calendar",
		// },
		// {
		// 	label: "Settings",
		// 	href: "/settings",
		// },
		// {
		// 	label: "Help & Feedback",
		// 	href: "/help-feedback",
		// },
		// {
		// 	label: "Logout",
		// 	href: "/logout",
		// },
		{
				label: "Nothing here now",
				href: "/goback",
			},
	],
	links: {
		github: "https://github.com/zunzureal",
		
	},
};
