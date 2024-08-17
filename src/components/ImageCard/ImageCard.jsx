// Styles 
import css from './ImageCard.module.css';

function ImageCard({ image, onImageClick }) {
  return (
    <div className={css.imageCard}>
      <img
        src={image.urls.small}
        alt={image.alt_description || 'Image'}
        className={css.imageCardImg}
        onClick={() => onImageClick(image.urls.regular)}
      />
    </div>
  );
}

export default ImageCard;
