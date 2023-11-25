import { createSlice } from "@reduxjs/toolkit";

// Хранилище для комментариев

const commentsData = fetch("https://jsonplaceholder.typicode.com/comments").then(
  (response) => response.json()
);

const initialState = {
  comments: commentsData,
};

export const commentsSlice = createSlice({
  name: "commentsReducer",
  initialState,
  reducers: {},
});

// export const {} = commentsSlice.actions;

export default commentsSlice.reducer;
