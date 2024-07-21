import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { get_all_steps_build_by_build_id } from "../api/step";

export function useSteps(build_id: any) {
	return useQuery({
		queryKey: ["builds"],
		queryFn: () => get_all_steps_build_by_build_id(build_id),
		refetchOnWindowFocus: false,
		placeholderData: keepPreviousData
	});
}
