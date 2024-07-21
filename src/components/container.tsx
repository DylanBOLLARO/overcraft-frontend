"use client";

import { useEffect } from "react";
import { useUserContext } from "../app/layout";
import { usePathname, useRouter } from "next/navigation";
import { PAGE_PATH } from "../constants/enum";
import { getCookie } from "../services/cookie";
import { getConnectedUser } from "../services/api/user";

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
			if (pathname.includes("dashboard") && !access_token) {
				router.push(PAGE_PATH.SIGNIN);
			}

			if (!user) {
				if (access_token) {
					const user = await getConnectedUser();
					setUser(user);
				}
			}
		})();
	}, [pathname, user]);

	return children;
};

export default Container;
