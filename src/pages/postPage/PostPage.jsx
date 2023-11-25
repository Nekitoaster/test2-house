import { useLocation, useNavigate } from "react-router-dom";
import styles from "./PostPage.module.scss";
import { useSelector } from "react-redux";
import { useMemo, useState } from 'react';
import CommentItem from '../../components/commentItem/CommentItem';
import PropTypes from "prop-types";

PostPage.propTypes = {
  title: PropTypes.string,
  body: PropTypes.string,
  id: PropTypes.number,
};

// Это страница самого поста

function PostPage() {
  const commentsData = useSelector((state) => state.commentsReducer.comments);
  const location = useLocation();
  const { props } = location.state;
  const { title, body, id } = props;
  let [commentsFilterData, setCommentsFilterData] = useState([]);
  const navigate = useNavigate();

  function handleClick() {
    // Функция для возврата назад
    navigate("/");
  }

  useMemo(() => commentsData.then((items) => {
    // Также сделано в целях экономии ресурсов
    // Чтоб каждый раз не итерироваться по большому массиву комментариев
    let resultsSearch = [];
    for (let i = 0; i < items.length; i++) {
      if (items[i].postId === id) {
        resultsSearch.push(items[i]);
      }
    }
    setCommentsFilterData(Array.from(new Set(resultsSearch)));
  }), [commentsData, id])

  return (
    <>
      {/* Здесь мы выводим сам пост, чтоб было понятно, какому посту адресованы комментарии */}
      <div className={styles.post}>
        <h1 className={styles.title}>{title}</h1>
        <p>{body}</p>
      </div>
      <p onClick={handleClick}  className={styles.back}>
        Вернуться назад
      </p>
      <hr />
      <div className={styles.comments}>
        <h2>Комментарии</h2>
        {/* А здесь выводим уже сами комментарии */}
        {commentsFilterData.map((item) => (
          <CommentItem key={item.id} props={item} />
        ))}
      </div>
    </>
  );
}

export default PostPage;
