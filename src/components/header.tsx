// "use client";

// import { Search, User } from "lucide-react";
// import { Button } from "../components/ui/button";
// import { Input } from "../components/ui/input";
// import {
// 	DropdownMenu,
// 	DropdownMenuContent,
// 	DropdownMenuItem,
// 	DropdownMenuLabel,
// 	DropdownMenuSeparator,
// 	DropdownMenuTrigger
// } from "../components/ui/dropdown-menu";
// import { PAGE_PATH } from "../constants/enum";
// import { usePathname, useRouter } from "next/navigation";
// import { capitalize } from "../lib/utils";
// import { deleteCookie } from "../lib/cookie";
// import { useConnectedUserContext } from "./layout/providers";

// function Header() {
// 	const router = useRouter();
// 	const { connectedUser, setConnectedUser } = useConnectedUserContext();
// 	const pathname = usePathname();

// 	return (
// 		<div className="flex flex-col gap-4">
// 			<header className="flex items-center gap-4 h-auto bg-transparent px-4">
// 				{connectedUser && (
// 					<h4 className="scroll-m-20 text-xl font-semibold tracking-tight text-primary-foreground">
// 						Welcome,{" "}
// 						<span className="font-bold">
// 							{capitalize(connectedUser.username)}
// 						</span>
// 					</h4>
// 				)}

// 				<div className="relative ml-auto flex-1 md:grow-0">
// 					{(pathname === "/" || pathname === "/dashboard/builds") && (
// 						<>
// 							<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
// 							<Input
// 								disabled
// 								type="search"
// 								placeholder="Search..."
// 								className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
// 							/>
// 						</>
// 					)}
// 				</div>

// 				{connectedUser ? (
// 					<DropdownMenu>
// 						<DropdownMenuTrigger asChild>
// 							<Button
// 								variant="outline"
// 								size="icon"
// 								className="overflow-hidden rounded-full"
// 							>
// 								<User />
// 							</Button>
// 						</DropdownMenuTrigger>
// 						<DropdownMenuContent align="end">
// 							<DropdownMenuLabel className="text-muted-foreground">
// 								{connectedUser.email}
// 							</DropdownMenuLabel>
// 							<DropdownMenuSeparator />
// 							<DropdownMenuItem
// 								onClick={() => {
// 									router.push(
// 										`${PAGE_PATH.PROFILE}/${connectedUser.username.toLowerCase()}`
// 									);
// 								}}
// 							>
// 								Profile
// 							</DropdownMenuItem>
// 							<DropdownMenuSeparator />
// 							<DropdownMenuItem
// 								onClick={() => {
// 									deleteCookie();
// 									setConnectedUser(undefined);
// 									if (pathname.includes("dashboard")) {
// 										router.push(PAGE_PATH.SIGNIN);
// 									}
// 								}}
// 							>
// 								Logout
// 							</DropdownMenuItem>
// 						</DropdownMenuContent>
// 					</DropdownMenu>
// 				) : (
// 					<Button
// 						onClick={() => {
// 							router.push(PAGE_PATH.SIGNIN);
// 						}}
// 					>
// 						Login
// 					</Button>
// 				)}
// 			</header>
// 		</div>
// 	);
// }
// export default Header;
