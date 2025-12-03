export const Loader = ({ size = 40 }) => {
  return (
    <div className="flex items-center justify-center p-6">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="animate-spin"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
      >
        <circle
          cx="12"
          cy="12"
          r="10"
          strokeWidth="4"
          className="text-gray-700/40"
        />
        <path
          d="M22 12a10 10 0 00-10-10"
          strokeWidth="4"
          className="text-blue-500"
        />
      </svg>
    </div>
  );
};
