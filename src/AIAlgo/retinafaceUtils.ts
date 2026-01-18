export function softmax2(a: number, b: number) {
    const max = Math.max(a, b);
    const ea = Math.exp(a - max);
    const eb = Math.exp(b - max);
    return eb / (ea + eb); // probability of "face"
}

export function generateAnchors(
    stride: number,
    inputSize: number
) {
    const anchors: number[][] = [];
    const size = inputSize / stride;

    for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
            anchors.push([
                x * stride + stride / 2,
                y * stride + stride / 2
            ]);
        }
    }
    return anchors;
}
