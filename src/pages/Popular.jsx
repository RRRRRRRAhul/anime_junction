import { Section } from "../components/Section";
import { AnimeList } from "../components/AnimeList";
import { PaginationButtons } from "../components/PaginationButton";
import { useSelector, useDispatch } from "react-redux";
import { fetchPopularAnime, setPage } from "../store/popularSlice";
import { useEffect } from "react";
import { Loader } from "../components/Loader";
import { Error } from "../components/Error";

export default function Popular() {
  const dispatch = useDispatch();

  const {
    popularanime,
    popularloading,
    popularerror,
    popularpage,
    popularhasMore,
  } = useSelector((state) => state.popular);

  // 🔥 GET anime list for current page from cache
  const currentList = popularanime[popularpage] || [];

  useEffect(() => {
    dispatch(fetchPopularAnime(popularpage));
  }, [dispatch, popularpage]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <div className="grow pt-24 max-w-6xl mx-auto px-4">
        <Section title="Popular Anime">

          {popularloading && <Loader />}

          {popularerror && <Error message={popularerror} />}

          {!popularloading && !popularerror && (
            <AnimeList list={currentList} />
          )}

        </Section>

        <div className="mt-10">
          <PaginationButtons
            page={popularpage}
            setPage={(p) => dispatch(setPage(p))}
            hasNext={popularhasMore}
          />
        </div>
      </div>
    </div>
  );
}
