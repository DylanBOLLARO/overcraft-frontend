import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { env } from "@/env.mjs";
import { addSeconds, format, startOfDay } from "date-fns";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function formatDate(input: string | number): string {
	const date = new Date(input);
	return date.toLocaleDateString("en-US", {
		month: "long",
		day: "numeric",
		year: "numeric"
	});
}

export function absoluteUrlApi(path: string) {
	return `${env.NEXT_PUBLIC_BACKEND_URL}${path}`;
}

export const jsonFileDownload = (build: any) => {
	delete build.id;
	delete build.user_id;
	delete build.public;
	const resultArray = build.steps.map(
		({ id, build_id, ...rest }: any) => rest
	);
	build.steps = resultArray;
	const fileName = `${build.title}.json`;
	const data = new Blob([JSON.stringify(build)], {
		type: "text/json"
	});
	const jsonURL = window.URL.createObjectURL(data);
	const link = document.createElement("a");
	link.href = jsonURL;
	link.download = fileName;
	link.click();
	window.URL.revokeObjectURL(jsonURL);
};

export const jsonFileUpload = (e: any): Promise<any> => {
	return new Promise((resolve, reject) => {
		const fileReader = new FileReader();

		fileReader.onload = (event) => {
			try {
				const text = JSON.parse(event.target?.result as string);
				resolve(text);
			} catch (error) {
				reject(error);
			}
		};

		fileReader.readAsText(e.target.files[0], "UTF-8");
	});
};

// new

export function secondsToMinutesAndSeconds(seconds: number) {
	const date = addSeconds(startOfDay(new Date()), seconds);
	const formattedDate = format(date, "mm:ss");
	return formattedDate;
}

export function throttle(fn: any, delay: any) {
	let LastTime = 0;
	console.log("called Throttle immediatly");
	let id = 0;
	return (...args: any) => {
		const now = new Date().getTime();
		id++;
		if (now - LastTime < delay) return;
		LastTime = now;
		console.log(`evend id :${id}`);
		fn(...args);
	};
}

export function capitalize(string: string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}
