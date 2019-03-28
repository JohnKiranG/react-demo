import React from 'react';
import PropTypes from 'prop-types';


const AudioPreview = props => {
  const {previewImage} = props;
  return <audio src={previewImage} controls />;
};

AudioPreview.defaultProps = {
  previewImage:'',
}

AudioPreview.propTypes = {
  previewImage:PropTypes.string,
}
export default AudioPreview;
