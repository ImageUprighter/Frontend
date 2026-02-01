import { InferenceSession, Tensor } from 'onnxruntime-react-native';
// import { useImageSliderContext } from '../common/context/ImageSliderContext';
import { readImage } from './ReadFromFile';
import { imageToTensor } from './AIFunctions';
import { decodeLandmarks } from './decodeLandmarks';
import { Platform } from 'react-native';
// import { rotateImage } from '../ml/rotation';
import RNFS from 'react-native-fs';
import { getRotationAngle } from '../ml/rotation';

async function loadModel() {
    try {
        const modelPath = `${RNFS.DocumentDirectoryPath}/det_10g.onnx`;

        if (Platform.OS === 'android') {
            // העתקה מה-Assets הפנימיים של ה-APK לתיקיית המסמכים הנגישה
            await RNFS.copyFileAssets('det_10g.onnx', modelPath);
        }
        return await InferenceSession.create(modelPath);
    } catch (error) {
        console.error("Error loading model:", error);
        throw error;
    }
}

export const handleStartProcess = async (fetchImagesFromDirectoryCheck: () => Promise<void>, imagePaths: string[]) => {
    try {
        console.log("0");

        // 1. Load the model (The engine uses the phone's GPU/NPU)
        const session = await loadModel();
        console.log(session);

        if (!imagePaths) return;
        for (const file of imagePaths) {
            console.log("1");
            const bytes = await readImage(file);
            console.log("2");

            // 3. Prepare the image (the "det_size" 640x640 from your Python code)
            const tensor = imageToTensor(bytes, 640, 640)
            console.log("3");
            // 4. Run Inference (Replaces: face_app.get(img_rgb))
            const outputs = await session.run({
                'input.1': new Tensor('float32', tensor, [1, 3, 640, 640]),
            });
            console.log("4");


            const landmarks = decodeLandmarks(outputs);

            if (!landmarks) return null;
            console.log('Landmarks:', landmarks)
            // 5. Apply your Rotation Math (Translated to JS)
            const angle = getRotationAngle(landmarks);
            console.log('✌️angle --->', angle);
            // const resultURI = await rotateImage(file, landmarks);

            // 6. Save the new image using native modules
            // await saveProcessedImage(file, angle);
        }
    } catch (error) {
        console.error("Error in handleStartProcess:", error);
    }
};