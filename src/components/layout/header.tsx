import { UserNav } from "./user-nav";
import ThemeToggle from "./ThemeToggle/theme-toggle";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { PAGE_PATH } from "../../constants/enum";
import { Info } from "lucide-react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from "../ui/dialog";

export default function Header() {
	const router = useRouter();
	return (
		<div className="supports-backdrop-blur:bg-background/60 fixed left-0 right-0 top-0 z-20 border-b bg-background/95 backdrop-blur">
			<nav className="flex h-14 px-4 items-center gap-2">
				<h4
					className="text-xl font-semibold tracking-wider opacity-75 ml-5 hover:scale-105 hover:opacity-100 duration-75 cursor-pointer"
					onClick={() => router.push(PAGE_PATH.HOME)}
				>
					Overcraft
				</h4>
				<div className="flex items-center ml-auto gap-10">
					<div className="ml-10 flex items-center space-x-2">
						<UserNav />
						<Dialog>
							<DialogTrigger>
								<Button variant="outline" size="icon">
									<Info className="h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
								</Button>
							</DialogTrigger>
							<DialogContent className="max-w-3xl">
								<DialogHeader>
									<DialogTitle>
										<h2 className="pb-2 text-3xl font-semibold first:mt-0 min-w-max">
											Help me to develop this website 🥰
										</h2>
									</DialogTitle>
									<DialogDescription>
										<h4 className="text-xl font-semibold my-5">
											Do not hesitate to contact me on
											Discord at{" "}
											<span className="text-primary font-bold">
												Vipalisk
											</span>{" "}
											to discuss development and new
											functionalities.
										</h4>
									</DialogDescription>
									<DialogDescription className="text-5xl mx-auto">
										༼ つ ◕_◕ ༽つ
									</DialogDescription>
								</DialogHeader>
							</DialogContent>
						</Dialog>
						<ThemeToggle />
					</div>
				</div>
			</nav>
		</div>
	);
}
