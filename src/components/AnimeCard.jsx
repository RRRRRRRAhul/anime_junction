export const AnimeCard = ({ anime }) => {
  // anime expected to have: mal_id, title, images.jpg.image_url, score
  return (
    <div className="bg-white/5 hover:bg-white/10 rounded-lg overflow-hidden shadow-sm transition-transform transform hover:scale-105">
      <img
        src={anime?.images?.jpg?.image_url}
        alt={anime?.title}
        className="w-full h-56 object-cover"
      />
      <div className="p-3">
        <h3 className="text-sm font-semibold text-white truncate">
          {anime?.title}
        </h3>
        <div className="flex items-center justify-between mt-2">
          <span className="text-xs text-gray-300">
            ⭐ {anime?.score ?? "N/A"}
          </span>
          <span className="text-xs text-gray-400">
            {anime?.type ?? "Anime"}
          </span>
        </div>

        {/* Anchor tag button to view anime details */}
        <a
          href={`/anime/${anime?.mal_id}`}
          className="mt-3 block text-center w-full bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold py-1 rounded"
        >
          View Details
        </a>
      </div>
    </div>
  );
};
