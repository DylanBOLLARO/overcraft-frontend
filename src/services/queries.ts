import { keepPreviousData, useQuery } from "@tanstack/react-query";
import {
	get_all_steps_build_by_build_id,
	get_connected_user_builds,
	get_public_build_by_id,
	getAllPublicbuilds
} from "./api";

export function useBuilds() {
	return useQuery({
		queryKey: ["builds"],
		queryFn: async () => getAllPublicbuilds(),
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

export function useOneBuild(build_id: any) {
	return useQuery({
		queryKey: ["onebuild"],
		queryFn: () => get_public_build_by_id(build_id),
		refetchOnWindowFocus: false,
		placeholderData: keepPreviousData
	});
}

export function useSteps(build_id: any) {
	return useQuery({
		queryKey: ["builds"],
		queryFn: () => get_all_steps_build_by_build_id(build_id),
		refetchOnWindowFocus: false,
		placeholderData: keepPreviousData
	});
}
