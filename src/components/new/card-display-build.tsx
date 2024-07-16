"use client";

import { cn } from "@/src/lib/utils";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle
} from "../ui/card";
import Link from "next/link";

const CardDisplayBuild = ({ build }: any) => {
	const truncate = (input: string) =>
		input?.length > 100 ? `${input.substring(0, 90)}...` : input;

	return (
		<Link
			href={`/builds/${build.id}`}
			className="flex flex-1 min-w-[200px] min-w-xs max-w-xs w-full group/card select-none cursor-pointer"
		>
			<Card
				className={cn(
					" cursor-pointer overflow-hidden relative card h-52 rounded-md shadow-xl  max-w-sm mx-auto backgroundImage flex flex-col justify-between p-4",
					"bg-[url(https://images.unsplash.com/photo-1544077960-604201fe74bc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1651&q=80)] bg-cover"
				)}
			>
				<div className="absolute w-full h-full top-0 left-0 transition duration-300 group-hover/card:bg-black opacity-60"></div>
				<CardHeader className="p-0">
					<CardDescription className="font-normal text-base text-gray-50 relative z-10">
						{build?.title}
					</CardDescription>
				</CardHeader>
				<CardContent className="text-xs content p-0 my-4 z-10 text-muted-foreground text-justify">
					{truncate(build?.description)}
				</CardContent>
			</Card>
		</Link>
	);
};
export default CardDisplayBuild;
