import { createSlice } from "@reduxjs/toolkit";
import { fetchFromApi } from "../service/jikensApi";

const initialState = {
  popularanime: {},    // store pages like {1: [...], 2: [...], 3: [...]} instaed of [{page_1},{page_2},{page_3}]
  popularloading: false,
  popularerror: false,
  popularpage: 1,
  popularhasMore: true,
};

const popularSlice = createSlice({
  name: "popular",
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.popularpage = action.payload;
    },

    setLoading: (state, action) => {
      state.popularloading = action.payload;
    },

    setPageAnime: (state, action) => {
      const { page, data } = action.payload;

      // save data for that page ONLY — do not replace previous pages
      state.popularanime[page] = data;
    },

    setError: (state, action) => {
      state.popularerror = action.payload;
    },

    setHasMore: (state, action) => {
      state.popularhasMore = action.payload;
    },
  },
});

export const {
  setPage,
  setLoading,
  setPageAnime,
  setError,
  setHasMore,
} = popularSlice.actions;

const popularReducer =  popularSlice.reducer;
export default popularReducer


export const fetchPopularAnime = (page = 1) => async (dispatch, getState) => {
  const existingPageData = getState().popular.popularanime[page];

  // 🔥 If page already exists → do NOT fetch again
  if (existingPageData) return;

  dispatch(setLoading(true));
  dispatch(setError(false));

  try {
    const result = await fetchFromApi(
      `top/anime?filter=bypopularity&page=${page}`
    );

    dispatch(
      setPageAnime({
        page,
        data: result.data,
      })
    );

    dispatch(setHasMore(result.pagination?.has_next_page || false));
  } catch (error) {
    dispatch(setError(error.toString()));
  } finally {
    dispatch(setLoading(false));
  }
};
