import { Badge } from "../ui/badge";
import { capitalize, cn } from "@/src/services/utils";
import { formatDistanceToNowStrict } from "date-fns";
import { Heart, MessageSquareText, Star, Swords } from "lucide-react";
import { useRouter } from "next/navigation";
import { Separator } from "../ui/separator";

export function BuildItem({ build }: any) {
	const router = useRouter();

	function getBadgeVariantFromLabel(label: string) {
		if (["z"].includes(label.toLowerCase())) {
			return "zerg";
		}

		if (["t"].includes(label.toLowerCase())) {
			return "terran";
		}

		if (["p"].includes(label.toLowerCase())) {
			return "protoss";
		}
	}

	return (
		<button
			onClick={() => {
				router.push(`/builds/${build.slug}`);
			}}
			key={build.id}
			className={cn(
				"flex flex-col flex-1 items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent max-w-5xl"
			)}
		>
			<div className="flex w-full flex-col gap-1">
				<div className="flex items-center">
					<div className="flex items-center gap-2">
						<h4 className="scroll-m-20 text-lg font-semibold tracking-tight">
							{build.title}
						</h4>
					</div>
					<div
						className={cn("ml-auto text-xs text-muted-foreground")}
					>
						{formatDistanceToNowStrict(
							new Date(build?.created_at),
							{
								addSuffix: true
							}
						)}
					</div>
				</div>
				<div className="text-xs font-medium">{build?.subject}</div>
			</div>
			<div className="line-clamp-2 text-sm text-muted-foreground">
				{build?.description.substring(0, 300)}
			</div>

			<div className="flex items-center justify-between gap-2 w-full mt-auto">
				{build?.user?.username && (
					<Badge
						variant={getBadgeVariantFromLabel(build?.race?.[0])}
					>{`${build?.race}`}</Badge>
				)}
				<Swords className="opacity-75" />
				{build?.user?.username && (
					<Badge
						variant={getBadgeVariantFromLabel(build?.v_race?.[0])}
					>{`${build?.v_race}`}</Badge>
				)}

				{build?.type && (
					<>
						<Separator orientation="vertical" />
						<h4 className="scroll-m-20 text-lg font-semibold tracking-tight opacity-75">
							{capitalize(build?.type) || undefined}
						</h4>
					</>
				)}

				{build?.difficulty && (
					<>
						<Separator orientation="vertical" />
						<h4 className="scroll-m-20 text-lg font-semibold tracking-tight opacity-75">
							{build?.difficulty || 1}
						</h4>
						<Star
							strokeWidth={3}
							className="opacity-75 h-5 w-5 text-yellow-500"
						/>
					</>
				)}

				{build?._count?.like > 0 && (
					<>
						<Separator orientation="vertical" />
						<h4 className="scroll-m-20 text-lg font-semibold tracking-tight opacity-75">
							{build?._count?.like}
						</h4>
						<Heart
							strokeWidth={3}
							className="h-5 w-5 text-pink-700 opacity-65"
						/>
					</>
				)}

				{build?._count?.comment > 0 && (
					<>
						<Separator orientation="vertical" />
						<h4 className="scroll-m-20 text-lg font-semibold tracking-tight opacity-75">
							{build?._count?.comment}
						</h4>
						<MessageSquareText
							strokeWidth={2}
							className="h-5 w-5 text-cyan-300 opacity-75 "
						/>
					</>
				)}

				<div className="ml-auto flex items-center gap-2 opacity-50">
					{build?.user?.username && (
						<Badge className="ml-auto" variant={"outline"}>
							by {build?.user?.username}
						</Badge>
					)}
				</div>
			</div>
		</button>
	);
}
