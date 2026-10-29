export let attempts = 0;
export const maxAttempts = 5;

export function resetCounter() {
	attempts = 0;
}

export async function badInput(input) {
	attempts++;
	
	console.log(input);
	
	if (attempts != maxAttempts) {
		console.log("Please try again.");
	}
}

export async function existentName(input) {
	attempts++;
	
	console.log(`${input} already exists.`);
	
	if (attempts != maxAttempts) {
		 console.log("Please try again.");
	}
}

export async function attemptsExceeded() {
	console.log("[!] Maximum attempts exceeded.")
}