const { scanDirectory, loadConfig } = require('../utils');
const { postData } = require('../api');
const fs = require('fs');
const path = require('path');

async function generate() {
    const configPath = path.resolve(process.cwd(), 'k-tool.json');

    let userConfig;
    try {
        userConfig = loadConfig(configPath);
    } catch (error) {
        console.error(error.message);

        process.exit(1);
    }

    const { directoriesToScan, fileExtensions, access_key, project_id, apiUrl } = userConfig;

    let files = [];
    directoriesToScan.forEach((dir) => {
        files = files.concat(scanDirectory(dir, fileExtensions));
    });

    console.log('Scanned files:', files);

    try {
        const responseData = await postData(apiUrl, { files, project_id }, access_key);

        console.log('API Response:', responseData);

        responseData.forEach(({ filePath, content }) => {
            if (fs.existsSync(filePath)) {
                fs.appendFileSync(filePath, content);
                
                console.log(`Appended content to ${filePath}`);
            } else {
                console.error(`File ${filePath} not found`);
            }
        });
    } catch (error) {
        console.error('Error:', error);
    }
}

module.exports = { generate };
