import { Section } from "../components/Section";
import { AnimeList } from "../components/AnimeList";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchPopularAnime } from "../store/popularSlice";
import { fetchTopRatedAnime } from "../store/topRatedSlice";
import { fetchTrendingAnime } from "../store/trendingAnimeSlice";
import { Loader } from "../components/Loader";
import { Error } from "../components/Error";

export default function HomePage() {
  const dispatch = useDispatch();

  const { popularanime, popularloading, popularerror, popularpage } =
    useSelector((state) => state.popular);

  const { topratedanime, topratedloading, topratederror, topratedpage } =
    useSelector((state) => state.toprated);

  const {
    trendingAnime,
    trendingAnimeLoading,
    trendingAnimeError,
    trendingAnimePage,
  } = useSelector((state) => state.trending);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchPopularAnime(popularpage));
      await new Promise((resolve) => setTimeout(resolve, 500)); // small delay
      await dispatch(fetchTopRatedAnime(topratedpage));
      await new Promise((resolve) => setTimeout(resolve, 500));
      await dispatch(fetchTrendingAnime(trendingAnimePage));
    };

    fetchData();
  }, [dispatch, popularpage, topratedpage, trendingAnimePage]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <div className="flex-grow pt-24 max-w-6xl mx-auto px-4">
        {/* Trending Anime Section */}
        <Section title="Trending Anime">
          {trendingAnimeLoading ? (
            <Loader />
          ) : trendingAnimeError ? (
            <Error message={trendingAnimeError} />
          ) : (
            <AnimeList list={trendingAnime} />
          )}
        </Section>

        {/* Popular Anime Section */}
        <Section title="Popular Anime" mt="mt-12">
          {popularloading ? (
            <Loader />
          ) : popularerror ? (
            <Error message={popularerror} />
          ) : (
            <AnimeList list={popularanime} />
          )}
        </Section>

        {/* Top Rated Anime Section */}
        <Section title="Top Rated Anime" mt="mt-12">
          {topratedloading ? (
            <Loader />
          ) : topratederror ? (
            <Error message={topratederror} />
          ) : (
            <AnimeList list={topratedanime} />
          )}
        </Section>
      </div>
    </div>
  );
}
