import { AnimeList } from "../components/AnimeList";
import { Loader } from "../components/Loader";
import { Error } from "../components/Error";
import { PaginationButtons } from "../components/PaginationButton";
import { useSelector, useDispatch } from "react-redux";
import { fetchTrendingAnime } from "../store/trendingAnimeSlice";
import { useEffect } from "react";
import { setTrendingAnimePage } from "../store/trendingAnimeSlice";

export default function Trending() {
  const dispatch = useDispatch();
  const {
    trendingAnime,
    trendingAnimeError,
    trendingAnimeLoading,
    trendingAnimePage,
    trendingAnimeHasMore,
  } = useSelector((state) => state.trending);
  const isError = trendingAnimeError;
  const isLoading = trendingAnimeLoading;

  useEffect(() => {
    dispatch(fetchTrendingAnime(trendingAnimePage));
  }, [dispatch, trendingAnimePage]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <div className="grow pt-24 max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6 text-blue-400">
          Trending Anime
        </h1>
        {isLoading && <Loader />}
        {isError && <Error message={trendingAnimeError} />}
        {!isLoading && !isError && <AnimeList list={trendingAnime} />}
        <div className="mt-10">
          <PaginationButtons
            page={trendingAnimePage}
            hasNext={trendingAnimeHasMore}
            setPage={(p) => dispatch(setTrendingAnimePage(p))}
          />
        </div>
      </div>
    </div>
  );
}
