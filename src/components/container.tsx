"use client";

import { useEffect } from "react";
import { useUserContext } from "../app/layout";
import { get_connected_user_id, getCookie } from "../lib/networking";
import { usePathname, useRouter } from "next/navigation";
import { pagePath } from "../constants/enum";

interface ContainerProps {
	children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
	const { user, setUser } = useUserContext();
	const pathname = usePathname();
	const router = useRouter();

	useEffect(() => {
		(async () => {
			const access_token = await getCookie();
			if (pathname.includes(pagePath.DASHBOARD) && !access_token) {
				router.push(pagePath.SIGNIN);
			}

			if (!user) {
				if (access_token) {
					const user = await get_connected_user_id();
					setUser(user);
				}
			}
		})();
	}, [pathname, user]);

	return children;
};

export default Container;
