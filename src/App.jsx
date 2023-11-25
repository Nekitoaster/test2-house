import styles from "./App.module.scss";
import { useRoutes } from "react-router-dom";
import routes from "./routes";

function App() {

  const element = useRoutes(routes);
  return (
    <>
      {/* Это нужно для навигации, и в случае неверного url, будет выводиться 'Страница не найдена' */}
      {element ?? (
        <div>
          <h1 className={styles.undefined}>Страница не найдена</h1>
        </div>
      )}
    </>
  );
}

export default App;
