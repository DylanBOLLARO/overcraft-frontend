import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from "./ui/dialog";
import { Button } from "./ui/button";
import { PlusCircle } from "lucide-react";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from "./ui/form";
import { Input } from "./ui/input";
import { publish_connected_user_build } from "../lib/networking";

const formSchema = z.object({
	name: z.string().min(2).max(50)
});

export const DialogCreateBuild = ({ local_refresh_builds }: any) => {
	const [open, setOpen] = React.useState(false);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: ""
		}
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		const { name: name_of_build } = values;
		await publish_connected_user_build({
			title: name_of_build,
			description: name_of_build,
			race: "ZERG",
			v_race: "TERRAN"
		});
		setOpen(false);
		local_refresh_builds();
		form.reset();
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant="outline" className="gap-2">
					<PlusCircle className="h-4 w-4" />
					Create
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="space-y-8"
					>
						<DialogHeader>
							<DialogTitle>
								Creation of a new build order
							</DialogTitle>
							<DialogDescription>
								Choose a name for your build order
							</DialogDescription>
						</DialogHeader>
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Name</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
									<FormDescription>
										This is the name of your public build
										order
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<DialogFooter>
							<Button type="submit">Submit</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};
