import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import {
	Card,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle
} from "../ui/card";
import { PAGE_PATH } from "@/src/constants/enum";

export default function DevelopThisWebsite() {
	const router = useRouter();

	return (
		<Card className="bg-muted w-fit">
			<CardHeader className="pb-3">
				<CardTitle>Help me to develop this website 🥰</CardTitle>
				<CardDescription className="text-balance leading-relaxed">
					Do not hesitate to contact me on Discord at @Vipalisk to
					discuss development and new functionalities.
				</CardDescription>
			</CardHeader>
			<CardFooter>
				༼ つ ◕_◕ ༽つ{" "}
				<Button
					variant="link"
					className="text-lg"
					onClick={() => {
						router.push(`${PAGE_PATH.PROFILE}/vipalisk`);
					}}
				>
					@Vipalisk
				</Button>
			</CardFooter>
		</Card>
	);
}
