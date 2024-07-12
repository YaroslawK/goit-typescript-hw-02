import Modal from 'react-modal';
import css from './ImageModal.module.css';

Modal.setAppElement('#root');

const ImageModal = ({ isOpen, onRequestClose, image }) => {
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