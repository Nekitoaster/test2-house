import PostPage from '../pages/postPage/PostPage';
import SearchPage from '../pages/searchPage/SearchPage';

// Здесь находятся все пути нашего приложения

const routes = [
  {
    path: "/",
    element: <SearchPage />,
  },
  {
    path: "/posts/:id",
    element: <PostPage/>,
  },
];

export default routes;
