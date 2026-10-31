import * as task from "./tasks.js";
import process from "process";
import { rl } from "./data.js";
import * as style from "./style.js";
import { execSync } from "node:child_process";

function hasInkscape() {
	try {
		execSync("inkscape --version", { stdio: "ignore" });
		return true;
	} catch {
		return false;
	}
}

function validateDependencies() {
	if (process.platform === "android") {
		
		if (!hasInkscape()) {
			console.error(`
				Inkscape is required for PNG export on Android
				
				Install it with:
				
				pkg install -y inkscape
			`);
		}
	}
}

async function main() {
	validateDependencies();
	
	style.bannerCLI();
	await task.createSVG();
	
	rl.close();
	process.exit();
}

await main();
