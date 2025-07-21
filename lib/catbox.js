const fs = require('fs-extra');
const axios = require('axios');
const FormData = require('form-data');

async function uploadToCatbox(filePath) {
  if (!fs.existsSync(filePath)) throw new Error("File does not exist");

  try {
    const form = new FormData();
    form.append('reqtype', 'fileupload');
    form.append('userhash', '');
    form.append('fileToUpload', fs.createReadStream(filePath));

    const config = {
      method: 'POST',
      url: 'https://catbox.moe/user/api.php',
      headers: {
        ...form.getHeaders(),
      },
      data: form,
    };

    const res = await axios(config);
    return res.data.trim();
  } catch (err) {
    console.error('❌ Catbox upload failed:', err.message);
    throw new Error('Failed to upload to Catbox');
  }
}

module.exports = { uploadToCatbox };