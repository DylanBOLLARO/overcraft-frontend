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

function Header() {
	return (
		<div className="flex flex-col gap-4 py-4">
			<header className="sticky top-0 z-30 flex items-center gap-4 h-auto bg-transparent px-6">
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
				<div className="relative ml-auto flex-1 md:grow-0">
					<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
					<Input
						type="search"
						placeholder="Search..."
						className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
					/>
				</div>
				<Button disabled>Login</Button>
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
