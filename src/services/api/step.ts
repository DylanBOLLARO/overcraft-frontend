import { GET_ALL_STEPS_OF_BUILD_BY_BUILD_ID } from "@/src/constants/api";
import { base_query_axios } from "@/src/services/networking";

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
