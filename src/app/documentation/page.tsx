import React from "react";
import Image from "next/image";

const Page = () => {
	const isProd = process.env.NODE_ENV === "production";
	return (
		<div className="flex-1 flex flex-col gap-5 p-5">
			<h3 className="text-lg">{`1. Créez votre compte et connectez-vous`}</h3>
			<p className="text-muted-foreground text-sm">
				{`En haut à droite de l'écran se trouve un bouton
					"login", qui permet à la fois de se connecter et de créer un
					compte.`}
			</p>
			<h3 className="text-lg">{`2. Créez votre premier build`}</h3>
			<div className="flex flex-col gap-2">
				<p className="text-muted-foreground text-sm">
					{`Cliquez sur le bouton "create" et saisissez un nom pour
						votre build order, puis soumettez.`}
				</p>

				<Image
					src={`${isProd ? "/overcraft" : ""}/documentation/create_btn.png`}
					width={600}
					height={600}
					alt=""
					className="border"
				/>
			</div>
			<h3 className="text-lg">{`3. Sélectionnez votre build`}</h3>
			<div className="flex flex-col gap-2">
				<p className="text-muted-foreground text-sm">
					{`Cliquez sur le build pour le sélectionner et être
						redirigé vers la page de création.`}
				</p>
				<Image
					src={`${isProd ? "/overcraft" : ""}/documentation/select_build.png`}
					width={600}
					height={600}
					alt=""
					className="border"
				/>
			</div>
			<h3 className="text-lg">{`4. Créez vos propres étapes !`}</h3>
			<div className="flex flex-col gap-2">
				<p className="text-muted-foreground text-sm">
					{`1- Ajoutez la description`}
				</p>
				<p className="text-muted-foreground text-sm">
					{`2- Ajoutez une durée`}
				</p>
				<p className="text-muted-foreground text-sm">
					{`3- Ajoutez la population`}
				</p>
				<p className="text-muted-foreground text-sm">
					{`4- Cliquez sur "add"`}
				</p>
				<Image
					src={`${isProd ? "/overcraft" : ""}/documentation/create_step.png`}
					width={600}
					height={600}
					alt=""
					className="border"
				/>
			</div>
			<h3 className="text-lg">{`5. Partagez-le en cliquant sur le bouton "Export"`}</h3>
			<h3 className="text-lg">{`6. Importez un build order via le bouton "Import" sur la page des builds`}</h3>
		</div>
	);
};

export default Page;
