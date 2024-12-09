#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const projectName = process.argv[2];

if (!projectName) {
    console.error('Please provide a project name.');
    console.error('Example: npx node-starter my-project');
    process.exit(1);
}

const projectPath = path.resolve(process.cwd(), projectName);

fs.mkdirSync(projectPath, { recursive: true });


const copyFolderRecursiveSync = (source, destination) => {
    if (!fs.existsSync(destination)) {
        fs.mkdirSync(destination, { recursive: true });
    }

    const entries = fs.readdirSync(source, { withFileTypes: true });

    for (const entry of entries) {
        const sourcePath = path.join(source, entry.name);
        const destinationPath = path.join(destination, entry.name);

        if (entry.isDirectory()) {
            
            copyFolderRecursiveSync(sourcePath, destinationPath);
        } else {
            
            fs.copyFileSync(sourcePath, destinationPath);
        }
    }
};

const templateDir = path.join(__dirname, '../templates');
copyFolderRecursiveSync(templateDir, projectPath);

console.log(`Project ${projectName} created successfully!`);
console.log(`Navigate to ${projectName} and run "npm install" to get started.`);
