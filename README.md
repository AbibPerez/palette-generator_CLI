<div id="main-title" align="center"> 
	<picture>
		<img src="./docs/public/images/logo_colors.svg" alt="Palette Generator Logo" width="120" height="120">
	</picture>

# Palette Generator CLI
**Generate color palettes and export them as SVG and PNG**

</div>

<div id="before-clone" align="left">

## ✨ Features
- HEX validation
- RGB conversion
- SVG export
- PNG export
- ANSI terminal preview

## 🖼️ Example 

<div id="example-image" align="center">
	<picture>
		<img src="./docs/public/images/blue-shades.png" style="border-radius: 5px;">
</div>

## 📦 Installation

```Shell
# Clone repository
git clone https://github.com/AbibPerez/project_portfolio.git

# Open cloned repository
cd project_portfolio

# Install dependencies
npm install
```

## 🚀 Usage
```Shell
# Run application
npm start
```

## 🗄️ Palette Schema
Each palette is stored as an array of color objects containing HEX and RGB values.

```JSON
{
	"blue-shades": [
		{
			"hex": "#309BFF",
			"rgb": {
				"r": 48,
				"g": 155,
				"b": 255
			}
		}
	]
}
```

## 📁 Output
After generation, the following files are created:

```Plaintext
Palette Generator/ 
├── purple-shades.svg
├── purple-shades.png 
├── blue-shades.svg 
└── blue-shades.png
```

By default, files are saved in the following paths, depending on the user's OS:

- **Windows**: **`C:\Users\%USERNAME%\Pictures\Palette Generator`**
- **Android**: **`/storage/emulated/0/DCIM/PaletteGenerator`**
- **Linux**: **`~/Pictures/Palette Generator`**

</div>