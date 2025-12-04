export const CharacterCard = ({ character }) => {
  const char = character?.character ?? character;
  const role = character?.role ?? "";

  return (
    <a
      href={`/character/${char?.mal_id}`}
      className="flex gap-3 items-center bg-white/5 p-3 rounded-md hover:bg-white/10 transition"
    >
      <img
        src={char?.images?.jpg?.image_url}
        alt={char?.name}
        className="w-16 h-16 object-cover rounded"
      />
      <div>
        <div className="text-sm font-semibold text-white">{char?.name}</div>
        {role && <div className="text-xs text-gray-300">{role}</div>}
      </div>
    </a>
  );
};
