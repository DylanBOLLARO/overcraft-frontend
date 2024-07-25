import { keepPreviousData, useQuery } from "@tanstack/react-query";
import {
	getBuild,
	getBuildOfUser,
	getBuilds,
	getBuildsOfUser,
	getSteps,
	getUserById,
	getUserByUsername
} from "./api";

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
export function useBuilds() {
	return useQuery({
		queryKey: ["useBuilds"],
		queryFn: async () => getBuilds(),
		refetchOnWindowFocus: false,
		placeholderData: keepPreviousData
	});
}

// fetch one build of user
export function useBuildOfUser(userId: any, buildId: any) {
	return useQuery({
		queryKey: ["useBuildOfUser"],
		queryFn: () => getBuildOfUser(userId, buildId),
		refetchOnWindowFocus: false,
		placeholderData: keepPreviousData,
		enabled: !!userId && !!buildId
	});
}

// fetch all builds of user
export function useBuildsOfUser(userId: any) {
	return useQuery({
		queryKey: ["useBuildsOfUser"],
		queryFn: async () => getBuildsOfUser(userId),
		refetchOnWindowFocus: false,
		placeholderData: keepPreviousData,
		enabled: !!userId
	});
}

//-------------------------
//-----END--BUILD---------
//-------------------------

//-------------------------
//---START--STEP---------
//-------------------------

// fetch one build
export function useSteps(buildId: any) {
	return useQuery({
		queryKey: ["useSteps"],
		queryFn: () => getSteps(buildId),
		refetchOnWindowFocus: false,
		placeholderData: keepPreviousData,
		enabled: !!buildId
	});
}

//-------------------------
//-----END--STEP---------
//-------------------------
