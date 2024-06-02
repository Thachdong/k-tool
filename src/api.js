const axios = require('axios');

async function postData(apiUrl, data, accessKey) {
    try {
        const response = await axios.post(apiUrl, data, {
            headers: { 'Authorization': `Bearer ${accessKey}` }
        });

        return response.data;
    } catch (error) {
        console.error('Error posting data:', error);
        
        throw error;
    }
}

module.exports = { postData };
