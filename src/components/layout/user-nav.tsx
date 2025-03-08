// "use client";

// import {
// 	DropdownMenu,
// 	DropdownMenuContent,
// 	DropdownMenuGroup,
// 	DropdownMenuItem,
// 	DropdownMenuLabel,
// 	DropdownMenuSeparator,
// 	DropdownMenuTrigger
// } from "../ui/dropdown-menu";
// import { Button } from "../ui/button";
// import { usePathname, useRouter } from "next/navigation";
// import { useConnectedUserContext } from "./providers";
// import { PAGE_PATH } from "@/constants/enum";
// import { deleteCookie } from "@/lib/cookie";
// export function UserNav() {
// 	const { connectedUser, setConnectedUser } = useConnectedUserContext();
// 	const router = useRouter();
// 	const pathname = usePathname();

// 	if (connectedUser) {
// 		return (
// 			<DropdownMenu>
// 				<DropdownMenuTrigger asChild>
// 					<Button variant="outline" size="icon">
// 						{connectedUser?.username?.[0]}
// 					</Button>
// 				</DropdownMenuTrigger>
// 				<DropdownMenuContent className="w-56" align="end" forceMount>
// 					<DropdownMenuLabel className="font-normal">
// 						<div className="flex flex-col space-y-1">
// 							<p className="text-sm font-medium leading-none">
// 								{connectedUser?.username}
// 							</p>
// 							<p className="text-xs leading-none text-muted-foreground">
// 								{connectedUser?.email}
// 							</p>
// 						</div>
// 					</DropdownMenuLabel>
// 					<DropdownMenuSeparator />
// 					<DropdownMenuGroup>
// 						<DropdownMenuItem
// 							onClick={() => {
// 								router.push(
// 									`${PAGE_PATH.PROFILE}/${connectedUser.username.toLowerCase()}`
// 								);
// 							}}
// 						>
// 							Profile
// 						</DropdownMenuItem>

// 						<DropdownMenuItem>Settings</DropdownMenuItem>
// 					</DropdownMenuGroup>
// 					<DropdownMenuSeparator />
// 					<DropdownMenuItem
// 						onClick={() => {
// 							deleteCookie();
// 							setConnectedUser(undefined);
// 							if (pathname.includes("dashboard")) {
// 								router.push(PAGE_PATH.SIGNIN);
// 							}
// 						}}
// 					>
// 						Log out
// 					</DropdownMenuItem>
// 				</DropdownMenuContent>
// 			</DropdownMenu>
// 		);
// 	} else {
// 		return (
// 			<Button
// 				onClick={() => {
// 					router.push(PAGE_PATH.SIGNIN);
// 				}}
// 			>
// 				Login
// 			</Button>
// 		);
// 	}
// }
