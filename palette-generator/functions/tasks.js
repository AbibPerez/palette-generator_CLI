import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import sharp from "sharp";
import { execSync } from "node:child_process";
import * as style from "./style.js";
import * as data from "./data.js";

function pad(input) {
	return String(input).padStart(3, "0");
}

function exportFromInkscape(svgFile, pngPath) {
	execSync(
		`inkscape --export-type=png "${svgFile}" -o "${pngPath}"`,
		{ stdio: "inherit" }
	);
	
	console.log(`PNG created at ${pngPath}`);
}

async function exportFromSharp(content, output, name) {
	await sharp(Buffer.from(content))
	.png()
	.toFile(path.join(output, `${name}.png`));
	console.log(`PNG created at ${output}/${name}.png`);
}

export function getOutputFolder() {
	switch (process.platform) {
		
		case "win32":
			return path.join(
				os.homedir(),
				"Pictures",
				"Palette Generator"
			);
			
		case "android": // Termux
			return "/storage/emulated/0/DCIM/PaletteGenerator"

		default:
			return "./output";
	}
}

export async function createSVG() {
	const { name, obj } = await data.writeObject();
	
	let x = 170;
	
	let svgContent = `
	<svg
		width="1920"
		height="1080"
		xmlns="http://www.w3.org/2000/svg"
	>

	<rect
		x="0"
		y="0"
		width="1920"
		height="1080"
		fill="#0A1A2A"
	/>

	<style>
		@font-face { 
        font-family: "JetBrainsMono";
        font-style: normal;
        src: url("./fonts/JetBrainsMono-Regular.woff2") format("woff2");
      }
      
      text {
        font-family: "JetBrainsMono", "Consolas", "Fira Code", "Source Code Pro", "Roboto Mono", monospace;
      }
      
	</style>
	
	<rect
		x="5"
		y="5"
		width="1910"
		height="1070"
		fill="none"
		stroke="#369DFF"
		stroke-width="5"
		rx="12"
	/>
	
	<text
		x="960"
		y="100"
		font-size="72"
		text-anchor="middle"
		fill="#369DFF"
	>
	${name}
	</text>
	
	<text
		x="960"
		y="140"
		font-size="24"
		text-anchor="middle"
		fill="#2881D4"
	>
	${obj.length} colors • Generated automatically
	
	</text>
	
	`
	
	let counter = 1;
	console.log("Palette preview: ");
	for (const color of obj) {
		const {
			hex,
			rgb: { r, g, b }
		} = color;
		
		svgContent += `
		
			<rect
				x="${x}"
				y="160"
				width="300"
				height="750"
				fill="${hex}"
				stroke="#5B758F"
				stroke-width="2"
				rx="20"
				ry="20"
			/>
			
			<text
				x="${x + 150}"
				y="970"
				text-anchor="middle"
				font-size="48"
				fill="#FFFFFF"
				>
			${hex}
			</text>
			
			
			<text
				x="${x + 150}"
				y="1000"
				font-size="28"
				text-anchor="middle"
				fill="#B3B3B3"
				>
				${pad(r)} ${pad(g)} ${pad(b)}
				</text>
				
				`
				x+= 320;
				
				const bg = `\x1b[48;2;${r};${g};${b}m`;
				const fg = style.hexColorCLI(r, g, b);
				
				// style.clearScreen();
				
		console.log(`${bg}${fg}${counter}.- ${hex} (${pad(r)}, ${pad(g)}, ${pad(b)}) \x1b[0m`);
		counter += 1;
	}
	
	svgContent += `
	</svg>
	`
	
	const output = getOutputFolder();

	if (!fs.existsSync(output)) {
	fs.mkdirSync(output, { recursive: true });
	}
	
	
	fs.writeFileSync(path.join(output, `${name}.svg`), svgContent);
	console.log(`SVG created at ${output}/${name}.svg.`);
	
	if (process.platform != "android") {
		await exportFromSharp(svgContent, output, name);
	} else {
		const svgPath = path.join(output, `${name}.svg`);
		const pngPath = path.join(output, `${name}.png`);
		exportFromInkscape(svgPath, pngPath);
	}
}
