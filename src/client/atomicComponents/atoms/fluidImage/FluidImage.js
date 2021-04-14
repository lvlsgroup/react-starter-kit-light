import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './FluidImage.scss';

function FluidImage({
  src,
  classNameContainer,
  classNameImage,
  aspectRatio,
  srcSet,
  sizes,
  alt,
  style = {},
}) {
  const paddingBottomPercentage = `${(1 / aspectRatio) * 100}%`;

  return (
    <div
      className={classNames(styles.fluidImageContainer, classNameContainer)}
      style={{ paddingBottom: paddingBottomPercentage }}
    >
      <img
        src={src}
        className={classNames(styles.fluidImage, classNameImage)}
        alt={alt}
        srcSet={srcSet}
        sizes={sizes}
        style={style}
      />
    </div>
  );
}

FluidImage.propTypes = {
  src: PropTypes.string,
  classNameContainer: PropTypes.string,
  classNameImage: PropTypes.string,
  alt: PropTypes.string,
  aspectRatio: PropTypes.number.isRequired, // Use this instead of height and width
  srcSet: PropTypes.string,
  sizes: PropTypes.string,
  style: PropTypes.object,
};

export default FluidImage;
