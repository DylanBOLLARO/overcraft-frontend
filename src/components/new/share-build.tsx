import { Copy } from "lucide-react";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useRef } from "react";

// Define props type
interface ShareBuildProps {
	link: string;
}

export function ShareBuild({ link }: ShareBuildProps) {
	const refCopyToClipboard = useRef<HTMLInputElement>(null);

	const copyToClipboard = (ref: React.RefObject<HTMLInputElement>) => {
		if (ref.current) {
			ref.current.select();
			document.execCommand("copy");
		}
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline" className="ml-24">
					Share
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle>Share link</DialogTitle>
					<DialogDescription>
						Anyone who has this link will be able to view this.
					</DialogDescription>
				</DialogHeader>
				<div className="flex items-center space-x-2">
					<div className="grid flex-1 gap-2">
						<Label htmlFor="link" className="sr-only"></Label>
						<Input
							id="link"
							defaultValue={link}
							readOnly
							ref={refCopyToClipboard}
						/>
					</div>
					<Button
						type="button" // Change from 'submit' to 'button'
						size="sm"
						className="px-3"
						onClick={() => {
							copyToClipboard(refCopyToClipboard);
						}}
					>
						<span className="sr-only">Copy</span>
						<Copy className="h-4 w-4" />
					</Button>
				</div>
				<DialogFooter className="sm:justify-start">
					<DialogClose asChild>
						<Button type="button" variant="default">
							Close
						</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
