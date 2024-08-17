// Components
import ImageCard from '../ImageCard/ImageCard';
// Styles 
import css from './ImageGallery.module.css';

const ImageGallery = ({ images, onImageClick }) => {
  if (images.length === 0) {
    return;
  }

  return (
    <ul className={css.imageGalleryList}>
      {images.map((image) => (
        <li key={image.id} className={css.imageGalleryListItem}>
          <ImageCard image={image} onImageClick={onImageClick} />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;
