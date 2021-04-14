import { html } from 'common-tags';

const isProd = process.env.NODE_ENV === 'production';

export const get500 = (status, error = '') => {
  const errorTitle = `${status} ERROR`;
  const errorStr = isProd ? error : error.stack || error;
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, minimum-scale=1.0, user-scalable=no"
        />
        <title>${errorTitle}</title>
      </head>
      <body>
        <h1>${errorTitle}</h1>
        <pre>${errorStr}</pre>
      </body>
    </html>
  `;
};

export const getHtml = ({
  cssHash,
  js,
  stateJson,
  styles,
  reactDomString,
  helmet,
}) => {
  return html`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        ${helmet.title.toString()} ${helmet.meta.toString()}
        ${helmet.link.toString()}
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, minimum-scale=1.0, user-scalable=no"
        />
        ${styles}
      </head>
      <body>
        <div id="root">${reactDomString}</div>
        ${cssHash} ${js}
        <script>
          window.__SERVER_STATE__ = ${stateJson};
        </script>
      </body>
    </html>
  `;
};
