import { keepPreviousData, useQuery } from "@tanstack/react-query";
import {
	getAllPublicBuilds,
	GetPublicBuildByBuildId
} from "../api/build-public";

export function usePublicBuilds() {
	return useQuery({
		queryKey: ["builds"],
		queryFn: async () => getAllPublicBuilds(),
		refetchOnWindowFocus: false,
		placeholderData: keepPreviousData
	});
}

export function useOnePublicBuild(build_id: any) {
	return useQuery({
		queryKey: ["onepublicbuild"],
		queryFn: () => GetPublicBuildByBuildId(build_id),
		refetchOnWindowFocus: false,
		placeholderData: keepPreviousData
	});
}
