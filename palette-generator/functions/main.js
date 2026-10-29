import * as task from "./tasks.js";
import process from "process";
import { rl } from "./data.js";
import * as style from "./style.js";

async function main() {
	style.bannerCLI();
	await task.createSVG();
	rl.close();
	process.exit();
}

await main();
