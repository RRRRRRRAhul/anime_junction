export const CharacterCard = ({ character }) => {
  // character expected to have: character.name, character.images.jpg.image_url, role
  const char = character?.character ?? character;
  const role = character?.role ?? "";
  return (
    <div className="flex gap-3 items-center bg-white/5 p-3 rounded-md">
      <img
        src={char?.images?.jpg?.image_url}
        alt={char?.name}
        className="w-16 h-16 object-cover rounded"
      />
      <div>
        <div className="text-sm font-semibold text-white">{char?.name}</div>
        {role && <div className="text-xs text-gray-300">{role}</div>}
      </div>
    </div>
  );
};
