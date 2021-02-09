import React from 'react';
import { Helmet } from 'react-helmet-async';
import PropTypes from 'prop-types';

function Head({ meta }) {
  return <Helmet></Helmet>;
}

Head.propTypes = {
  meta: PropTypes.string,
};

export default Head;
