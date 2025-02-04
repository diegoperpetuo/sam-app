const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

config.resolver.assetExts.push('db'); // Adicione extensões de arquivo personalizadas, se necessário

module.exports = config;