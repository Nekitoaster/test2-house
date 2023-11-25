import styles from './CommentItem.module.scss'
import PropTypes from "prop-types";

CommentItem.propTypes = {
  props: PropTypes.object,
  name: PropTypes.string,
  body: PropTypes.string,
  email: PropTypes.string,
};

// Это компонент коментария
// props получаем из PostPage

function CommentItem({ props }) {
  const {name, body, email} =props

  return (
    <div className={styles.item}>
      <h4 className={styles.title}>{name}</h4>
      <p>{body}</p>
      <p>
        <span className={styles.email}>Email:</span>
        {email}
      </p>
    </div>
  );
}

export default CommentItem;
