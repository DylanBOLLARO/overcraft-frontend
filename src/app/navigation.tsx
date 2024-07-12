"use client";

import Link from "next/link";

import { marketingConfig } from "@/src/config/navigation";
import { cn } from "@/src/lib/utils";
import { Button, buttonVariants } from "@/src/components/ui/button";
import { ModeToggle } from "@/src/components/mode-toggle";

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
} from "../components/ui/alert-dialog";
import { pagePath } from "../constants/enum";
import { MainNav } from "../components/main-nav";
import { useRouter } from "next/navigation";
import { deleteCookie } from "../lib/networking";

export default function NavigationBar({ userId }: any) {
	const router = useRouter();

	return (
		<div className="flex flex-col mb-2">
			<header className="px-10 z-40 bg-background  border-b-[1px] border-muted-foreground/20">
				<div className="flex h-10 items-center justify-between py-4">
					<MainNav items={marketingConfig.mainNav} />
					<div className="flex flex-row gap-3 items-center">
						<ModeToggle />
						{userId ? (
							<AlertDialog>
								<AlertDialogTrigger asChild>
									<Button variant="outline" size={"xsm"}>
										logout
									</Button>
								</AlertDialogTrigger>
								<AlertDialogContent>
									<AlertDialogHeader>
										<AlertDialogTitle>
											Are you absolutely sure you want to
											log out?
										</AlertDialogTitle>
										<AlertDialogDescription>
											Logging out will disconnect you from
											your account, and your data will
											remain on our servers.
										</AlertDialogDescription>
									</AlertDialogHeader>
									<AlertDialogFooter>
										<AlertDialogCancel>
											Cancel
										</AlertDialogCancel>
										<AlertDialogAction
											onClick={async () => {
												await deleteCookie();
												router.push(pagePath.SIGNIN);
											}}
										>
											Continue
										</AlertDialogAction>
									</AlertDialogFooter>
								</AlertDialogContent>
							</AlertDialog>
						) : (
							<Link
								href={pagePath.SIGNIN}
								className={cn(
									buttonVariants({
										variant: "secondary",
										size: "xsm"
									})
								)}
							>
								Login
							</Link>
						)}
					</div>
				</div>
			</header>
		</div>
	);
}
