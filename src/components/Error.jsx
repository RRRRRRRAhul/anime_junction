export const Error = ({ message }) => {
  return (
    <div className="p-6 bg-red-900/30 text-red-200 rounded-md m-4">
      <strong className="block">Error</strong>
      <p className="text-sm mt-1">
        {message ?? "Something went wrong while fetching data."}
      </p>
    </div>
  );
};
