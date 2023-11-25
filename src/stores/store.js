import { configureStore } from "@reduxjs/toolkit";
import postsSlice from './posts/postsSlice';
import commentsSlice from './comments/comments';

// Главное хранилище, которое содержит в себе все остальные

export const store = configureStore({
  reducer: {
    postsReducer: postsSlice,
    commentsReducer: commentsSlice,
},
});
