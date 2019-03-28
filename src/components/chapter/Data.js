import Paragraph from '../paragraph/paragraph';
import UploadFile from '../Multimedia/uploadFile';

const PharseData = {
  configData: [
    {
      type: 'icf',
      label: 'ICF',
      icon: 'fas fa-font',
      id: 'ICF-001',
      modalComponent: UploadFile,
    },
    {
      type: 'paragraph',
      label: 'Paragraph',
      icon: 'fas fa-check-square',
      id: 'paragraph-001',
      modalComponent: Paragraph,
    },
    {
      type: 'image',
      label: 'Image',
      icon: 'far fa-dot-circle',
      id: 'image-001',
      modalComponent: UploadFile,
    },
    {
      type: 'audio',
      label: 'Audio',
      icon: 'fas fa-check',
      id: 'audio-001',
      modalComponent: UploadFile,
    },
    {
      type: 'video',
      label: 'Video',
      icon: 'fas fa-check-double',
      id: 'video-001',
      modalComponent: UploadFile,
    },
    {
      type: 'form',
      label: 'Form',
      icon: 'fas fa-check-double',
      id: 'form-001',
      modalComponent: UploadFile,
    },
    {
      type: 'kr',
      label: 'Knowledge Review',
      icon: 'fas fa-check-double',
      id: 'kr-001',
      modalComponent: UploadFile,
    },
    {
      type: 'attestation',
      label: 'Attestation',
      icon: 'fas fa-check-double',
      id: 'attestation-001',
      modalComponent: UploadFile,
    },
    {
      type: 'signature',
      label: 'Signature',
      icon: 'fas fa-check-double',
      id: 'signature-001',
      modalComponent: UploadFile,
    },
  ],
};
export default PharseData;
