import React from 'react';
import { Helmet } from 'react-helmet-async';
import PropTypes from 'prop-types';

function MetaTags({ metaTags }) {
  return (
    <Helmet>
      {metaTags.map((metaTag) => {
        const metaKey = metaTag?.key;
        const keyValue = metaTag?.keyValue;
        const content = metaTag?.content;

        if (metaKey === 'title') {
          return <title key={keyValue}>{metaTag?.content}</title>;
        } else if (metaKey) {
          const metaAttributes = {
            [metaKey]: keyValue,
            content: content,
          };
          return <meta key={keyValue} {...metaAttributes} />;
        } else {
          return null;
        }
      })}
    </Helmet>
  );
}

MetaTags.propTypes = {
  metaTags: PropTypes.array,
};

export default MetaTags;
