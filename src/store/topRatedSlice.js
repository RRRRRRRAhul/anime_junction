import { createSlice } from "@reduxjs/toolkit";
import { fetchFromApi } from "../service/jikensApi";

const initialState = {
  topratedanime: [],
  topratedloading: false,
  topratederror: false,
  topratedpage: 1,
  topratedhasMore: true,
};

const topRatedSlice = createSlice({
  name: "toprated",
  initialState,
  reducers: {
    topRatedSetLoading: (state, action) => {
      state.topratedloading = action.payload;
    },
    topRatedSetError: (state, action) => {
      state.topratederror = action.payload;
    },
    topRatedSetAnime: (state, action) => {
      state.topratedanime = action.payload.data;
    },
    topRatedSetPage: (state, action) => {
      state.topratedpage = action.payload;
    },
    topRatedSetHasMore: (state, action) => {
      state.topratedhasMore = action.payload;
    },
  },
});

export const {
  topRatedSetLoading,
  topRatedSetError,
  topRatedSetAnime,
  topRatedSetPage,
  topRatedSetHasMore,
} = topRatedSlice.actions;

const topRatedReducer = topRatedSlice.reducer;
export default topRatedReducer;

// Thunk Function
export const fetchTopRatedAnime = (page) => async (dispatch) => {
  dispatch(topRatedSetLoading(true));

  try {
    const result = await fetchFromApi(`top/anime?filter=favorite&page=${page}`);

    dispatch(
      topRatedSetAnime({
        data: result.data,
      })
    );

    dispatch(topRatedSetHasMore(result.pagination?.has_next_page || false));
    dispatch(topRatedSetLoading(false));
  } catch (error) {
    dispatch(topRatedSetError(error.toString()));
    dispatch(topRatedSetLoading(false));
  }
};
