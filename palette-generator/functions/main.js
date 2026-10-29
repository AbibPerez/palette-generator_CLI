import * as task from "./out_tasks.js";
import process from "process";
import { rl } from "./retrieve_data.js";
import * as style from "./cli_style.js";

async function main() {
	style.bannerCLI();
	await task.createSVG();
	rl.close();
	process.exit();
}

await main();