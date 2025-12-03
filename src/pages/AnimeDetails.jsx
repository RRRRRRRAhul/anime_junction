import { useParams } from "react-router-dom";
import { Loader } from "../components/Loader";
import { Error } from "../components/Error";
import { CharacterCard } from "../components/CharacterCard";
import { useSelector, useDispatch } from "react-redux";
import { fetchAnimeDetailsById } from "../store/animeDetailsSlice";
import { fetchCharacterById } from "../store/characterSlice";
import { useEffect } from "react";

export default function AnimeDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { animeDetail, animedetailerror, animedetailloading } = useSelector(
    (state) => state.animeDetails
  );
  const { characters, charactererror, characterloading } = useSelector(
    (state) => state.character
  );

  const isLoading = animedetailloading || characterloading;
  const isError = animedetailerror || charactererror;

  useEffect(() => {
    let ignore = false;

    const fetchData = async () => {
      if (ignore) return;

      await dispatch(fetchAnimeDetailsById(id));
      await new Promise((resolve) => setTimeout(resolve, 500));
      await dispatch(fetchCharacterById(id));
    };

    fetchData();

    return () => {
      ignore = true;
    };
  }, [id]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <div className="grow pt-24 max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6 text-blue-400">Anime Details</h1>

        {isLoading && <Loader />}
        {isError && <Error />}

        {!isLoading && !isError && animeDetail && (
          <>
            {/* Header Section */}
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <img
                src={animeDetail.images?.jpg?.large_image_url}
                alt={animeDetail.title}
                className="w-64 md:w-72 rounded-lg shadow-lg"
              />

              <div>
                <h2 className="text-4xl font-bold mb-3">{animeDetail.title}</h2>

                <p className="text-gray-300 leading-relaxed mb-4 max-w-2xl">
                  {animeDetail.synopsis}
                </p>

                <div className="grid grid-cols-2 gap-4 text-gray-300">
                  <p>
                    <span className="text-white font-semibold">Score:</span>{" "}
                    {animeDetail.score || "N/A"}
                  </p>
                  <p>
                    <span className="text-white font-semibold">Rank:</span>{" "}
                    {animeDetail.rank || "N/A"}
                  </p>
                  <p>
                    <span className="text-white font-semibold">Episodes:</span>{" "}
                    {animeDetail.episodes || "?"}
                  </p>
                  <p>
                    <span className="text-white font-semibold">Year:</span>{" "}
                    {animeDetail.year || "?"}
                  </p>
                </div>
              </div>
            </div>

            {/* Genres Section */}
            <div className="mt-8 flex flex-wrap gap-3">
              {animeDetail.genres?.map((g) => (
                <a
                  key={g.mal_id}
                  className="px-3 py-1 bg-blue-600/50 text-blue-200 rounded-full text-sm"
                  href={`/category/${g.name}/${g.mal_id}`}
                >
                  {g.name}
                </a>
              ))}
            </div>

            {/* Trailer Section */}
            {animeDetail.trailer?.embed_url && (
              <div className="mt-12">
                <h3 className="text-2xl font-bold mb-4">Trailer</h3>
                <iframe
                  src={animeDetail.trailer.embed_url}
                  className="w-full h-72 rounded-xl"
                  allowFullScreen
                ></iframe>
              </div>
            )}

            {/* Characters Section */}
            <h3 className="text-2xl font-bold mt-14 mb-6">Characters</h3>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {characters.map((ch) => (
                <CharacterCard key={ch.character.mal_id} character={ch} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
