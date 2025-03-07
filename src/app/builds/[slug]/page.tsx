"use client";

import { BuildItem } from "@/components/build/build-item";
import CreateComment from "@/components/comment/card-create-comment";
import { CommentItem } from "@/components/comment/comment-item";
import { useConnectedUserContext } from "@/components/layout/providers";
import HeaderWithBackBtnAndTile from "@/components/new/header-back-title";
import { NoResultsFound } from "@/components/new/no-builds-found";
import { Card, CardContent } from "@/components/ui/card";
import {
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from "@/components/ui/table";
import { useBuild } from "@/services/queries";
import { secondsToMinutesAndSeconds } from "@/services/utils";
import { Table } from "lucide-react";

export default function Page({ params }: { params: { slug: string } }) {
	const { connectedUser } = useConnectedUserContext();
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
		link: window.location,
		likeBtn: true
	};

	return (
		<div className="flex-1 flex flex-col gap-5 p-5">
			<HeaderWithBackBtnAndTile
				config={configHeader}
				build={build}
				userId={connectedUser?.id}
				refetch={refetch}
			/>

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
							key={`comment_${comment.id}`}
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
