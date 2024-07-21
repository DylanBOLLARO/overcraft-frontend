import { MODULE_NESTJS } from "@/src/constants/enum";
import { axiosQuery } from "@/src/services/networking";

export const getNumberOfLikeOfUserByUserId = async (userId: number) => {
	try {
		return await axiosQuery({
			url: `${MODULE_NESTJS.LIKE}/number/${userId}`
		});
	} catch (error) {
		console.error(error);
	}
};
