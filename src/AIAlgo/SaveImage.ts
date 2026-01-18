import RNFS from 'react-native-fs';

// const FOLDER_NAME = 'ImageUprighter';

// const ANDROID_DIR = `${RNFS.PicturesDirectoryPath}/${FOLDER_NAME}`;

async function ensureAndroidFolder(ANDROID_DIR: string) {
    const exists = await RNFS.exists(ANDROID_DIR);
    if (!exists) {
        await RNFS.mkdir(ANDROID_DIR);
    }
}

async function saveImage(base64: string, filename: string, ANDROID_DIR: string) {
    await ensureAndroidFolder(ANDROID_DIR);

    const path = `${ANDROID_DIR}/${filename}`;

    await RNFS.writeFile(path, base64, 'base64');

    // Make it visible in Gallery
    await RNFS.scanFile(path);

    return `file://${path}`;
}
