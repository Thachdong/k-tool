const fs = require('fs');
const path = require('path');

function scanDirectory(directory, extensions) {
    let results = [];

    const list = fs.readdirSync(directory);

    list.forEach((file) => {
        const filePath = path.join(directory, file);

        const stat = fs.statSync(filePath);
        if (stat && stat.isDirectory()) {
            results = results.concat(scanDirectory(filePath, extensions));
        } else if (extensions.includes(path.extname(file))) {
            results.push(filePath);
        }
    });

    return results;
}

function loadConfig(configPath) {
    if (fs.existsSync(configPath)) {
        const configFile = fs.readFileSync(configPath);
        
        return JSON.parse(configFile);
    }
    throw new Error(`Config file ${configPath} not found`);
}

module.exports = { scanDirectory, loadConfig };
