"use client";

import { Card, CardContent } from "@/src/components/ui/card";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from "@/src/components/ui/table";

import { secondsToMinutesAndSeconds } from "@/src/services/utils";
import CreateComment from "@/src/components/new/card-create-comment";
import { useRouter } from "next/navigation";
import { useBuild } from "@/src/services/queries";
import { useConnectedUserContext } from "@/src/components/layout/providers";
import HeaderWithBackBtnAndTile from "@/src/components/new/header-back-title";
import { BuildItem } from "@/src/components/new/build-item";
import { NoResultsFound } from "@/src/components/new/no-builds-found";
import { CommentItem } from "@/src/components/new/comment-item";

export default function Page({ params }: { params: { slug: string } }) {
	const { connectedUser } = useConnectedUserContext();
	const router = useRouter();
	const { slug } = params;
	const buildId = slug.split("-")[0];
	const {
		error,
		data: build,
		isLoading,
		isFetched,
		refetch
	} = useBuild(buildId);

	if (isLoading) return;
	if (error) return console.error("An error has occurred: " + error.message);

	const configHeader = {
		title: build?.title,
		share: true,
		link: window.location
	};

	return (
		<div className="flex-1 flex flex-col gap-5 p-5">
			<HeaderWithBackBtnAndTile config={configHeader} />
			{isFetched && (
				<BuildItem
					build={build}
					classname={"hover:bg-transparent cursor-default"}
					showHeader={false}
					highlightCreator={true}
				/>
			)}
			{build?.steps?.length > 0 ? (
				<Card className="bg-transparent">
					<CardContent className="pt-6">
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Population</TableHead>
									<TableHead>Timer</TableHead>
									<TableHead>Description</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{build?.steps?.map((step: any) => (
									<TableRow
										className="h-10"
										key={`${step?.id}`}
									>
										<TableCell>{step.population}</TableCell>
										<TableCell>
											{secondsToMinutesAndSeconds(
												step.timer || 0
											)}
										</TableCell>
										<TableCell>
											{step.description}
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</CardContent>
				</Card>
			) : (
				<NoResultsFound text={"steps"} />
			)}

			{build?.comment?.length > 0 && build?.comment && (
				<div className="flex-1 flex flex-col gap-2">
					<h4 className="text-xl font-semibold tracking-tight pb-2">
						Comments
					</h4>
					{build?.comment?.map((comment: any) => (
						<CommentItem
							classname={"hover:bg-transparent cursor-default"}
							comment={comment}
							showHeader={false}
						/>
					))}
				</div>
			)}
			{connectedUser && (
				<CreateComment
					user={connectedUser}
					buildId={build?.id}
					refetch={refetch}
				/>
			)}
		</div>
	);
}
