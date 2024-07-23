"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { PAGE_PATH } from "../constants/enum";
import { getCookie } from "../services/cookie";
import { useConnectedUserContext } from "../app/layout";
import { getConnectedUser } from "../services/api";

interface ContainerProps {
	children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
	const { connectedUser, setConnectedUser } = useConnectedUserContext();
	const pathname = usePathname();
	const router = useRouter();

	useEffect(() => {
		(async () => {
			const access_token = await getCookie();

			if (pathname.includes("dashboard") && !access_token) {
				router.push(PAGE_PATH.SIGNIN);
			}

			if (!connectedUser) {
				if (access_token) {
					const user = await getConnectedUser();
					setConnectedUser(user);
				}
			}
		})();
	}, [pathname, connectedUser]);

	return children;
};

export default Container;
