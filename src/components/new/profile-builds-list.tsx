import { PAGE_PATH } from "@/src/constants/enum";
import Link from "next/link";

export function ProfileBuildsList({ builds }: any) {
	console.log(builds);
	return (
		<>
			{builds?.map((build: any) => {
				return (
					<Link
						href={`${PAGE_PATH.BUILDS}/${build.slug}`}
						key={build.slug}
						className="flex flex-row hover:bg-muted p-2 rounded"
					>
						<div className="">
							<p className="text-sm font-medium">{build.title}</p>
							<p className="text-sm text-muted-foreground">
								{build.description}
							</p>
						</div>
					</Link>
				);
			})}
		</>
	);
}
