import { createSlice } from "@reduxjs/toolkit";

// Хранилище для постов

const postsData = fetch("https://jsonplaceholder.typicode.com/posts")
  .then(response => response.json())


const initialState = {
  posts: postsData,
};

export const postsSlice = createSlice({
  name: "postsReducer",
  initialState,
  reducers: {},
});

// export const {} = postsSlice.actions;

export default postsSlice.reducer;
