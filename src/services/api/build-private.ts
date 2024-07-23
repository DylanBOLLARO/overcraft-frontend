// import { axiosQuery, base_query_axios } from "@/src/services/networking";
// import { getConnectedUser } from "./user";
// import {
// 	GET_CONNECTED_USER_BUILDS,
// 	PUBLISH_CONNECTED_USER_BUILD
// } from "@/src/constants/api";
// import { MODULE_NESTJS } from "@/src/constants/enum";

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

// export const get_connected_user_builds = async () => {
// 	try {
// 		const { id: user_id } = await getConnectedUser();
// 		return await base_query_axios(
// 			GET_CONNECTED_USER_BUILDS,
// 			{ user_id },
// 			true
// 		);
// 	} catch (error) {
// 		console.error(JSON.stringify(error));
// 	}
// };

// export const GetPrivateBuildByBuildId = async (buildId: string) => {
// 	try {
// 		return await axiosQuery({
// 			url: `${MODULE_NESTJS.BUILD}/${buildId}`
// 		});
// 	} catch (error) {
// 		console.error(error);
// 	}
// };

// export const getUserProfileByConfig = async (config: string) => {
// 	try {
// 		return await axiosQuery({
// 			url: `${MODULE_NESTJS.USER}/config/${config}`
// 		});
// 	} catch (error) {
// 		console.error(error);
// 	}
// };
