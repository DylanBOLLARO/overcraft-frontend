import {
	GET_ALL_STEPS_OF_BUILD_BY_BUILD_ID,
	GET_CONNECTED_USER_BUILDS,
	GET_PUBLIC_BUILD_BY_ID
} from "../constants/api";
import { MODULE_NESTJS } from "../constants/enum";
import { axiosQuery, base_query_axios } from "../lib/networking";
import { getConnectedUser } from "../lib/user";

export const get_connected_user_builds = async () => {
	try {
		const { id: user_id } = await getConnectedUser();
		return await base_query_axios(
			GET_CONNECTED_USER_BUILDS,
			{ user_id },
			true
		);
	} catch (error) {
		console.error(JSON.stringify(error));
	}
};

export const get_public_build_by_id = async (id: number) => {
	try {
		return await base_query_axios(
			GET_PUBLIC_BUILD_BY_ID,
			null,
			false,
			`/${id}`
		);
	} catch (error) {
		console.error(error);
	}
};

export const get_all_steps_build_by_build_id = async (build_id: any) => {
	try {
		return await base_query_axios(
			GET_ALL_STEPS_OF_BUILD_BY_BUILD_ID,
			null,
			false,
			`/${build_id}`
		);
	} catch (error) {
		console.error(JSON.stringify(error));
	}
};

// OVERCRAFT V2:
export const getUserProfileByConfig = async (config: string) => {
	try {
		return await axiosQuery({
			url: `${MODULE_NESTJS.USER}/config/${config}`
		});
	} catch (error) {
		console.error(error);
	}
};

export const getAllPublicbuilds = async () => {
	try {
		return await axiosQuery({
			url: `${MODULE_NESTJS.BUILD}/all`
		});
	} catch (error) {
		console.error(error);
	}
};
