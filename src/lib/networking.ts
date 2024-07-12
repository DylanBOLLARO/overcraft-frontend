"use server";

import axios from "axios";
import { cookies } from "next/headers";
import { absoluteUrlApi } from "./utils";
import {
	ADD_STEP_OF_BUILD,
	DELETE_BUILD,
	DELETE_STEP_IN_BUILD_STEPS,
	GET_ALL_PUBLICS_BUILDS,
	GET_ALL_STEPS_OF_BUILD_BY_BUILD_ID,
	GET_CONNECTED_USER_BUILDS,
	GET_CONNECTED_USER_ID,
	GET_PUBLIC_BUILD_BY_ID,
	MOVE_STEP_IN_BUILD_STEPS,
	PATCH_BUILD,
	PUBLISH_CONNECTED_USER_BUILD,
	SIGNIN,
	SIGNUP
} from "../constants/api";
import { COOKIE_NAME } from "../constants/variable";

export async function create_cookie(value: any) {
	cookies().set({
		name: COOKIE_NAME,
		value,
		httpOnly: true,
		path: "/"
	});
}

export async function getCookie() {
	return cookies().get(COOKIE_NAME)?.value;
}

export async function deleteCookie() {
	cookies().delete(COOKIE_NAME);
}

export const base_query_axios = async (
	api: any,
	postParams: any = null,
	useJwt: boolean = false,
	path: string = ""
) => {
	const { url, method, form } = api;
	let objPostParams = { ...form, ...postParams };
	let jwt;
	try {
		if (useJwt) {
			jwt = await getCookie();
			if (!jwt) throw new Error("No JWT in the request header.");
		}
		const options = {
			method,
			url: absoluteUrlApi(url + path),
			headers: {
				Authorization: `Bearer ${jwt ?? ""}`,
				"Content-Type": "application/json",
				Accept: "*/*"
			},
			data: objPostParams
		};
		const { data }: any = await axios.request(options);
		if (!data) throw new Error("Invalid response to the request.");
		return data;
	} catch (error: any) {
		console.log(JSON.stringify(error));
	}
};

export const signin = async (values: any) => {
	try {
		const tokens = await base_query_axios(SIGNIN, values);
		if (!tokens)
			throw new Error(
				"No tokens returned by the API during connection; authentication not possible."
			);
		await create_cookie(tokens.access_token);
		return tokens;
	} catch (error) {
		console.log(JSON.stringify(error));
	}
};

export const signup = async (values: any) => {
	try {
		const tokens = await base_query_axios(SIGNUP, values);
		if (!tokens)
			throw new Error(
				"No tokens returned by the API during connection; authentication not possible."
			);
		return tokens;
	} catch (error) {
		console.log(JSON.stringify(error));
	}
};

export const get_connected_user_id = async () => {
	try {
		const data = await base_query_axios(GET_CONNECTED_USER_ID, null, true);
		if (!data)
			throw new Error(
				"No user ID returned by the API during connection; authentication not possible."
			);
		const { sub: user_id } = data;
		return user_id;
	} catch (error) {
		console.log(JSON.stringify(error));
		return undefined;
	}
};

export const get_connected_user_builds = async () => {
	try {
		const user_id = await get_connected_user_id();
		return await base_query_axios(
			GET_CONNECTED_USER_BUILDS,
			{ user_id },
			true
		);
	} catch (error) {
		console.log(JSON.stringify(error));
	}
};

export const publish_connected_user_build = async (build_metadata: any) => {
	try {
		const user_id = await get_connected_user_id();
		return await base_query_axios(
			PUBLISH_CONNECTED_USER_BUILD,
			{
				...build_metadata,
				user_id: "" + user_id
			},
			true
		);
	} catch (error) {
		console.log(JSON.stringify(error));
	}
};

export const add_step_build = async (build: any) => {
	try {
		await base_query_axios(ADD_STEP_OF_BUILD, build, true);
	} catch (error) {
		console.log(JSON.stringify(error));
	}
};

export const get_all_step_build_by_build_id = async (build_id: number) => {
	try {
		return await base_query_axios(
			GET_ALL_STEPS_OF_BUILD_BY_BUILD_ID,
			null,
			false,
			`/${build_id}`
		);
	} catch (error) {
		console.log(JSON.stringify(error));
	}
};

export const delete_build_by_build_id = async (id: number) => {
	try {
		await base_query_axios(DELETE_BUILD, null, true, `/${id}`);
	} catch (error) {
		console.log(JSON.stringify(error));
	}
};

export const move_step_in_build_steps = async (data: any) => {
	try {
		await base_query_axios(MOVE_STEP_IN_BUILD_STEPS, data, true);
	} catch (error) {
		console.log(JSON.stringify(error));
	}
};

export const delete_step_in_build_steps = async (id: number) => {
	try {
		await base_query_axios(
			DELETE_STEP_IN_BUILD_STEPS,
			null,
			true,
			`/${id}`
		);
	} catch (error) {
		console.log(JSON.stringify(error));
	}
};

export const import_build = async (e: any) => {
	try {
		const { steps, ...build } = JSON.parse(e);
		const { id: build_id } = await publish_connected_user_build(build);
		steps.map(async (step: any, index: number) => {
			const { description, timer, population } = step;
			await add_step_build({
				description,
				build_id: "" + build_id,
				position: "" + index + 1,
				timer: "" + timer,
				population: "" + population
			});
		});
	} catch (error) {
		console.log(JSON.stringify(error));
	}
};

export const patch_build = async (build_id: number, build_metadata: any) => {
	const { title, description, race, v_race, is_public } = build_metadata;
	try {
		const user_id = await get_connected_user_id();
		return await base_query_axios(
			PATCH_BUILD,
			{
				...{
					title: "" + title,
					description: "" + description,
					race: "" + race,
					v_race: "" + v_race,
					is_public: "" + is_public
				},
				user_id: "" + user_id
			},
			true,
			`/${build_id}`
		);
	} catch (error) {
		console.log(JSON.stringify(error));
	}
};

export const get_all_publics_builds = async () => {
	try {
		return await base_query_axios(
			GET_ALL_PUBLICS_BUILDS,
			null,
			false,
			`/all`
		);
	} catch (error) {
		console.log(JSON.stringify(error));
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
		console.log(JSON.stringify(error));
	}
};
