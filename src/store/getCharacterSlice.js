import { createSlice } from "@reduxjs/toolkit";
import { fetchFromApi } from "../service/jikensApi";

const initialState = {
  getcharacter: null,
  getcharactererror: null,
  getcharacterloading: false,
};

const getCharacterSlice = createSlice({
  name: "getcharacter",
  initialState,
  reducers: {
    getcharacterSetLoading: (state, action) => {
      state.getcharacterloading = action.payload;
    },
    getcharacterSetCharacter: (state, action) => {
      state.getcharacter = action.payload;
    },
    getcharacterSetError: (state, action) => {
      state.getcharactererror = action.payload;
    },
  },
});

export const {
  getcharacterSetCharacter,
  getcharacterSetError,
  getcharacterSetLoading,
} = getCharacterSlice.actions;
const getCharacterReducer = getCharacterSlice.reducer;
export default getCharacterReducer;

export const fetchSingleCharacterById = (charId) => async (dispatch) => {
  dispatch(getcharacterSetLoading(true));
  try {
    const result = await fetchFromApi(`characters/${charId}`);
    const data = result.data;
    dispatch(getcharacterSetCharacter(data));
    dispatch(getcharacterSetLoading(false));
  } catch (error) {
    dispatch(getcharacterSetError(error.toString()));
    dispatch(getcharacterSetLoading(false));
  }
};
