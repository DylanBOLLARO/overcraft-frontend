import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Textarea } from "../ui/textarea";

export default function CreateComment({ user }: any) {
	const canSendMessage = user.role !== "GUEST";

	return (
		<Card className="flex flex-col w-full gap-2 p-4">
			<Textarea
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
				>
					Send message
				</Button>
			</div>
		</Card>
	);
}
