import { Link } from 'react-router-dom';
import styles from './ResultItem.module.scss'
import PropTypes from "prop-types";

ResultItem.propTypes = {
  props: PropTypes.object,
  title: PropTypes.string,
  body: PropTypes.string,
  id: PropTypes.number,
};


//Это компонент поста, который отображается в SearchPage
// props получаем из компонента Results.jsx

function ResultItem({props}) {
    const {title, body, id} = props
  return (
    <div className={styles.item}>
      <Link style={{textDecoration:'none', color: '#222222'}} to={`/posts/:id${id}`} state={{props}}>
        <h4 className={styles.item__title}>{title}</h4>
      </Link>
      <p>{body}</p>
    </div>
  );
}

export default ResultItem