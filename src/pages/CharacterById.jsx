import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchSingleCharacterById } from "../store/getCharacterSlice";
import { useEffect } from "react";
import { Loader } from "../components/Loader";
import { Error } from "../components/Error";

const CharacterById = () => {
  const { charId } = useParams();
  const dispatch = useDispatch();

  // ✔ using your variable names
  const { getcharacter, getcharactererror, getcharacterloading } = useSelector(
    (state) => state.getCharacter
  );

  useEffect(() => {
    dispatch(fetchSingleCharacterById(charId));
  }, [dispatch, charId]);

  if (getcharacterloading) return <Loader />;
  if (getcharactererror) return <Error message={getcharactererror} />;

  if (!getcharacter) return null;

  // ✔ extracting values safely from your slice
  const img = getcharacter.images?.jpg?.image_url;
  const name = getcharacter.name;
  const kanji = getcharacter.name_kanji;
  const nicknames = getcharacter.nicknames;
  const about = getcharacter.about;
  const favorites = getcharacter.favorites;

  return (
    <div className="p-4 text-white max-w-4xl mx-auto">

      {/* CHARACTER HEADER */}
      <div className="flex gap-6 bg-white/5 p-5 rounded-xl">
        <img
          src={img}
          alt={name}
          className="w-48 h-48 object-cover rounded-lg shadow-md"
        />

        <div>
          <h1 className="text-3xl font-bold">{name}</h1>

          {kanji && <p className="text-gray-300 text-lg">{kanji}</p>}

          {nicknames?.length > 0 && (
            <p className="text-gray-400 mt-1">
              Nicknames: {nicknames.join(", ")}
            </p>
          )}

          <p className="text-yellow-300 mt-2">
            ❤️ Favorites: {favorites}
          </p>
        </div>
      </div>

      {/* ABOUT SECTION */}
      {about && (
        <div className="mt-6 bg-white/5 p-5 rounded-xl">
          <h2 className="text-xl font-semibold mb-2">About</h2>
          <p className="text-gray-300 whitespace-pre-line leading-relaxed">
            {about}
          </p>
        </div>
      )}

    </div>
  );
};

export default CharacterById;
