"use client";

import * as React from "react";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { siteConfig } from "@/src/config/site";
import { cn } from "@/src/lib/utils";
import { pagePath } from "../constants/enum";

export function MainNav({ items }: any) {
	const segment = useSelectedLayoutSegment();
	return (
		<div className="flex gap-6 md:gap-10">
			<Link
				href={`${pagePath.HOME}`}
				className="hidden items-center space-x-2 md:flex"
			>
				<span className="hidden font-bold sm:inline-block">
					{siteConfig.name}
				</span>
			</Link>
			{items?.length && (
				<nav className="flex gap-6 ">
					{items?.map((item: any, index: number) => (
						<Link
							key={index}
							href={item.disabled ? "#" : item.href}
							className={cn(
								"flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm",
								item.href.startsWith(`/${segment}`)
									? "text-foreground"
									: "text-foreground/60",
								item.disabled && "cursor-not-allowed opacity-80"
							)}
						>
							{item.title}
						</Link>
					))}

					<Link
						href={`${pagePath.DASHBOARD}`}
						className={cn(
							"flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm text-foreground/60"
						)}
					>
						Dashboard
					</Link>
				</nav>
			)}
		</div>
	);
}
