import { UserNav } from "./user-nav";
import ThemeToggle from "./ThemeToggle/theme-toggle";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { PAGE_PATH } from "../../constants/enum";

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
						<ThemeToggle />
					</div>
				</div>
			</nav>
		</div>
	);
}
