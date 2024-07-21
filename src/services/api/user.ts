import { GET_CONNECTED_USER } from "@/src/constants/api";
import { base_query_axios } from "@/src/services/networking";

export const getConnectedUser = async () => {
	try {
		const data = await base_query_axios(GET_CONNECTED_USER, null, true);
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

export const getNameOfUserByUserId = async (UserId: number) => {
	try {
		const data = await base_query_axios(GET_CONNECTED_USER, null, true);
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
