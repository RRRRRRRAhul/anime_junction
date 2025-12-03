import { createSlice } from "@reduxjs/toolkit";
import { fetchFromApi } from "../service/jikensApi";

const initialState = {
  characters: [],
  charactererror: null,
  characterloading: false,
};

const characterSlice = createSlice({
  name: "character",
  initialState,
  reducers: {
    characterSetLoading: (state, action) => {
      state.characterloading = action.payload;
    },
    characterSetCharacter: (state, action) => {
      state.characters = action.payload;
    },
    characterSetError: (state, action) => {
      state.charactererror = action.payload;
    },
  },
});

export const {
  characterSetCharacter,
  characterSetError,
  characterSetLoading,
} = characterSlice.actions;

const characterReducer = characterSlice.reducer;
export default characterReducer;

export const fetchCharacterById = (id) => async (dispatch) => {
  dispatch(characterSetLoading(true));
  try {
    const result = await fetchFromApi(`anime/${id}/characters`);
    const data = result.data;
    dispatch(characterSetCharacter(data));
    dispatch(characterSetLoading(false));
  } catch (error) {
    dispatch(characterSetError(error.toString()));
    dispatch(characterSetLoading(false));
  }
};
