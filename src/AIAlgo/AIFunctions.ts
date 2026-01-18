import { Image } from 'react-native';

export function imageToTensor(
    pixels: Uint8Array, width: number,  height: number
) {
    const input = new Float32Array(1 * 3 * width * height);

    let offset = 0;

    for (let i = 0; i < pixels.length; i += 3) {
        input[offset++] = pixels[i] / 255;     // R
        input[offset++] = pixels[i + 1] / 255; // G
        input[offset++] = pixels[i + 2] / 255; // B
    }

    return input;
}
