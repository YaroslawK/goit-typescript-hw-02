import React from 'react';
import Modal from 'react-modal';
import css from './ImageModal.module.css';

interface Image {
  id: string;
  urls: {
    regular: string; 
  };
  description: string; 
}

interface ImageModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  image: Image | null;
}

const ImageModal: React.FC<ImageModalProps> = ({ isOpen, onRequestClose, image }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className={css.modal}
      overlayClassName={css.overlay}
    >
      {image && (
        <div className={css.modalContent}>
          <img src={image.urls.regular} alt={image.description} />
        </div>
      )}
    </Modal>
  );
};

export default ImageModal;
