import { MarketingConfig } from "@/src/types";
import { pagePath } from "../constants/enum";

export const marketingConfig: MarketingConfig = {
	mainNav: [
		{
			title: "Documentation",
			href: pagePath.DOCUMENTATION
		},
		{
			title: "Builds",
			href: pagePath.BUILDS
		}
	]
};
