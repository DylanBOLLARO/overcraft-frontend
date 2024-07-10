import Image from "next/image";
import { cn } from "../lib/utils";
import { useRouter } from "next/navigation";

export function AlbumArtwork({
	build,
	aspectRatio = "portrait",
	width,
	height,
	className,
	...props
}: any) {
	const router = useRouter();
	const isProd = process.env.NODE_ENV === "production";
	return (
		<div
			className={cn(
				"space-y-3 hover:bg-muted p-2 rounded cursor-pointer",
				className,
			)}
			{...props}
			onClick={() => router.push(`/builds/${build.id}`)}
		>
			<div className="overflow-hidden rounded-md">
				<Image
					src={`${isProd ? "/overcraft" : ""}/picture_build.png`}
					alt={build.title}
					width={width}
					height={height}
					className={cn(
						"h-auto w-auto object-cover transition-all hover:scale-105 aspect-square",
					)}
				/>
			</div>
			<div className="space-y-1 text-sm">
				<h3 className="font-medium leading-none">{build.title}</h3>
			</div>
		</div>
	);
}
