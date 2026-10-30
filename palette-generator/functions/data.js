import fs from "node:fs";
import readline from "readline";
import process from "process";
import * as validate from "./validation.js";
import * as handle from "./exceptions.js";
import * as style from "./style.js";

export const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function rqst(question) {
  return new Promise((resolve) => rl.question(question, resolve));
}

export async function getHexPalette() {
  let colors = [];
  let i = 1;

	
	const bg = [
		`\x1b[48;2;141;166;240m`,
		`\x1b[48;2;129;152;219m`,
		`\x1b[48;2;117;138;199m`,
		`\x1b[48;2;105;124;179m`,
		`\x1b[48;2;93;109;158m`
	]
	
	const fg = [
		style.hexColorCLI(141, 166, 240),
		style.hexColorCLI(129, 152, 219),
		style.hexColorCLI(117, 138, 199),
		style.hexColorCLI(105, 124, 179),
		style.hexColorCLI(93, 109, 158)
	]

  while (handle.attempts < handle.maxAttempts) {
    if (i < 6) {
      const color = await rqst(`${bg[i - 1]}${fg[i - 1]}Color #${i} (HEX):\x1b[0m `);
      const hex = validate.hexValue(color);

      if (!hex) {
        await handle.badInput("Invalid input");
        continue;
      }

      i++;
      colors.push(hex);

      if (i === 6) {
        handle.resetCounter();
        return colors;
      }
    }
  }
  console.log("[!] Maximum attempts exceeded.");
  process.exit();
}

export async function getRGBPalette() {
  // const hexArray = await getHexPalette();
  /* Pre-defined palette */
  const hexArray = ["#D1CFFF", "#ACAAD2", "#8E8CAD", "#6D6B85", "#4B4A5C"]; 
  let rgbArray = [];

  for (const h of hexArray) {
		
    const value = h.replace("#", "");

    const hex = h;
    const r = parseInt(value.substring(0, 2), 16);
    const g = parseInt(value.substring(2, 4), 16);
    const b = parseInt(value.substring(4, 6), 16);
		
    rgbArray.push({
      hex: hex,
      rgb: { r, g, b },
    });
  }

  return rgbArray;
}

export async function writeObject() {
	const green = `\x1b[48;2;56;255;106m`;
  const path = "./palettes.json";

  /* Create JSON file on the first execution
	so the rest of the workflow can assume it exists */
  if (!fs.existsSync(path)) {
    fs.writeFileSync(path, "{}");
    console.log(`New file created. Working in ${green}\x1b[38;2;0;0;0m${path}\x1b[0m\n`);
  }

  const read = fs.readFileSync(path, "utf-8");
  const data = JSON.parse(read);
	const bg = `\x1b[48;2;177;196;254m`;
	const fg = style.hexColorCLI(177, 196, 254);

  /* Reuse the same attempts counter
	used by the input handlers. */
  handle.resetCounter();

  while (handle.attempts < handle.maxAttempts) {
    const n = await rqst(`${bg}${fg}Palette's name:\x1b[0m `);
    const name = validate.objectName(n);

    /* Palette names are used as JSON keys,
  	therefore they must be unique */
    if (Object.hasOwn(data, name)) {
      handle.existentName(name);
      continue;
    } else {
      /* Only ask for colors after a valid an unique 
  	  palette name has been choosen */
      const obj = await getRGBPalette();
      data[name] = obj;

      fs.writeFileSync(path, JSON.stringify(data, null, 2));
			style.clearScreen();
      console.log(`\x1b[38;2;205;204;219mObject succesfully written in \x1b[38;2;0;0;0m${green}${path}\x1b[0m\n\n`);
      return { name, obj };
    }
  }
  handle.attemptsExceeded();
}
