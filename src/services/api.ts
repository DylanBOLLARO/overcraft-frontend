import {
	GET_ALL_PUBLICS_BUILDS,
	GET_ALL_STEPS_OF_BUILD_BY_BUILD_ID,
	GET_PUBLIC_BUILD_BY_ID
} from "../constants/api";
import { base_query_axios } from "../lib/networking";

export const get_all_publics_builds = async () => {
	try {
		return await base_query_axios(
			GET_ALL_PUBLICS_BUILDS,
			null,
			false,
			`/all`
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
		console.error(JSON.stringify(error));
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
