// Styles
import css from './LoadMoreBtn.module.css';

const LoadMoreBtn = ({ onClick, disabled }) => {
  return (
    <div className={css.container}>
      <button onClick={onClick} disabled={disabled} className={css.loadMoreButton}>
        Load More
      </button>
    </div>
  );
};

export default LoadMoreBtn;