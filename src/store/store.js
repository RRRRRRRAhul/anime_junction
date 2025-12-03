import { configureStore } from "@reduxjs/toolkit";
import popularReducer from "./popularSlice";
import topRatedReducer from "./topRatedSlice";
import { seasonalReducer } from "./seasonalSlice";
import characterReducer from "./characterSlice";
import animeDetailsReducer from "./animeDetailsSlice";
import trendingAnimeReducer from "./trendingAnimeSlice";
import genreReducer from "./genreSlice";

const store = configureStore({
    reducer: {
        popular: popularReducer,
        toprated: topRatedReducer,
        seasonal: seasonalReducer,
        character: characterReducer,
        animeDetails: animeDetailsReducer,
        trending: trendingAnimeReducer,
        genre: genreReducer
    }
})

export default store