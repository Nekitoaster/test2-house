import { useForm } from "react-hook-form";
import styles from "./Search.module.scss";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useLocalStorage } from "react-use";
import PropTypes from "prop-types";


Search.propTypes = {
  setRes: PropTypes.func,
};

// Компонен формы поиска постов
// props получаем из SearchPage
function Search(props) {
  const { setRes } = props;

  let [value, setValue] = useLocalStorage("inputValue", "");

  const postsData = useSelector((state) => state.postsReducer.posts);

  const { register, handleSubmit } = useForm({
    defaultValues: {
      inputValue: value ?? "",
    },
  });

  const onSubmit = (data) => {
    // Функция для сабмита формы

    localStorage.setItem("page", JSON.stringify(0)); // Сбрасываем номер страницы в пагинаторе
    window.location.reload();                        // Сброс происходит только в локальном хранициле,
    onFound(data.inputValue.toLowerCase());          // поэтому мы обновляем страницу при каждом новом поиске
  };                                                 // чтоб также менять класс у активной страницы

  function onFound(value) {
    // Функция для поиска совпадений из общего числа постов. Здесь также добавлена некоторая фильтрация
    // Чтобы поисковик лучше понимал, что мы от него хотим
    postsData.then((items) => {
      let values = value.match(/[^,\s][^,]*[^,\s]*/g);
      let clearValues = [];
      if (values) {
        for (let i = 0; i < values.length; i++) {
          clearValues.push(values[i].replace(/\s+/g, " ").trim());
        }
      }

      // Вообще это прием я взял из другого своего тестового задания для Жилфонда
      // Там был поиск по имени и фамилии, и возможность искать сотрудников через запятую

      let resultsSearch = [];
      for (let i = 0; i < items.length; i++) {
        for (let j = 0; j < clearValues.length; j++) {
          if (items[i].title.toLowerCase().includes(clearValues[j])) {
            resultsSearch = [...resultsSearch, items[i]];
          }
        }
      }
      setRes(Array.from(new Set(resultsSearch)));
    });
  }

  return (
    // Вывод самой формы с использование react hook form

    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <label className={styles.form__label}>
        Введите название
        <input
          placeholder="Название"
          className={styles.form__label_input}
          {...register("inputValue", {
            onChange: (e) => {
              setValue(e.target.value);
            },
          })}
        />
      </label>
      <input value="ПОИСК" className={styles.form__button} type="submit" />
    </form>
  );
}

export default Search;
