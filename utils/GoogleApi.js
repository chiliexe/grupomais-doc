const { Readable } = require('stream');
const { google } = require('googleapis');

async function uploadFile(fileName, folderId, contentFile, googleAuthFilePath){

   try {
        // create authentication
        const auth = new google.auth.GoogleAuth({
            // keyFile: "../google_api_credential.json",
            keyFile: googleAuthFilePath,
            scopes: ["https://www.googleapis.com/auth/drive"]
        });

        // create google drive service
        const driveService = google.drive({
            version: 'v3', auth: auth
        });

        // {name} = the file name will be saved
        // {parents} = the folder id 
        const fileMetaData = {
            'name': `${fileName}.docx`,
            'parents': [folderId]
        }

        const media =  {
            // fs.createReadStream -> needs the file path
            // body: fs.createReadStream(contentFile),
            // Readable.from -> needs a buffer
            body: Readable.from(contentFile),
        }


        const response = await driveService.files.create({
            resource: fileMetaData,
            media: media,
            fields: 'id'
        });

        return response.data.id;
   } catch (error) {
        console.log(error);
   }
}


module.exports = uploadFile;