import Image from "next/image";
import { cn } from "@/src/lib/utils";
import { useRouter } from "next/navigation";
import moment from "moment";

export function CardBuild({
	width,
	build,
	styleView,
	height,
	className,
	...props
}: any) {
	const router = useRouter();

	const isProd = process.env.NODE_ENV === "production";

	const truncateText = (text: string) => {
		return text.length > 75 ? `${text.slice(0, 75)}...` : text;
	};
	return (
		<div
			className={cn(
				"flex flex-1 flex-row hover:bg-muted p-2 cursor-pointer gap-3 rounded justify-between",
				className
			)}
			{...props}
			onClick={() => {
				router.push(`/dashboard/update/${build.id}`);
			}}
		>
			<div className="flex flex-row gap-2 items-center">
				<Image
					src={`${isProd ? "/overcraft" : ""}/picture_build.png`}
					alt={build.title}
					width={width}
					height={height}
					className={cn(
						"object-cover transition-all hover:scale-105 aspect-square h-10 w-10 rounded"
					)}
				/>
				<div className="space-y-1 text-sm">
					<h3 className="font-medium leading-none">{build.title}</h3>
					<p className="text-muted-foreground text-xs">
						{truncateText(build.description)}
					</p>
				</div>
			</div>
			<div className="flex flex-col gap-2 items-center">
				<p className="text-muted-foreground text-xs self-end">
					{build.race.slice(0, 1)}v{build.v_race.slice(0, 1)}
				</p>
				<p className="text-muted-foreground text-xs self-end">
					{moment(build.updatedAt).format("LL")}
				</p>
			</div>
		</div>
	);
}
