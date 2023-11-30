import { useForm } from "react-hook-form";
import styles from "./Search.module.scss";
import { useLocalStorage } from "react-use";
import PropTypes from "prop-types";
import { useGetPostsQuery } from "../../stores";

Search.propTypes = {
  setRes: PropTypes.func,
};

// Компонен формы поиска постов
// props получаем из SearchPage
function Search(props) {
  const { setRes } = props;
  const { data, isLoading } = useGetPostsQuery();

  let [value, setValue] = useLocalStorage("inputValue", "");

  const { register, handleSubmit } = useForm({
    defaultValues: {
      inputValue: value ?? "",
    },
  });

  const onSubmit = (data) => {
    // Функция для сабмита формы
    localStorage.setItem("page", JSON.stringify(0)); // Сбрасываем номер страницы в пагинаторе
    window.location.reload(); // Сброс происходит только в локальном хранициле,
    if (!isLoading) onFound(data.inputValue.toLowerCase()); // поэтому мы обновляем страницу при каждом новом поиске
  }; // чтоб также менять класс у активной страницы

  async function onFound(value) {
    // Функция для поиска совпадений из общего числа постов. Здесь также добавлена некоторая фильтрация
    // Чтобы поисковик лучше понимал, что мы от него хотим

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
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < clearValues.length; j++) {
        if (data[i].title.toLowerCase().includes(clearValues[j])) {
          resultsSearch = [...resultsSearch, data[i]];
        }
      }
    }
    setRes(Array.from(new Set(resultsSearch)));
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
