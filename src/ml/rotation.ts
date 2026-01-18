import ImageResizer from 'react-native-image-resizer';
import { Skia, TileMode, ImageFormat, BlurStyle } from "@shopify/react-native-skia";
import RNFS from 'react-native-fs';

export function getRotationAngle(landmarks: number[][]): number {
    const [eyeR, eyeL, nose, mouthR, mouthL] = landmarks;

    const dx = eyeL[0] - eyeR[0];
    const dy = eyeL[1] - eyeR[1];
    const angle = Math.atan2(dy, dx) * 180 / Math.PI;

    const eyeY = (eyeR[1] + eyeL[1]) / 2;
    const mouthY = (mouthR[1] + mouthL[1]) / 2;

    if (Math.abs(angle) < 45) {
        return eyeY < mouthY && eyeY < nose[1] ? 0 : 180;
    } else if (angle >= 45 && angle <= 135) {
        return -90;
    } else if (angle <= -45 && angle >= -135) {
        return 90;
    }
    return 180;
}


export async function rotateImage(
    uri: string,
    landmarks: number[][]
): Promise<string> {
    const angle = await getRotationAngle(landmarks);

    if (angle === 0) return uri;

    const result = await ImageResizer.createResizedImage(
        uri,
        0,     // keep size
        0,
        'JPEG',
        100,
        angle
    );

    return result.uri;
}


const composeImageGPU = async (
    imagePath: string,
    savePath: string,
    target: { width: number; height: number },
    angle: number
) => {
    const { width: tW, height: tH } = target;

    // 1. Fix 'fromBufferedFile' -> Use fromFile or fromURI
    const data = await Skia.Data.fromURI(imagePath);
    const image = Skia.Image.MakeImageFromEncoded(data);

    // 2. Fix 'image is possibly null' error
    if (!image) {
        throw new Error('Could not decode image from path');
    }

    // 3. Fix 'MakeRasterN32Premul' -> Use Skia.Surface.Make
    const surface = Skia.Surface.Make(tW, tH);
    if (!surface) {
        throw new Error('Could not create Skia surface');
    }
    const canvas = surface.getCanvas();

    canvas.save();
    canvas.translate(tW / 2, tH / 2);
    canvas.rotate(angle, 0, 0);
    canvas.translate(-tW / 2, -tH / 2);

    // 4. Fix 'BlurStyle.Normal' -> Use TileMode
    // MakeBlur(sigmaX, sigmaY, tileMode, inputFilter)
    const paintBlur = Skia.Paint();
    paintBlur.setImageFilter(
        Skia.ImageFilter.MakeBlur(10, 10, TileMode.Clamp, null)
    );

    const scaleBG = Math.max(tW / image.width(), tH / image.height());
    canvas.drawImageRect(
        image,
        Skia.XYWHRect(0, 0, image.width(), image.height()),
        Skia.XYWHRect(
            (tW - image.width() * scaleBG) / 2,
            (tH - image.height() * scaleBG) / 2,
            image.width() * scaleBG,
            image.height() * scaleBG
        ),
        paintBlur
    );

    // Foreground: CONTAIN
    const scaleFG = Math.min(tW / image.width(), tH / image.height());
    canvas.drawImageRect(
        image,
        Skia.XYWHRect(0, 0, image.width(), image.height()),
        Skia.XYWHRect(
            (tW - image.width() * scaleFG) / 2,
            (tH - image.height() * scaleFG) / 2,
            image.width() * scaleFG,
            image.height() * scaleFG
        ),
        Skia.Paint()
    );

    canvas.restore();

    // 5. Fix 'ImageFormat' missing on 'Skia' -> Import directly
    const snapshot = surface.makeImageSnapshot();
    // 1. Use encodeToBytes instead of encodeToData
    // Direct conversion to base64 string
    const base64 = snapshot.encodeToBase64(ImageFormat.JPEG, 90);

    if (base64) {
        await RNFS.writeFile(savePath, base64, 'base64');
    }
};
