import React from 'react';
import ImagePreview from './imagePreview';
import AudioPreview from './audioPreview';
import VideoPreview from './videoPreview';

const Check = props => {
    const {id,previewImage}=props;
    if(id==='1') {
        return <ImagePreview previewImage={previewImage}/>
    } else if (id==='2') {
        return <AudioPreview previewImage={previewImage} />
    } else if (id==='3') {
        return <VideoPreview previewImage={previewImage} />
    } else 
    return null;
}

export default Check;
        
        