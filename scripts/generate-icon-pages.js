import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const iconsDir = path.join(__dirname, '..', 'Icons');

// Function to get all PNG files in a directory and its subdirectories
function getAllPNGFiles(dir, baseDir = dir) {
  let results = [];
  const list = fs.readdirSync(dir);

  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat && stat.isDirectory()) {
      results = results.concat(getAllPNGFiles(filePath, baseDir));
    } else if (file.endsWith('.png')) {
      const relativePath = path.relative(baseDir, filePath);
      results.push(relativePath);
    }
  });

  return results;
}

// Function to get PNG files only in the specified directory (not subdirectories)
function getPNGFilesInDir(dir) {
  const list = fs.readdirSync(dir);
  return list.filter(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    return !stat.isDirectory() && file.endsWith('.png');
  });
}

// Function to get subdirectories
function getSubdirectories(dir) {
  const list = fs.readdirSync(dir);
  return list.filter(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    return stat.isDirectory();
  });
}

// Function to format folder name for display
function formatFolderName(name) {
  return name.replace(/([A-Z])/g, ' $1').trim();
}

// Function to create HTML page
function createHTMLPage(title, images, folderStructure = null) {
  let sectionsHTML = '';

  if (folderStructure) {
    // Create sections for each subfolder
    for (const [folderName, folderImages] of Object.entries(folderStructure)) {
      if (folderImages.length > 0) {
        sectionsHTML += `
		<h2>${formatFolderName(folderName)}</h2>
		<div class="icon-grid">
${folderImages.map(img => `			<div class="icon-card">
				<div class="icon-container">
					<img src="${img}" alt="${path.basename(img, '.png')}" loading="lazy" />
				</div>
				<div class="icon-name">${path.basename(img, '.png')}</div>
			</div>`).join('\n')}
		</div>
`;
      }
    }
  } else {
    // Single section with all images
    sectionsHTML = `
		<div class="icon-grid">
${images.map(img => `			<div class="icon-card">
				<div class="icon-container">
					<img src="${img}" alt="${path.basename(img, '.png')}" loading="lazy" />
				</div>
				<div class="icon-name">${path.basename(img, '.png')}</div>
			</div>`).join('\n')}
		</div>
`;
  }

	return `<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="UTF-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<title>${title} - EVE Icons Gallery</title>
	<style>
		body {
			font-family: Arial, sans-serif;
			padding: 20px;
			background: #1a1a1a;
			color: #fff;
			line-height: 1.6;
		}

		.container {
			max-width: 1400px;
			margin: 0 auto;
		}

		.header {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 30px;
			border-bottom: 2px solid #4a9eff;
			padding-bottom: 15px;
		}

		h1 {
			color: #4a9eff;
			margin: 0;
		}

		h2 {
			color: #6db3ff;
			margin-top: 40px;
			margin-bottom: 20px;
			font-size: 24px;
		}

		.back-link {
			color: #4a9eff;
			text-decoration: none;
			padding: 8px 16px;
			background: #2a2a2a;
			border-radius: 4px;
			transition: background-color 0.2s;
		}

		.back-link:hover {
			background: #3a3a3a;
		}

		.icon-grid {
			display: grid;
			grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
			gap: 20px;
			margin-bottom: 40px;
		}

		.icon-card {
			background: #2a2a2a;
			padding: 15px;
			border-radius: 8px;
			text-align: center;
			transition: transform 0.2s, background-color 0.2s;
		}

		.icon-card:hover {
			background: #3a3a3a;
			transform: translateY(-2px);
		}

		.icon-container {
			display: flex;
			align-items: center;
			justify-content: center;
			height: 100px;
			margin-bottom: 10px;
		}

		.icon-container img {
			max-width: 100%;
			max-height: 100px;
			object-fit: contain;
		}

		.icon-name {
			font-size: 12px;
			color: #aaa;
			word-break: break-word;
		}

		.stats {
			background: #2a2a2a;
			padding: 15px 20px;
			border-radius: 8px;
			margin-bottom: 30px;
			color: #aaa;
		}

		.stats .count {
			color: #4a9eff;
			font-weight: bold;
		}
	</style>
</head>

<body>
	<div class="container">
		<div class="header">
			<h1>${title}</h1>
			<a href="index.html" class="back-link">← Back to Index</a>
		</div>

		<div class="stats">
			<p>Showing <span class="count">${images.length}</span> icon${images.length !== 1 ? 's' : ''}</p>
		</div>

${sectionsHTML}
	</div>
</body>

</html>`;
}

// Ensure output directory exists
const outputDir = path.join(__dirname, '..', 'examples');
fs.mkdirSync(outputDir, { recursive: true });

// Copy color-adjuster.html into examples/ if it exists
const colorAdjusterSrc = path.join(__dirname, '..', 'color-adjuster.html');
const colorAdjusterDest = path.join(outputDir, 'color-adjuster.html');
try {
	if (fs.existsSync(colorAdjusterSrc)) {
		fs.copyFileSync(colorAdjusterSrc, colorAdjusterDest);
		console.log('Copied color-adjuster.html into examples/');
	}
} catch (err) {
	console.warn('Could not copy color-adjuster.html:', err.message);
}
// Post-process the copied color-adjuster to fix icon paths and add back button
try {
	if (fs.existsSync(colorAdjusterDest)) {
		let ca = fs.readFileSync(colorAdjusterDest, 'utf8');
		// Fix relative paths: change "Icons/..." to "../Icons/..."
		ca = ca.replace(/Icons\//g, '../Icons/');
		// Inject header markup (consistent with other generated pages)
		const headerHtml = `\n\t\t<div class="header">\n\t\t\t<h1>Color Adjuster</h1>\n\t\t\t<a href="index.html" class="back-link">← Back to Index</a>\n\t\t</div>`;
		ca = ca.replace('<div class="container">', '<div class="container">' + headerHtml);
		// Inject header/back-link CSS into the <style> block if not present
		if (!/\.header\s*\{/.test(ca)) {
			const headerCss = `\n\t\t.header {\n\t\t\tdisplay: flex;\n\t\t\tjustify-content: space-between;\n\t\t\talign-items: center;\n\t\t\tmargin-bottom: 30px;\n\t\t\tborder-bottom: 2px solid #4a9eff;\n\t\t\tpadding-bottom: 15px;\n\t\t}\n\n\t\t.back-link {\n\t\t\tcolor: #4a9eff;\n\t\t\ttext-decoration: none;\n\t\t\tpadding: 8px 16px;\n\t\t\tbackground: #2a2a2a;\n\t\t\tborder-radius: 4px;\n\t\t\ttransition: background-color 0.2s;\n\t\t}\n\n\t\t.back-link:hover {\n\t\t\tbackground: #3a3a3a;\n\t\t}\n`;
			ca = ca.replace('<style>', '<style>' + headerCss);
		}
		fs.writeFileSync(colorAdjusterDest, ca, 'utf8');
		console.log('Patched examples/color-adjuster.html paths and added back button');
	}
} catch (err) {
	console.warn('Could not post-process color-adjuster.html:', err.message);
}

// Copy index.html into examples/ and adjust links so they point locally
const indexSrc = path.join(__dirname, '..', 'index.html');
const indexDest = path.join(outputDir, 'index.html');
try {
	if (fs.existsSync(indexSrc)) {
		let indexContent = fs.readFileSync(indexSrc, 'utf8');
		// Remove examples/ prefix from links pointing to generated pages
		indexContent = indexContent.replace(/href="examples\//g, 'href="');
		fs.writeFileSync(indexDest, indexContent, 'utf8');
		console.log('Copied adjusted index.html into examples/');
	}
} catch (err) {
	console.warn('Could not copy index.html:', err.message);
}

// Generate all-icons.html
console.log('Generating all-icons.html...');
const allIcons = getAllPNGFiles(iconsDir).map(img => path.join('..', 'Icons', img).replace(/\\/g, '/'));
fs.writeFileSync(
	path.join(outputDir, 'all-icons.html'),
	createHTMLPage('All Icons', allIcons)
);
console.log(`Created examples/all-icons.html with ${allIcons.length} icons`);

// Get all main folders
const mainFolders = getSubdirectories(iconsDir);

// Generate page for each main folder
mainFolders.forEach(folder => {
  const folderPath = path.join(iconsDir, folder);
  const subfoldersInThisFolder = getSubdirectories(folderPath);
  
  // Get images directly in this folder
	const imagesInRoot = getPNGFilesInDir(folderPath).map(img => 
		path.join('..', 'Icons', folder, img).replace(/\\/g, '/')
	);
  
  if (subfoldersInThisFolder.length > 0) {
    // If there are subfolders, create sections
    const folderStructure = {};
    
    // Add root images as "Main" section if any exist
    if (imagesInRoot.length > 0) {
      folderStructure['Main'] = imagesInRoot;
    }
    
    // Add each subfolder as a section
    subfoldersInThisFolder.forEach(subfolder => {
      const subfolderPath = path.join(folderPath, subfolder);
			const subfolderImages = getPNGFilesInDir(subfolderPath).map(img =>
				path.join('..', 'Icons', folder, subfolder, img).replace(/\\/g, '/')
			);
      if (subfolderImages.length > 0) {
        folderStructure[subfolder] = subfolderImages;
      }
    });
    
    const allImagesInFolder = [];
    for (const imgs of Object.values(folderStructure)) {
      allImagesInFolder.push(...imgs);
    }
    
    const fileName = `icons-${folder.toLowerCase().replace(/([A-Z])/g, '-$1').replace(/^-/, '')}.html`;
		fs.writeFileSync(
			path.join(outputDir, fileName),
			createHTMLPage(formatFolderName(folder), allImagesInFolder, folderStructure)
		);
		console.log(`Created examples/${fileName} with ${allImagesInFolder.length} icons in ${Object.keys(folderStructure).length} section(s)`);
  } else {
    // No subfolders, just list all images
    const fileName = `icons-${folder.toLowerCase().replace(/([A-Z])/g, '-$1').replace(/^-/, '')}.html`;
		fs.writeFileSync(
			path.join(outputDir, fileName),
			createHTMLPage(formatFolderName(folder), imagesInRoot)
		);
		console.log(`Created examples/${fileName} with ${imagesInRoot.length} icons`);
  }
});

console.log('\nAll pages generated successfully!');
