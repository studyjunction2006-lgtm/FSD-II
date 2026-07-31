import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [
    {
      id: 1,
      title: "Learning Redux Toolkit",
      category: "Tech",
      likes: 230,
    },
    {
      id: 2,
      title: "React Performance Tips",
      category: "Tech",
      likes: 520,
    },
    {
      id: 3,
      title: "Football World Cup",
      category: "Sports",
      likes: 340,
    },
    {
      id: 4,
      title: "Artificial Intelligence",
      category: "Tech",
      likes: 610,
    },
    {
      id: 5,
      title: "Olympics Highlights",
      category: "Sports",
      likes: 275,
    },
    {
      id: 6,
      title: "Breaking News Today",
      category: "News",
      likes: 150,
    },
    {
      id: 7,
      title: "JavaScript ES2025",
      category: "Tech",
      likes: 450,
    },
    {
      id: 8,
      title: "Global Economy",
      category: "News",
      likes: 300,
    },
  ],

  search: "",
  category: "All",
};

const postsSlice = createSlice({
  name: "posts",

  initialState,

  reducers: {
    setSearch(state, action) {
      state.search = action.payload;
    },

    setCategory(state, action) {
      state.category = action.payload;
    },
  },
});

export const { setSearch, setCategory } = postsSlice.actions;

export default postsSlice.reducer;