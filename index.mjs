/* 
Simple Node based app to create a QR code for a given URL - via the command line.
Originally used the older inquirer package, but after investigation incorporated the slimmer @inquirer/prompts instead.
Used the ESM version instead of the older CJS.
*/

import { input } from "@inquirer/prompts";
import qr from "qr-image";
import fs from "node:fs";

async function generateQRCode(answer) {
	console.log(answer);

	return new Promise((resolve, reject) => {
		const qr_png = qr.image(answer, { type: "png" });

		qr_png
			.pipe(fs.createWriteStream("qrcode.png"))
			.on("finish", () => {
				fs.writeFile("urls.txt", answer, (err) => {
					if (err) {
						reject(err);
					} else {
						console.log("The file has been saved!");
						resolve();
					}
				});
			})
			.on("error", reject);
	});
}

// utilises the newer node inquirer
async function main() {
	// utilises the newer node inquirer
	const answer = await input({ message: "What is the URL you want to create a QR code for?" });

	await generateQRCode(answer);
}

main().catch(console.error);
export default generateQRCode;
