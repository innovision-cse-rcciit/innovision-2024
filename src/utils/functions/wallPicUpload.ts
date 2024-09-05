"use server";
import { google, drive_v3 } from 'googleapis';
import path from 'path';
import { Readable } from 'stream';
import { CONTENT_TYPES } from '../constants/wall-events';


async function findOrCreateFolder(folderName: string, drive: any): Promise<string> {
    try {
        const response = await drive.files.list({
            q: `mimeType='application/vnd.google-apps.folder' and name='${folderName}' and trashed=false`,
            fields: 'files(id, name)',
            spaces: 'drive',
        });

        const folders = response.data.files;

        if (folders && folders.length > 0) {
            return folders[0].id!;
        }

        const fileMetadata = {
            name: folderName,
            mimeType: 'application/vnd.google-apps.folder',
        };

        const createResponse = await drive.files.create({
            resource: fileMetadata,
            fields: 'id',
        });

        return createResponse.data.id!;
    } catch (error) {
        throw new Error(`Failed to find or create folder: ${error}`);
    }
}

export const uploadToGoogleDrive = async (file: any, folderName: string) => {
    if (folderName === "") return;
    const keyFilePath = path.join(process.cwd(), 'apikey.json');
    // console.log('Key File Path: ', keyFilePath);
    const auth = new google.auth.GoogleAuth({
        keyFile: keyFilePath,
        scopes: ['https://www.googleapis.com/auth/drive'],
    });
    // console.log('Auth Instance: ', auth);
    const drive = google.drive({ version: 'v3', auth });
    // console.log('Drive Instance: ', drive);
    console.log(file, folderName);
    try {
        const fileBuffer = await file.arrayBuffer();
        const fileStream = Readable.from(Buffer.from(fileBuffer));

        // const folderId = await findOrCreateFolder(folderName, drive);
        const folderId = [CONTENT_TYPES[folderName]];
        const fileMetadata: drive_v3.Schema$File = {
            name: file.name,
            parents: folderId,
        };

        const media = {
            mimeType: file.type,
            body: fileStream,
        };
        console.log('File metadata:', fileMetadata);
        const response = await drive.files.create({
            resource: fileMetadata,
            media: media,
            fields: 'id',
        });
        console.log('Response:', response);

        const fileId = response.data.id;
        console.log(`File uploaded with ID: ${fileId}`);
        return fileId;
    } catch (error) {
        console.error('Error uploading file:', error);
        throw new Error('Failed to upload file');
    }
}
