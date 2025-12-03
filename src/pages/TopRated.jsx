import { AnimeList } from "../components/AnimeList";
import { Loader } from "../components/Loader";
import { Error } from "../components/Error";
import { PaginationButtons } from "../components/PaginationButton";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchTopRatedAnime } from "../store/topRatedSlice";
import { topRatedSetPage } from "../store/topRatedSlice";

export default function TopRated() {
  const dispatch = useDispatch();
  const {
    topratedanime,
    topratedloading,
    topratederror,
    topratedpage,
    topratedhasMore,
  } = useSelector((state) => state.toprated);
  const isLoading = topratedloading;
  const isError = topratederror;

  useEffect(() => {
    dispatch(fetchTopRatedAnime(topratedpage));
  }, [dispatch, topratedpage]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <div className="grow pt-24 max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6 text-blue-400">
          Top Rated Anime
        </h1>
        {isLoading && <Loader />}
        {isError && <Error />}
        {!isLoading && !isError && <AnimeList list={topratedanime} />}
        <div className="mt-10">
          <PaginationButtons
            page={topratedpage}
            setPage={(p) => dispatch(topRatedSetPage(p))}
            hasNext={topratedhasMore}
          />
        </div>
      </div>
    </div>
  );
}
