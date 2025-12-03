import { AnimeList } from "../components/AnimeList";
import { Loader } from "../components/Loader";
import { Error } from "../components/Error";
import { PaginationButtons } from "../components/PaginationButton";
import { useSelector, useDispatch } from "react-redux";
import { fetchSeasonalAnime} from "../store/seasonalSlice";
import { useEffect } from "react";
import { seasonalSetPage } from "../store/seasonalSlice";

function getCurrentSeason() {
  const month = new Date().getMonth() + 1;
  const year = new Date().getFullYear();

  let season = "";

  if (month >= 1 && month <= 3) season = "winter";
  else if (month >= 4 && month <= 6) season = "spring";
  else if (month >= 7 && month <= 9) season = "summer";
  else season = "fall";

  return { year, season };
}

export default function Seasonal() {
  const { year, season } = getCurrentSeason();
  const dispatch = useDispatch();

  const {
    seasonalanime,
    seasonalerror,
    seasonalloading,
    seasonalpage,
    seasonalhasMore,
  } = useSelector((state) => state.seasonal);

  const seasonText = season.charAt(0).toUpperCase() + season.slice(1);

  useEffect(() => {
    dispatch(fetchSeasonalAnime(seasonalpage, year, season));
  }, [dispatch, seasonalpage, year, season]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <div className="grow pt-24 max-w-6xl mx-auto px-4">
        
        <h1 className="text-3xl font-bold mb-6 text-blue-400">
          {seasonText} {year} Anime
        </h1>

        {seasonalloading && <Loader />}
        {seasonalerror && <Error />}

        {!seasonalloading && !seasonalerror && (
          <AnimeList list={seasonalanime} />
        )}

        <div className="mt-10">
          <PaginationButtons
            page={seasonalpage}
            setPage={(p) => dispatch(seasonalSetPage(p))}
            hasNext={seasonalhasMore}
          />
        </div>
      </div>
    </div>
  );
}
