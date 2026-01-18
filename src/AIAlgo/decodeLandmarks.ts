import { softmax2, generateAnchors } from './retinafaceUtils';

type TensorMap = Record<string, any>;

const STRIDES = [
    { stride: 8, score: '451', land: '454' },
    { stride: 16, score: '474', land: '477' },
    { stride: 32, score: '497', land: '500' },
];

export function decodeLandmarks(
    outputs: TensorMap,
    inputSize = 640,
    scoreThreshold = 0.6
): number[][] | null {

    let bestScore = 0;
    let bestLandmarks: number[][] | null = null;

    for (const level of STRIDES) {
        const scores = outputs[level.score].data as Float32Array;
        const lands = outputs[level.land].data as Float32Array;

        const anchors = generateAnchors(level.stride, inputSize);
        const numAnchors = anchors.length;

        for (let i = 0; i < numAnchors; i++) {
            const score = softmax2(
                scores[i * 2],
                scores[i * 2 + 1]
            );

            if (score < scoreThreshold || score < bestScore) continue;

            const lm: number[][] = [];

            for (let p = 0; p < 5; p++) {
                const dx = lands[i * 10 + p * 2];
                const dy = lands[i * 10 + p * 2 + 1];

                const x = anchors[i][0] + dx * level.stride;
                const y = anchors[i][1] + dy * level.stride;

                lm.push([x, y]);
            }

            bestScore = score;
            bestLandmarks = lm;
        }
    }

    return bestLandmarks;
}
