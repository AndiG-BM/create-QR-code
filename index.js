/* 
Simple Node based app to create a QR code for a given URL - via the command line.
Originally used the older inquirer package, but after investigation incorporated the slimmer @inquirer/prompts instead.
Used the ESM version instead of the older CJS.
*/

import { input } from "@inquirer/prompts";
import qr from "qr-image";
import fs from "node:fs";

// utilises the newer node inquirer
const answer = await input({ message: "What is the URL you want to create a QR code for?" });

// stating the required file format
var qr_png = qr.image(answer, { type: "png" });

// creates the qr png file with the prompted url
qr_png.pipe(fs.createWriteStream("qrcode.png"));

// just an added file to show the url used
fs.writeFile("urls.txt", answer, (err) => {
	if (err) throw err;
	console.log("The file has been saved!");
});

// reads the added file and reads to the console
fs.readFile("urls.txt", "utf-8", (err, data) => {
	if (err) throw err;
	console.log(data);
});
