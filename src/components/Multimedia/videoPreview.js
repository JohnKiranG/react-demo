import React from 'react';
import PropTypes from 'prop-types';


const VideoPreview = props => {
  const {previewImage} = props;
  return <video src={previewImage} controls />;
};

VideoPreview.defaultProps = {
  previewImage:'',
}

VideoPreview.propTypes = {
  previewImage:PropTypes.string,
}
export default VideoPreview;
