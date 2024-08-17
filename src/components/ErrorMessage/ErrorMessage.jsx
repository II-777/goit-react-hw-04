// Styles
import css from './ErrorMessage.module.css';

const ErrorMessage = () => {
  return (
    <div className={css.messageContainer}>
      <h2 className={css.message}>No images loaded...</h2>
    </div>
  );
}

export default ErrorMessage;
