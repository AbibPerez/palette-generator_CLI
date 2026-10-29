export function bannerCLI() {
	const wht = `\x1b[38;2;255;255;255m`;
	const stk = `\x1b[38;2;209;4;66m`;
	const rst = `\x1b[0m`;
	
	console.log(`${stk}┌───────────────────┐${rst}`);
	console.log(`${wht}  Palette Generator  ${rst}`);
	console.log(`${stk}└───────────────────┘${rst}\n\n`);
}

export function clearScreen() {
  process.stdout.write("\x1Bc");
}

export function hexColorCLI(r, g, b) {
	const luma = 
		0.299 * r +
		0.587 * g +
		0.114 * b;
		
	return luma > 128 ? "\x1b[30m" : "\x1b[97m";
}