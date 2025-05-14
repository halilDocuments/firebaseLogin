const { getDefaultConfig } = require('@expo/metro-config');

const config = getDefaultConfig(__dirname);

// `.cjs` uzantılı dosyaları da tanıması için ekleme
config.resolver.sourceExts.push('cjs');

// Eğer bu satırı eklemen gerekirse, ama genelde gerekmez
config.resolver.unstable_enablePackageExports = false;

module.exports = config; // 🔥 Doğru olan bu!


