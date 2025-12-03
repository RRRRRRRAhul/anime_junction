import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="w-full bg-gray-800 text-white p-4 shadow-md flex items-center justify-between">
      {/* Logo */}
      <div className="flex items-center gap-3 ml-5">
        <Link to="/" className="text-3xl font-bold hover:text-green-400 cursor-pointer">
          AnimeHub
        </Link>
      </div>

      {/* Navigation Links */}
      <ul className="hidden sm:flex gap-4 text-sm mr-10">
        <li>
          <Link to="/" className="hover:text-blue-400 cursor-pointer">
            Home
          </Link>
        </li>
        <li>
          <Link to="/popular" className="hover:text-blue-400 cursor-pointer">
            Popular
          </Link>
        </li>
        <li>
          <Link to="/top-rated" className="hover:text-blue-400 cursor-pointer">
            Top Rated
          </Link>
        </li>
        <li>
          <Link to="/seasonal" className="hover:text-blue-400 cursor-pointer">
            Ongoing
          </Link>
        </li>
        <li>
          <Link to="/trending" className="hover:text-blue-400 cursor-pointer">
            Trending
          </Link>
        </li>
      </ul>
    </nav>
  );
};
