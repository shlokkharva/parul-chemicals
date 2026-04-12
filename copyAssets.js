const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'photos');
const destDir = path.join(__dirname, 'nextapp', 'public');
const heroDir = path.join(destDir, 'hero');

function copyFolderSync(from, to) {
    if (!fs.existsSync(to)) fs.mkdirSync(to, { recursive: true });
    
    if (!fs.existsSync(from)) {
        console.log(`Source folder ${from} not found.`);
        return;
    }

    fs.readdirSync(from).forEach(element => {
        const srcPath = path.join(from, element);
        
        let destPath = path.join(to, element);
        // Map background*.webp to hero/background*.webp
        if (element.startsWith('background') && element.endsWith('.webp')) {
            if (!fs.existsSync(heroDir)) fs.mkdirSync(heroDir, { recursive: true });
            destPath = path.join(heroDir, element);
        }

        if (fs.lstatSync(srcPath).isFile()) {
            fs.copyFileSync(srcPath, destPath);
            console.log(`Copied ${element} to ${destPath}`);
        } else if (fs.lstatSync(srcPath).isDirectory()) {
            copyFolderSync(srcPath, destPath);
        }
    });
}

console.log('Migrating assets to Next.js public directory...');
copyFolderSync(srcDir, destDir);
console.log('Assets migrated successfully!');
