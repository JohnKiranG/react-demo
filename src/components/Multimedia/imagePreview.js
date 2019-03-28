import React from 'react';
import PropTypes from 'prop-types';


const ImagePreview = props => {
  const {previewImage} = props;
  return <img alt="Invalid" style={{width: '100%'}} src={previewImage} type="image/png" />;
};

ImagePreview.defaultProps = {
  previewImage:'',
}

ImagePreview.propTypes = {
  previewImage:PropTypes.string,
}

export default ImagePreview;
