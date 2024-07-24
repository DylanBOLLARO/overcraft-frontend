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

// export const publish_connected_user_build = async (build_metadata: any) => {
// 	try {
// 		const { id: user_id } = await getConnectedUser();
// 		return await base_query_axios(
// 			PUBLISH_CONNECTED_USER_BUILD,
// 			{
// 				...build_metadata,
// 				user_id: "" + user_id,
// 				slug: "" + user_id
// 			},
// 			true
// 		);
// 	} catch (error) {
// 		console.error(error);
// 	}
// };

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
export const getBuilds = async () => {
	try {
		return await axiosQuery({
			url: `${MODULE_NESTJS.BUILD}`
		});
	} catch (error) {
		console.error(error);
	}
};

// fetch one build of user
export const getBuildOfUser = async (userId: any, buildId: any) => {
	if (!userId && !buildId) return;
	try {
		return await axiosQuery({
			url: `${MODULE_NESTJS.USER}/${userId}${MODULE_NESTJS.BUILD}/${buildId}`
		});
	} catch (error) {
		console.error(error);
	}
};

// fetch all builds of user
export const getBuildsOfUser = async (userId: any) => {
	if (!userId) return;
	try {
		return await axiosQuery({
			url: `${MODULE_NESTJS.USER}/${userId}${MODULE_NESTJS.BUILD}`
		});
	} catch (error) {
		console.error(error);
	}
};

//-------------------------
//-----END--BUILD----------
//-------------------------

//-------------------------
//-----START--PROFILE------
//-------------------------

export const getUserProfileByUsername = async (username: string) => {
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
//-----END--PROFILE--------
//-------------------------

//-------------------------
//-----START---LIKE--------
//-------------------------

export const getNumberOfLikeOfUserByUserId = async (userId: any) => {
	if (!userId) return;
	try {
		return await axiosQuery({
			url: `${MODULE_NESTJS.LIKE}/number/${userId}`
		});
	} catch (error) {
		console.error(error);
	}
};

//-------------------------
//-----END---LIKE----------
//-------------------------

//-------------------------
//---START--STEP---------
//-------------------------

// fetch all steps of build
export const getSteps = async (buildId: any) => {
	if (!buildId) return;
	try {
		return await axiosQuery({
			url: `${MODULE_NESTJS.STEP}/${buildId}`
		});
	} catch (error) {
		console.error(error);
	}
};

//-------------------------
//-----END--STEP---------
//-------------------------
