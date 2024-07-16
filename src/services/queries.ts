import { keepPreviousData, useQuery } from "@tanstack/react-query";
import {
	get_all_publics_builds,
	get_all_steps_build_by_build_id,
	get_public_build_by_id
} from "./api";

export function useBuilds() {
	return useQuery({
		queryKey: ["builds"],
		queryFn: () => get_all_publics_builds(),
		refetchOnWindowFocus: false
	});
}

export function useOneBuild(build_id: any) {
	return useQuery({
		queryKey: ["onebuild"],
		queryFn: () => get_public_build_by_id(build_id),
		refetchOnWindowFocus: false
	});
}

export function useSteps(build_id: any) {
	return useQuery({
		queryKey: ["builds"],
		queryFn: () => get_all_steps_build_by_build_id(build_id),
		refetchOnWindowFocus: false
	});
}
