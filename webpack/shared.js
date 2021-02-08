const path = require('path');
const res = (p) => path.resolve(__dirname, p);

const injectGlobalSassHelperToScssFiles = (content, loaderContext) => {
  const { resourcePath, rootContext } = loaderContext;
  const relativePath = path.relative(rootContext, resourcePath);
  const relativePaths = relativePath.split('/');
  const fileName = relativePaths[relativePaths.length - 1];

  if (!fileName.includes('_')) {
    return `@use "${res(
      '../src/client/shared/styles/_globals.scss'
    )}" as *;${content}`;
  } else {
    return content;
  }
};

const ALIAS = {
  '@client': path.resolve(__dirname, '..', 'src', 'client'),
  '@server': path.resolve(__dirname, '..', 'src', 'server'),
  '@rc-lib-client': '@lvlsgroup/react-component-lib/src/client',
  '@rc-lib-server': '@lvlsgroup/react-component-lib/src/server',
  'lvlsgroup-components':
    '@lvlsgroup/react-component-lib/src/client/components',
};

module.exports = {
  injectGlobalSassHelperToScssFiles,
  ALIAS,
};
