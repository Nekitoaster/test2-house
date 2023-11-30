import { configureStore } from "@reduxjs/toolkit";
import { postsApi } from "./posts/postsApi";
import { commentsApi } from "./comments/commentsApi";

// Главное хранилище, которое содержит в себе все остальные

export const store = configureStore({
  reducer: {
    [commentsApi.reducerPath]: commentsApi.reducer,
    [postsApi.reducerPath]: postsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(commentsApi.middleware)
      .concat(postsApi.middleware),
});
