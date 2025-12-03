import { useParams } from "react-router-dom";
import { AnimeList } from "../components/AnimeList";
import { PaginationButtons } from "../components/PaginationButton";
import { Loader } from "../components/Loader";
import { Error } from "../components/Error";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchAnimeByGenre } from "../store/genreSlice";   // ✅ Correct import
import { setGenrePage } from "../store/genreSlice";        // for pagination

export default function Category() {
  const dispatch = useDispatch();
  const { genreId, genreName } = useParams();

  const {
    animeByGenre,
    genreLoading,
    genreError,
    genrePage,
    genreHasMore,
  } = useSelector((state) => state.genre);

  // Fetch anime when genre or page changes
  useEffect(() => {
    dispatch(fetchAnimeByGenre(genreId, genrePage));
  }, [dispatch, genreId, genrePage]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white pt-24">
      <div className="max-w-6xl mx-auto px-4">

        {/* Title */}
        <h1 className="text-3xl font-bold mb-6 text-blue-400">
          Genre: {genreName}
        </h1>

        {/* Loading */}
        {genreLoading && <Loader />}

        {/* Error */}
        {genreError && <Error message={genreError} />}

        {/* Anime List */}
        {!genreLoading && !genreError && (
          <>
            <AnimeList list={animeByGenre} />

            {/* Pagination */}
            <div className="mt-10">
              <PaginationButtons
                page={genrePage}
                setPage={(p) => dispatch(setGenrePage(p))}
                hasNext={genreHasMore}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
