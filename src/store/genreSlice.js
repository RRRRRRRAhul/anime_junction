import { createSlice } from "@reduxjs/toolkit";
import { fetchFromApi } from "../service/jikensApi";

const initialState = {
  animeByGenre: [],
  genreLoading: false,
  genreError: null,
  genrePage: 1,
  genreHasMore: true,
};

const genreSlice = createSlice({
  name: "genre",
  initialState,
  reducers: {
    setGenreLoading: (state, action) => {
      state.genreLoading = action.payload;
    },
    setGenreError: (state, action) => {
      state.genreError = action.payload;
    },
    setAnimeByGenre: (state, action) => {
      state.animeByGenre = action.payload; // array only
    },
    setGenrePage: (state, action) => {
      state.genrePage = action.payload;
    },
    setGenreHasMore: (state, action) => {
      state.genreHasMore = action.payload;
    },
  },
});

export const {
  setAnimeByGenre,
  setGenreError,
  setGenreHasMore,
  setGenreLoading,
  setGenrePage,
} = genreSlice.actions;

const genreReducer = genreSlice.reducer
export default genreReducer


export const fetchAnimeByGenre = (genreId, page = 1) => async (dispatch) => {
  dispatch(setGenreLoading(true));
  dispatch(setGenrePage(page));

  try {
    const result = await fetchFromApi(`anime?genres=${genreId}&page=${page}`);

    dispatch(setAnimeByGenre(result.data));
    dispatch(setGenreHasMore(result.pagination?.has_next_page || false));
    dispatch(setGenreLoading(false));
  } catch (error) {
    dispatch(setGenreError(error.toString()));
    dispatch(setGenreLoading(false));
  }
};
