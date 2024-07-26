import { capitalize, cn } from "@/src/services/utils";
import { Button, buttonVariants } from "../ui/button";
import { Icons } from "../icons";
import { ShareBuild } from "./share-build";

export default function HeaderWithBackBtnAndTile({ config }: any) {
	return (
		<div className="flex flex-row gap-5 justify-between">
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
			<h4 className="text-3xl font-semibold tracking-tight">
				{capitalize(config?.title)}
			</h4>

			{config?.share ? (
				<ShareBuild link={config?.link} />
			) : (
				<div className="px-20" />
			)}
		</div>
	);
}
