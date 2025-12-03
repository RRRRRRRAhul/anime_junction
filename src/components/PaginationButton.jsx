export const PaginationButtons = ({ page, setPage, hasNext = true }) => {
  const prev = () => setPage && setPage(Math.max(1, page - 1));
  const next = () => setPage && setPage(page + 1);

  return (
    <div className="flex items-center justify-center gap-3 p-4">
      <button
        onClick={prev}
        disabled={page === 1}
        className="px-4 py-2 bg-white/5 text-white rounded-lg disabled:opacity-40 cursor-pointer"
      >
        Prev
      </button>

      <span className="text-sm text-gray-300">Page {page}</span>

      <button
        onClick={next}
        disabled={!hasNext}
        className="px-4 py-2 bg-white/5 text-white rounded-lg disabled:opacity-40 cursor-pointer"
      >
        Next
      </button>
    </div>
  );
};
