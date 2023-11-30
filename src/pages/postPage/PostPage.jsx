import { useLocation, useNavigate } from "react-router-dom";
import styles from "./PostPage.module.scss";
import { useMemo, useState } from "react";
import CommentItem from "../../components/commentItem/CommentItem";
import PropTypes from "prop-types";
import { useGetCommentsQuery } from "../../stores";

PostPage.propTypes = {
  title: PropTypes.string,
  body: PropTypes.string,
  id: PropTypes.number,
};

// Это страница самого поста

function PostPage() {
  const { data = [], isLoading } = useGetCommentsQuery();
  const location = useLocation();
  const { props } = location.state;
  const { title, body, id } = props;
  let [commentsFilterData, setCommentsFilterData] = useState([]);
  const navigate = useNavigate();

  function handleClick() {
    // Функция для возврата назад
    navigate("/");
  }

  useMemo(() =>
    // Также сделано в целях экономии ресурсов
    // Чтоб каждый раз не итерироваться по большому массиву комментариев
    {
      if (!isLoading) {
        let resultsSearch = [];
        for (let i = 0; i < data.length; i++) {
          if (data[i].postId === id) {
            resultsSearch.push(data[i]);
          }
        }
        setCommentsFilterData(Array.from(new Set(resultsSearch)));
      }
    }, [data, id, isLoading]);

  return (
    <>
      {/* Здесь мы выводим сам пост, чтоб было понятно, какому посту адресованы комментарии */}
      <div className={styles.post}>
        <h1 className={styles.title}>{title}</h1>
        <p>{body}</p>
      </div>
      <p onClick={handleClick} className={styles.back}>
        Вернуться назад
      </p>
      <hr />

      <div className={styles.comments}>
        <h2>Комментарии</h2>
        {isLoading && <h4 className={styles.loading}>Загрузка...</h4>}
        {/* А здесь выводим уже сами комментарии */}
        {!isLoading &&
          commentsFilterData.map((item) => (
            <CommentItem key={item.id} props={item} />
          ))}
      </div>
    </>
  );
}

export default PostPage;
