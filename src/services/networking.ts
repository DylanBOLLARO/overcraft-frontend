"use server";

import axios from "axios";
import { getCookie } from "./cookie";
import { env } from "@/env.mjs";
import { absoluteUrlApi } from "./utils";

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
		console.error(JSON.stringify(error));
	}
};

interface RequestOptions {
	method?: string;
	url?: string;
	data?: any;
}

const createHeader = async () => {
	const headers = {
		"Content-Type": "application/json",
		Accept: "*/*",
		Authorization: `Bearer ${(await getCookie()) || ""}`
	};

	return { headers };
};

const createAxiosConfig = async (method: string, url: string, data: any) => {
	const config = {
		method,
		url: `${env.NEXT_PUBLIC_BACKEND_URL}${url}`,
		data
	};

	return {
		...config,
		...(await createHeader())
	};
};

export const axiosQuery = async (config: RequestOptions = {}) => {
	try {
		const {
			method = "GET",
			url = `${env.NEXT_PUBLIC_BACKEND_URL}/`,
			data = {}
		} = config;

		const axiosConfig = await createAxiosConfig(method, url, data);
		const { data: response } = await axios.request(axiosConfig);
		console.log("response from backend");
		console.log(JSON.stringify(response));
		return response;
	} catch (error: any) {
		console.error(error);
		throw new Error(error);
	}
};
