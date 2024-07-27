import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getBuild, getBuilds, getUserById, getUserByUsername } from "./api";

//-------------------------
//---START--USER-----------
//-------------------------

// fetch one user
export function useUser(input: any) {
	const selectFunction = (input: any) => {
		if (typeof input === "number") return getUserById(input);
		if (typeof input === "string") return getUserByUsername(input);
	};

	return useQuery({
		queryKey: ["useBuild"],
		queryFn: () => selectFunction(input),
		refetchOnWindowFocus: false,
		placeholderData: keepPreviousData,
		enabled: !!input
	});
}

//-------------------------
//-----END--USER-----------
//-------------------------

//-------------------------
//---START--BUILD---------
//-------------------------

// fetch one build
export function useBuild(buildId: any) {
	return useQuery({
		queryKey: ["useBuild"],
		queryFn: () => getBuild(buildId),
		refetchOnWindowFocus: false,
		placeholderData: keepPreviousData,
		enabled: !!buildId
	});
}

// fetch all builds
export function useBuilds(params: any) {
	return useQuery({
		queryKey: ["useBuilds", params || 0],
		queryFn: async () => getBuilds(params),
		refetchOnWindowFocus: false,
		placeholderData: keepPreviousData
	});
}

//-------------------------
//-----END--BUILD---------
//-------------------------
