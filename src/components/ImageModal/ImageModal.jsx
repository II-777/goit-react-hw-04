// External Libraries
import Modal from 'react-modal';
// Styles 
import css from './ImageModal.module.css';

// Define custom styles for the modal
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: 0,
    border: 'none',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
};

// Bind modal to the app element
Modal.setAppElement('#root');

function ImageModal({ isOpen, onRequestClose, selectedImage }) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      contentLabel="Image Modal"
    >
      <img src={selectedImage} alt="Selected" className={css.modalImage}/>
    </Modal>
  );
}

export default ImageModal;

