// Components
import ImageCard from '../ImageCard/ImageCard';
// Styles 
import css from './ImageGallery.module.css';

const ImageGallery = ({ images }) => (
  <div className={css.imageGallery}>
    <ul className={css.imageGalleryList}>
      {images.map((image) => (
        <li key={image.id} className={css.imageGalleryListItem}>
          <ImageCard image={image} />
        </li>
      ))}
    </ul>
  </div>
);

export default ImageGallery;
