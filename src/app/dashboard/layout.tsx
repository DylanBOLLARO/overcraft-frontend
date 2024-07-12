"use client";

import React, { useEffect, useState } from "react";
import { get_connected_user_id } from "../../lib/networking";
import { pagePath } from "@/src/constants/enum";
import { usePathname, useRouter } from "next/navigation";

export default function DashboardLayout({
	children
}: {
	children: React.ReactNode;
}) {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(true);
	const pathname = usePathname();

	useEffect(() => {
		(async () => {
			const user_id = await get_connected_user_id();
			if (!user_id) {
				router.push(pagePath.SIGNIN);
				return;
			}
			setIsLoading(false);
		})();
	}, [pathname]);

	return isLoading ? null : <main className="flex-1">{children}</main>;
}
