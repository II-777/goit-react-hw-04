// External Libraries
import { useState } from 'react';
import Modal from 'react-modal';
// Styles 
import css from './ImageCard.module.css';

// Bind modal to the app element
Modal.setAppElement('#root');

function ImageCard({ image }) {
  const [modalIsOpen, setIsOpen] = useState(false);

  // Open modal
  function openModal() {
    setIsOpen(true);
  }

  // Close modal
  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      <div className={css.imageCard}>
        <img
          src={image.urls.small}
          alt={image.alt_description || 'Image'}
          className={css.imageCardImg}
          onClick={openModal}
        />
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            padding: 0,
            border: 'none',
            background: 'transparent',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          },
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          },
        }}
      >
        <img
          src={image.urls.regular}
          alt={image.alt_description || 'Selected'}
          className={css.modalImage}
        />
      </Modal>
    </>
  );
}

export default ImageCard;
