import { MODULE_NESTJS } from "../constants/enum";
import { axiosQuery } from "./networking";

//-------------------------
//---START--USER-----------
//-------------------------
export const getConnectedUser = async () => {
	try {
		const data = await axiosQuery({
			method: "POST",
			url: `${MODULE_NESTJS.AUTH}/get-connected-user-id`
		});
		if (!data)
			throw new Error(
				"No user returned by the API during connection; authentication not possible."
			);
		return data;
	} catch (error) {
		console.error(JSON.stringify(error));
		return undefined;
	}
};

export const getUserById = async (userId: number) => {
	if (!userId) return;
	try {
		return await axiosQuery({
			url: `${MODULE_NESTJS.USER}/${userId}`
		});
	} catch (error) {
		console.error(error);
	}
};

export const getUserByUsername = async (username: string) => {
	if (!username) return;
	try {
		return await axiosQuery({
			url: `${MODULE_NESTJS.USER}/username/${username}`
		});
	} catch (error) {
		console.error(error);
	}
};

//-------------------------
//-----END--USER-----------
//-------------------------

//-------------------------
//---START--BUILD----------
//-------------------------

// create build
export const createBuild = async (userId: any, buildMetadata: any) => {
	if (!userId && !buildMetadata) return;

	try {
		return await axiosQuery({
			method: "POST",
			url: `${MODULE_NESTJS.BUILD}`,
			data: { ...buildMetadata, user_id: "" + userId, slug: "" + userId }
		});
	} catch (error) {
		console.error(error);
	}
};

// fetch one build
export const getBuild = async (buildId: any) => {
	if (!buildId) return;
	try {
		return await axiosQuery({
			url: `${MODULE_NESTJS.BUILD}/${buildId}`
		});
	} catch (error) {
		console.error(error);
	}
};

// fetch all builds
export const getBuilds = async (params: any) => {
	try {
		return await axiosQuery({
			url: `${MODULE_NESTJS.BUILD}${params && `?${params}`}`
		});
	} catch (error) {
		console.error(error);
	}
};
//-------------------------
//-----END--BUILD----------
//-------------------------

//-------------------------
//---START--STEP-----------
//-------------------------

// create step
export const createStep = async (
	userId: any = 1,
	buildId: any = 14,
	content: string = "Ce build est tout simplement divin ! Les timmings sont parfaitement équilibrées, et le push est à la fois simple et raffiné. Je vais le refaire sans hésiter !"
) => {
	// if (!userId && !buildId && !content) return;
	try {
		return await axiosQuery({
			method: "POST",
			url: `${MODULE_NESTJS.COMMENT}`,
			data: {
				build_id: "" + buildId,
				user_id: "" + userId,
				content: "" + content
			}
		});
	} catch (error) {
		console.error(error);
	}
};

//-------------------------
//-----END--STEP-----------
//-------------------------
