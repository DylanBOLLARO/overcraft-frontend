"use client";

import {
	CircleUserRound,
	Home,
	LineChart,
	Package,
	Package2,
	PanelLeft,
	Search,
	ShoppingCart,
	Users2
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "../components/ui/sheet";
import { Button } from "../components/ui/button";
import Link from "next/link";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator
} from "../components/ui/breadcrumb";
import { Input } from "../components/ui/input";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from "../components/ui/dropdown-menu";
import Image from "next/image";
import { useContext } from "react";
import { useUserContext } from "../app/layout";
import { deleteCookie } from "../lib/networking";
import { pagePath } from "../constants/enum";
import { usePathname, useRouter } from "next/navigation";
import { capitalize } from "../lib/utils";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger
} from "./ui/alert-dialog";

function Header() {
	const router = useRouter();
	const { user, setUser } = useUserContext();
	const pathname = usePathname();

	return (
		<div className="flex flex-col gap-4">
			<header className="flex items-center gap-4 h-auto bg-transparent px-6">
				{/* <Breadcrumb className="hidden md:flex">
					<BreadcrumbList>
						<BreadcrumbItem>
							<BreadcrumbLink asChild>
								<Link href="#">Dashboard</Link>
							</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator />
						<BreadcrumbItem>
							<BreadcrumbLink asChild>
								<Link href="#">Products</Link>
							</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator />
						<BreadcrumbItem>
							<BreadcrumbPage>All Products</BreadcrumbPage>
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb> */}
				{user && (
					<h4 className="scroll-m-20 text-xl font-semibold tracking-tight text-primary-foreground">
						Welcome,{" "}
						<span className="font-bold">
							{capitalize(user.username)}
						</span>
					</h4>
				)}

				<div className="relative ml-auto flex-1 md:grow-0">
					{(pathname === "/" || pathname === "/dashboard/builds") && (
						<>
							<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
							<Input
								disabled
								type="search"
								placeholder="Search..."
								className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
							/>
						</>
					)}
				</div>
				{user ? (
					<AlertDialog>
						<AlertDialogTrigger asChild>
							<Button variant="outline">Logout</Button>
						</AlertDialogTrigger>
						<AlertDialogContent>
							<AlertDialogHeader>
								<AlertDialogTitle>
									Are you absolutely sure?
								</AlertDialogTitle>
								<AlertDialogDescription>
									This action cannot be undone. This will
									permanently delete your account and remove
									your data from our servers.
								</AlertDialogDescription>
							</AlertDialogHeader>
							<AlertDialogFooter>
								<AlertDialogCancel>Cancel</AlertDialogCancel>
								<AlertDialogAction
									onClick={() => {
										deleteCookie();
										setUser(undefined);
									}}
								>
									Continue
								</AlertDialogAction>
							</AlertDialogFooter>
						</AlertDialogContent>
					</AlertDialog>
				) : (
					<Button
						onClick={() => {
							router.push(pagePath.SIGNIN);
						}}
					>
						Login
					</Button>

					// <Button
					// 	onClick={() => {
					// 		router.push(pagePath.SIGNIN);
					// 	}}
					// >
					// 	Login
					// </Button>
				)}
				{/* TODO: implémentation d'un btn login, sinon picture with dropdown menu */}
				{/* <DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button
							variant="outline"
							size="icon"
							className="overflow-hidden rounded-full"
						>
							<Image
								src="/placeholder-user.jpg"
								width={36}
								height={36}
								alt="Avatar"
								className="overflow-hidden rounded-full"
							/>
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuLabel>My Account</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuItem>Settings</DropdownMenuItem>
						<DropdownMenuItem>Support</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem>Logout</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu> */}
			</header>
		</div>
	);
}
export default Header;
