import { UserNav } from "./user-nav";
import ThemeToggle from "./ThemeToggle/theme-toggle";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export default function Header() {
	return (
		<div className="supports-backdrop-blur:bg-background/60 fixed left-0 right-0 top-0 z-20 border-b bg-background/95 backdrop-blur">
			<nav className="flex h-14 px-4 items-center gap-2 relative">
				<h4 className="text-xl font-semibold tracking-wider opacity-75 ml-5">
					Overcraft
				</h4>

				<div className="flex items-center ml-auto gap-10">
					<div className="flex w-full max-w-sm items-center space-x-2">
						<Input type="email" placeholder="Email" />
						<Button type="submit" variant={"outline"}>
							Search
						</Button>
					</div>
					<div className="ml-10 flex items-center space-x-2">
						<UserNav />
						<ThemeToggle />
					</div>
				</div>
			</nav>
		</div>
	);
}
