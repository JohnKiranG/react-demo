import React from 'react';
import ImagePreview from './imagePreview';
import AudioPreview from './audioPreview';
import VideoPreview from './videoPreview';
import PropTypes from 'prop-types';


const Preview = props => {
    const {type,previewImage}=props;
    if(type==='image') {
        return <ImagePreview previewImage={previewImage}/>
    } else if (type==='audio') {
        return <AudioPreview previewImage={previewImage} />
    } else if (type==='video') {
        return <VideoPreview previewImage={previewImage} />
    } else 
    return null;
}

Preview.defaultProps = {
    type: '',
    previewImage: '',
}

Preview.propTypes = {
    type:PropTypes.string.isRequired,
    previewImage:PropTypes.string,
}

export default Preview;
        
        