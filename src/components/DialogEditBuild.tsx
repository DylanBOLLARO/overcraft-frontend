import React, { useEffect, useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogTrigger
} from "./ui/dialog";
import { Button } from "./ui/button";
import { ClipboardEdit } from "lucide-react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from "./ui/select";
import { Switch } from "./ui/switch";
import { patch_build } from "../lib/networking";

export const DialogEditBuild = ({ selectedUserBuild }: any) => {
	const [open, setOpen] = useState(false);
	const [editedBuild, setEditedBuild] = useState(selectedUserBuild);
	const [isModified, setIsModified] = useState(false);

	const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newTitle = e.target.value;
		setEditedBuild((prevBuild: any) => ({ ...prevBuild, title: newTitle }));
		setIsModified(true);
	};

	const handleRaceChange = (e: any) => {
		setEditedBuild((prevBuild: any) => ({
			...prevBuild,
			race: e
		}));
		setIsModified(true);
	};

	const handleV_RaceChange = (e: any) => {
		setEditedBuild((prevBuild: any) => ({
			...prevBuild,
			v_race: e
		}));
		setIsModified(true);
	};

	const handleIsPublicChange = (e: any) => {
		setEditedBuild((prevBuild: any) => ({
			...prevBuild,
			is_public: e
		}));
		setIsModified(true);
	};

	const handleDescriptionChange = (
		e: React.ChangeEvent<HTMLTextAreaElement>
	) => {
		const newDescription = e.target.value;
		setEditedBuild((prevBuild: any) => ({
			...prevBuild,
			description: newDescription
		}));
		setIsModified(true);
	};

	const handleSaveChanges = async () => {
		const { id, title, description, race, is_public, v_race } = editedBuild;
		if (isModified) {
			await patch_build(id, {
				title,
				description,
				race,
				v_race,
				is_public
			});
		}
		setEditedBuild(selectedUserBuild);
		setOpen(false);
		setIsModified(false);
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant="outline" className="gap-2">
					<ClipboardEdit className="h-4 w-4" />
					Edit
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<div className="flex flex-col gap-3">
					<Label htmlFor="email">Title</Label>
					<Input
						type="email"
						id="email"
						defaultValue={selectedUserBuild.title}
						onChange={handleTitleChange}
					/>
				</div>

				<div className="flex flex-col gap-3">
					<Label htmlFor="description">Description</Label>
					<Textarea
						autoFocus={false}
						id="description"
						className="h-56"
						defaultValue={selectedUserBuild.description}
						onChange={handleDescriptionChange}
					/>
				</div>

				<div className="flex flex-row gap-3">
					<div className="flex flex-col gap-2 items-center flex-1">
						<p>Play race</p>
						<Select onValueChange={handleRaceChange}>
							<SelectTrigger className="flex-1">
								<SelectValue
									placeholder={selectedUserBuild.race}
								/>
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="ZERG">ZERG</SelectItem>
								<SelectItem value="TERRAN">TERRAN</SelectItem>
								<SelectItem value="PROTOSS">PROTOSS</SelectItem>
							</SelectContent>
						</Select>
					</div>

					<div className="flex flex-col flex-1 gap-2 items-center">
						<p>Opponent race</p>
						<Select onValueChange={handleV_RaceChange}>
							<SelectTrigger className="flex-1">
								<SelectValue
									placeholder={selectedUserBuild.v_race}
								/>
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="ZERG">ZERG</SelectItem>
								<SelectItem value="TERRAN">TERRAN</SelectItem>
								<SelectItem value="PROTOSS">PROTOSS</SelectItem>
							</SelectContent>
						</Select>
					</div>
				</div>
				<div className="flex gap-2 items-center px-1">
					<Switch
						id="public_build"
						onCheckedChange={handleIsPublicChange}
						defaultChecked={selectedUserBuild.is_public}
					/>
					<Label htmlFor="public_build">Public build</Label>
				</div>
				<DialogFooter>
					<Button type="submit" onClick={handleSaveChanges}>
						Save changes
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};
