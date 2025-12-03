import { createSlice } from "@reduxjs/toolkit";
import { fetchFromApi } from "../service/jikensApi";

const initialState = {
  trendingAnime: [],
  trendingAnimeError: null,
  trendingAnimeLoading: false,
  trendingAnimePage: 1,
  trendingAnimeHasMore: true,
};

const trendingAnimeSlice = createSlice({
  name: "trendingAnime",
  initialState,
  reducers: {
    setTrendingAnimeLoading: (state, action) => {
      state.trendingAnimeLoading = action.payload;
    },
    setTrendingAnimeError: (state, action) => {
      state.trendingAnimeError = action.payload;
    },
    setTrendingAnime: (state, action) => {
      state.trendingAnime = action.payload.data;
    },
    setTrendingAnimeHasMore: (state, action) => {
      state.trendingAnimeHasMore = action.payload;
    },
    setTrendingAnimePage: (state, action) => {
      state.trendingAnimePage = action.payload;
    },
  },
});

export const {
  setTrendingAnime,
  setTrendingAnimeError,
  setTrendingAnimeLoading,
  setTrendingAnimeHasMore,
  setTrendingAnimePage,
} = trendingAnimeSlice.actions;

const trendingAnimeReducer = trendingAnimeSlice.reducer;
export default trendingAnimeReducer;

export const fetchTrendingAnime = (page) => async (dispatch) => {
  dispatch(setTrendingAnimeLoading(true));
  dispatch(setTrendingAnimeError(null));

  try {
    const result = await fetchFromApi(`top/anime?filter=airing&page=${page}`);
    
    dispatch(setTrendingAnime({
      data: result.data,
    }));

    dispatch(setTrendingAnimeHasMore(result.pagination?.has_next_page || false));
    dispatch(setTrendingAnimeLoading(false));
  } catch (error) {
    dispatch(setTrendingAnimeError(error.toString()));
    dispatch(setTrendingAnimeLoading(false));
  }
};
