import { AnimeCard } from "./AnimeCard";

export const AnimeList = ({ list, onItemClick }) => {
  if (!Array.isArray(list) || list.length === 0) {
    return <div className="p-6 text-center text-gray-300">No anime found.</div>;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 p-4">
      {list.map((item) => (
        <AnimeCard key={item.mal_id} anime={item} onClick={onItemClick} />
      ))}
    </div>
  );
};
