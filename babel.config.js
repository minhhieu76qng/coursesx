function babel(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          alias: {
            '@navigation': './navigation',
            '@services': './services',
            '@screens': './screens',
            '@themes': './themes',
            '@components': './components',
          },
        },
      ],
    ],
  };
}

module.exports = babel;
