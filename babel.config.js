module.exports = function(api) {
  api.cache(true);

  const plugins = [
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-syntax-dynamic-import',
  ];

  const presets = [
    [
      '@babel/preset-env',
      {
        modules: false,
        useBuiltIns: 'entry',
        corejs: 3,
      },
    ],
    '@babel/preset-react',
  ];

  if (process.env.NODE_ENV === 'production') {
    plugins.push('@babel/plugin-transform-react-constant-elements');
    plugins.push('@babel/plugin-transform-react-inline-elements');
    plugins.push('universal-import');
  }

  if (process.env.NODE_ENV === 'development') {
    plugins.push('react-hot-loader/babel');
    plugins.push(['universal-import', { includeFileName: true }]);
  }

  return {
    presets,
    plugins,
  };
};
