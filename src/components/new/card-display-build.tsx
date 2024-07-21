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
import { useRouter } from "next/navigation";
import { Heart, MessageSquareText } from "lucide-react";

const CardDisplayBuild = ({ build }: any) => {
	const router = useRouter();
	const truncate = (input: string) =>
		input?.length > 100 ? `${input.substring(0, 90)}...` : input;

	return (
		<Card
			onClick={() => {
				router.push(`/builds/${build.slug}`);
			}}
			className={cn(
				"flex flex-1 min-w-[200px] min-w-xs max-w-xs w-full group/card select-none cursor-pointer overflow-hidden relative card h-40 rounded-md shadow-xl backgroundImage flex-col justify-between p-4",
				"bg-[url(https://images.unsplash.com/photo-1544077960-604201fe74bc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1651&q=80)] bg-cover"
			)}
		>
			<div className="absolute w-full h-full top-0 left-0 transition duration-300 group-hover/card:bg-black opacity-60"></div>
			<CardHeader className="font-semibold text-lg text-current z-10 p-0">
				{build?.title}
			</CardHeader>
			<CardDescription className="font-normal text-current text-xs z-10">
				{truncate(build?.description)}
			</CardDescription>
			<CardContent className="flex flex-row p-0 text-current  z-10">
				<div className="flex-1 flex flex-row gap-5 justify-center">
					<MessageSquareText />
					<p>0</p>
				</div>
				<div className="flex-1 flex flex-row gap-5 justify-center">
					<Heart />
					<p>0</p>
				</div>
			</CardContent>
		</Card>
	);
};
export default CardDisplayBuild;
