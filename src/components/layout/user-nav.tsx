"use client";

import { signOut, useSession } from "next-auth/react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { deleteCookie } from "@/src/services/cookie";
import { usePathname, useRouter } from "next/navigation";
import { PAGE_PATH } from "@/src/constants/enum";
import { useConnectedUserContext } from "./providers";
export function UserNav() {
	const { connectedUser, setConnectedUser } = useConnectedUserContext();
	const router = useRouter();
	const pathname = usePathname();

	if (connectedUser) {
		return (
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="outline" size="icon">
						{connectedUser?.username?.[0]}
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent className="w-56" align="end" forceMount>
					<DropdownMenuLabel className="font-normal">
						<div className="flex flex-col space-y-1">
							<p className="text-sm font-medium leading-none">
								{connectedUser?.username}
							</p>
							<p className="text-xs leading-none text-muted-foreground">
								{connectedUser?.email}
							</p>
						</div>
					</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuGroup>
						<DropdownMenuItem
							onClick={() => {
								router.push(
									`${PAGE_PATH.PROFILE}/${connectedUser.username.toLowerCase()}`
								);
							}}
						>
							Profile
						</DropdownMenuItem>

						<DropdownMenuItem>Settings</DropdownMenuItem>
					</DropdownMenuGroup>
					<DropdownMenuSeparator />
					<DropdownMenuItem
						onClick={() => {
							deleteCookie();
							setConnectedUser(undefined);
							if (pathname.includes("dashboard")) {
								router.push(PAGE_PATH.SIGNIN);
							}
						}}
					>
						Log out
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		);
	} else {
		return (
			<Button
				onClick={() => {
					router.push(PAGE_PATH.SIGNIN);
				}}
			>
				Login
			</Button>
		);
	}
}
