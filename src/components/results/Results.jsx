import ResultItem from "../resultItem/ResultItem";
import styles from "./Results.module.scss";
import PropTypes from "prop-types";

import ReactPaginate from "react-paginate";
import { AiFillLeftCircle, AiFillRightCircle } from "react-icons/ai";
import { IconContext } from "react-icons";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useLocalStorage } from "react-use";

Results.propTypes = {
  results: PropTypes.array,
};

// Это компонент для вывода каждого отдельного ResultItem
// props призодят из SearchPage

function Results(props) {
  const { results } = props;

  const [page, setPage] = useState(
    JSON.parse(localStorage.getItem("page")) || 0
  );

  const [inputData] = useLocalStorage("inputValue", "");
  const n = 10;
  const postsData = useSelector((state) => state.postsReducer.posts);
  const [lastPosts, setLastPosts] = useState([]);

  const filterData = useMemo(() => {
    return results.filter((_, index) => {
      return (index >= page * n) & (index < (page + 1) * n);
    });
  }, [page, results]);

  useEffect(() => {
    localStorage.setItem("page", JSON.stringify(page));
  }, [page]);
  // При их объединении при новом запросе не происходит
  useEffect(() => {
    // сброса страницы
    localStorage.setItem("results", JSON.stringify(results));
  }, [results]);

  useMemo(() => {
    // Это чтоб каждый раз не делать итерацию по большому массиву
    postsData.then((items) => {
      let arr = [];
      for (let i = 1; i !== 11; i++) {
        arr.push(items[items.length - i]);
      }
      setLastPosts(arr);
    });
  }, [postsData]);

  return (
    <div className={styles.results}>
      {/* Выводится в случае, если по запросу ничего не найдено */}
      {inputData && results.length === 0 && <h4>Ничего не найдено</h4>}
      {/* Выводятся последние посты, когда состояния инпута пустое и страница была обновлена */}
      {!inputData && (
        <div>
          <h4 className={styles.last}>Последние посты</h4>
          {lastPosts.map((item) => (
            <ResultItem key={item.id} props={item} />
          ))}
        </div>
      )}

      {/* Когда инпут не возвращает false и когда есть результаты
      мы выводим список результатов, соответствующий запросу */}
      {filterData &&
        inputData &&
        filterData.map((item) => <ResultItem key={item.id} props={item} />)}
      {/* То же что и выше, но только для вывода управления пагинацией */}
      {results.length > 0 && inputData && (
        <ReactPaginate
          containerClassName={styles.pagination}
          pageClassName={styles.page}
          activeClassName={styles.active}
          onPageChange={(event) => setPage(event.selected)}
          initialPage={page}
          pageCount={Math.ceil(results.length / n)}
          breakLabel="..."
          previousLabel={
            <IconContext.Provider value={{ color: "#222222", size: "36px" }}>
              <AiFillLeftCircle />
            </IconContext.Provider>
          }
          nextLabel={
            <IconContext.Provider value={{ color: "#222222", size: "36px" }}>
              <AiFillRightCircle />
            </IconContext.Provider>
          }
        />
      )}
    </div>
  );
}

export default Results;
