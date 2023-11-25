import { useState } from "react";
import Results from "../../components/results/Results";
import Search from "../../components/search/Search";


// Страница с поиском и выводом результатов
function SearchPage() {

  const [res, setRes] = useState(
    JSON.parse(localStorage.getItem("results")) || [] // Здесь мы получаем результаты поиска из локального хранилища,
  );                                                  // чтоб в дальнейшем они сохранялись при обновлении страницы
  return (
    <>
      <Search setRes={setRes}/>
      <Results results={res}/>
    </>
  );
}

export default SearchPage;
