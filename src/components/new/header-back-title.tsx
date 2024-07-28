import { capitalize, cn } from "@/src/services/utils";
import { Button, buttonVariants } from "../ui/button";
import { Icons } from "../icons";
import { ShareBuild } from "./share-build";
import { createLike, deleteLike } from "@/src/services/api";

export default function HeaderWithBackBtnAndTile({
	config,
	build,
	userId,
	refetch
}: any) {
	const isBuildLiked = (build: any) => {
		return build?.like?.some((like: any) => like.user_id === userId);
	};

	const handleLikeOrUnlike = () => {
		if (isBuildLiked(build)) {
			deleteLike(
				build?.like?.find((like: any) => like.user_id === userId)?.id
			);
		} else {
			createLike(userId, build?.id);
		}
		refetch();
	};

	return (
		<div className="flex flex-row justify-between relative">
			<Button
				onClick={() => window.history.back()}
				className={cn(
					buttonVariants({ variant: "outline" }),
					"left-4 top-4 md:left-8 md:top-8 self-start z-10"
				)}
			>
				<>
					<Icons.chevronLeft className="mr-2 h-4 w-4" />
					Back
				</>
			</Button>
			<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
				<h4 className="text-3xl font-semibold tracking-tight ">
					{capitalize(config?.title)}
				</h4>
			</div>

			<div className="flex gap-2">
				{config?.likeBtn && isBuildLiked(build) ? (
					<Button variant={"outline"} onClick={handleLikeOrUnlike}>
						Unlike
					</Button>
				) : (
					<Button variant={"secondary"} onClick={handleLikeOrUnlike}>
						Like
					</Button>
				)}
				{config?.share && <ShareBuild link={config?.link} />}
			</div>
		</div>
	);
}
