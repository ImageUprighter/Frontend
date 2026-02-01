const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

const config = {
    resolver: {
        assetExts: [...defaultConfig.resolver.assetExts, 'onnx'], // הוספת onnx כאן
    },
};

module.exports = mergeConfig(defaultConfig, config);
