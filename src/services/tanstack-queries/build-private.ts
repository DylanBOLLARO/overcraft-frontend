import { keepPreviousData, useQuery } from "@tanstack/react-query";
import {
	get_connected_user_builds,
	getAllPrivateBuildsOfUser,
	GetPrivateBuildByBuildId
} from "../api/build-private";

export function usePrivateBuildOfUser() {
	return useQuery({
		queryKey: ["usePrivateBuildOfUser"],
		queryFn: async () => getAllPrivateBuildsOfUser(),
		refetchOnWindowFocus: false,
		placeholderData: keepPreviousData
	});
}

export function useAllBuildsOfUser() {
	return useQuery({
		queryKey: ["onebuild"],
		queryFn: () => get_connected_user_builds(),
		refetchOnWindowFocus: false,
		placeholderData: keepPreviousData
	});
}

export function useOnePrivateBuild(build_id: any) {
	return useQuery({
		queryKey: ["GetPrivateBuildByBuildId"],
		queryFn: () => GetPrivateBuildByBuildId(build_id),
		refetchOnWindowFocus: false,
		placeholderData: keepPreviousData
	});
}
