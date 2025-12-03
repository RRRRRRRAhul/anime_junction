import { createSlice } from "@reduxjs/toolkit";
import { fetchFromApi } from "../service/jikensApi";

const initialState = {
  animeDetail: {},
  animedetailerror: null,
  animedetailloading: false,
};

const animeDetailsSlice = createSlice({
  name: "animeDetails",
  initialState,
  reducers: {
    animeDetailsSetLoading: (state, action) => {
      state.animedetailloading = action.payload;
    },
    animeDetailsSetAnimeDetails: (state, action) => {
      state.animeDetail = action.payload;
    },
    animeDetailsSetError: (state, action) => {
      state.animedetailerror = action.payload;
    },
  },
});

export const {
  animeDetailsSetAnimeDetails,
  animeDetailsSetError,
  animeDetailsSetLoading,
} = animeDetailsSlice.actions;

const animeDetailsReducer = animeDetailsSlice.reducer;
export default animeDetailsReducer;

export const fetchAnimeDetailsById = (id) => async (dispatch) => {
  dispatch(animeDetailsSetLoading(true));

  try {
    const result = await fetchFromApi(`anime/${id}`);
    const data = result.data;

    dispatch(animeDetailsSetAnimeDetails(data));
    dispatch(animeDetailsSetLoading(false));
  } catch (error) {
    dispatch(animeDetailsSetError(error.toString()));
    dispatch(animeDetailsSetLoading(false));
  }
};
