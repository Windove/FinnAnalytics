export type SiteConfig = typeof siteConfig;

export const siteConfig = {
	name: "Finn Analytics",
	description: "A simple analytics tool for finn.no",
	navItems: [
		{
			label: "Home",
			href: "/",
		},
		{
			label: "About",
			href: "/about",
		},
	],
	links: {
		github: "https://github.com/Windove/FinnAnalytics",
	},
};
