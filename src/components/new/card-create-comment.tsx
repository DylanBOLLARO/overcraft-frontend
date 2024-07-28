import { createStep } from "@/src/services/api";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Textarea } from "../ui/textarea";
import { useState } from "react";

export default function CreateComment({ user, buildId, refetch }: any) {
	const canSendMessage = user.role !== "GUEST";
	const [textComment, setTextComment] = useState("");

	return (
		<Card className="flex flex-col w-full gap-2 p-4">
			<Textarea
				value={textComment}
				onChange={(e) => setTextComment(e.target.value)}
				disabled={!canSendMessage}
				placeholder="Type your message here."
			/>
			<div className="flex items-center justify-end">
				{!canSendMessage && (
					<p className="flex-1 text-destructive pl-2">
						You cannot post a comment yet
					</p>
				)}
				<Button
					disabled={!canSendMessage}
					className="max-w-min self-end"
					onClick={() => {
						createStep(user.id, buildId, textComment);
						setTextComment("");
						refetch();
					}}
				>
					Send message
				</Button>
			</div>
		</Card>
	);
}
