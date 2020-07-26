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
            '@views': './views',
            '@themes': './themes',
            '@components': './components',
            '@assets': './assets',
            '@constants': './constants',
            '@utils': './utils',
          },
        },
      ],
    ],
  };
}

module.exports = babel;
