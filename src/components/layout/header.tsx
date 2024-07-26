import { UserNav } from "./user-nav";
import ThemeToggle from "./ThemeToggle/theme-toggle";

export default function Header() {
	return (
		<div className="supports-backdrop-blur:bg-background/60 fixed left-0 right-0 top-0 z-20 border-b bg-background/95 backdrop-blur">
			<nav className="flex h-14 px-4 items-center gap-2">
				<div className="flex items-center gap-2 ml-auto">
					<UserNav />
					<ThemeToggle />
				</div>
			</nav>
		</div>
	);
}
