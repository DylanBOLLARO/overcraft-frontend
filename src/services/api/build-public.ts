import { MODULE_NESTJS } from "@/src/constants/enum";
import { axiosQuery } from "@/src/services/networking";

export const getAllPublicBuilds = async () => {
	try {
		return await axiosQuery({
			url: `${MODULE_NESTJS.BUILD}`
		});
	} catch (error) {
		console.error(error);
	}
};

export const getAllPublicBuildsOfUserByUserId = async (userId: number) => {
	try {
		return await axiosQuery({
			url: `${MODULE_NESTJS.BUILD}/all/${userId}`
		});
	} catch (error) {
		console.error(error);
	}
};

export const GetPublicBuildByBuildId = async (buildId: string) => {
	try {
		return await axiosQuery({
			url: `${MODULE_NESTJS.BUILD}/${buildId}`
		});
	} catch (error) {
		console.error(error);
	}
};
