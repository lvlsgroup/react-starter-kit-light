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

module.exports = {
  injectGlobalSassHelperToScssFiles,
};
