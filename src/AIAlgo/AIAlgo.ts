import { InferenceSession, Tensor } from 'onnxruntime-react-native';
import { useImageSliderContext } from '../common/context/ImageSliderContext';
import { readImage } from './ReadFromFile';
import { imageToTensor } from './AiFunctions';
import { decodeLandmarks } from './decodeLandmarks';
import { rotateImage } from '../ml/rotation';

export const handleStartProcess = async () => {
    const { fetchImagesFromDirectoryCheck, imagePaths } = useImageSliderContext();
    await fetchImagesFromDirectoryCheck();

    // 1. Load the model (The engine uses the phone's GPU/NPU)
    const session = await InferenceSession.create(
        require('./assets/models/det_10g.onnx')
    );
    if (!imagePaths) return;
    for (const file of imagePaths) {
        const bytes = await readImage(file);

        // 3. Prepare the image (the "det_size" 640x640 from your Python code)
        const tensor = imageToTensor(bytes, 640, 640)

        // 4. Run Inference (Replaces: face_app.get(img_rgb))
        // const outputs = await session.run({ input: inputTensor });
        const outputs = await session.run({
            'input.1': new Tensor('float32', tensor, [1, 3, 640, 640]),
        });

        const landmarks = decodeLandmarks(outputs);
        if (!landmarks) return null;

        // 5. Apply your Rotation Math (Translated to JS)
        // const angle = getRotationAngle(landmarks);
        const resultURI = await rotateImage(file, landmarks);

        // 6. Save the new image using native modules
        // await saveProcessedImage(file, angle);
    }
};
