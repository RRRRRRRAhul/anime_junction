import { createSlice } from "@reduxjs/toolkit";
import { fetchFromApi } from "../service/jikensApi";

const initialState = {
  seasonalanime: [],
  seasonalerror: false,
  seasonalloading: false,
  seasonalpage: 1,
  seasonalhasMore: true,
};

const seasonalSlice = createSlice({
  name: "seasonal",
  initialState,
  reducers: {
    seasonalSetLoading: (state, action) => {
      state.seasonalloading = action.payload;
    },
    seasonalSetError: (state, action) => {
      state.seasonalerror = action.payload;
    },
    seasonalSetAnime: (state, action) => {
      state.seasonalanime = action.payload.data
    },
    seasonalSetPage: (state, action) => {
      state.seasonalpage = action.payload;
    },
    seasonalSetHasMore: (state, action) => {
      state.seasonalhasMore = action.payload;
    },
  },
});

export const {
  seasonalSetAnime,
  seasonalSetError,
  seasonalSetHasMore,
  seasonalSetLoading,
  seasonalSetPage,
} = seasonalSlice.actions;

export const seasonalReducer = seasonalSlice.reducer;

export const fetchSeasonalAnime = (page, year, season) => async (dispatch) => {
  dispatch(seasonalSetLoading(true));

  try {
    const result = await fetchFromApi(`seasons/${year}/${season}?page=${page}`);

    dispatch(
      seasonalSetAnime({
        data: result.data,
      })
    );

    dispatch(seasonalSetHasMore(result.pagination?.has_next_page || false));
    dispatch(seasonalSetLoading(false));
  } catch (error) {
    dispatch(seasonalSetError(error.toString()));
    dispatch(seasonalSetLoading(false));
  }
};