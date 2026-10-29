export function hexValue(value) {
	value = value.trim();
  const regExp = /^#?[A-Fa-f0-9]{6}$/;
  
  if (!regExp.test(value)) {
    return false;
  }
  
  return(
    value.startsWith("#") // False
    ? value.toUpperCase()
    :`#${value.toUpperCase()}`
  );
}

export function objectName(value) {
  const name = value
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^A-Za-z0-9-]+/g, "")
    
    // Collapse multiple consecutives hyphens into one
    .replace(/-+/g, "-")
    
    // Remove leading and trailing hyphens
    .replace(/^-+|-+$/g, "")
    .toLowerCase();

  return name || "palette";
}
