import { useState } from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full bg-gray-800 text-white p-4 shadow-md flex items-center justify-between">
      {/* Logo */}
      <div className="flex items-center gap-3 ml-5">
        <Link to="/" className="text-2xl font-bold hover:text-green-400">
          AnimeHub
        </Link>
      </div>

      {/* Hamburger Icon (mobile only) */}
      <button
        className="sm:hidden text-2xl mr-5"
        onClick={() => setOpen(!open)}
      >
        ☰
      </button>

      {/* Desktop Menu */}
      <ul className="hidden sm:flex gap-4 text-sm mr-10">
        <li>
          <Link to="/" className="hover:text-blue-400">
            Home
          </Link>
        </li>
        <li>
          <Link to="/popular" className="hover:text-blue-400">
            Popular
          </Link>
        </li>
        <li>
          <Link to="/top-rated" className="hover:text-blue-400">
            Top Rated
          </Link>
        </li>
        <li>
          <Link to="/seasonal" className="hover:text-blue-400">
            Ongoing
          </Link>
        </li>
        <li>
          <Link to="/trending" className="hover:text-blue-400">
            Trending
          </Link>
        </li>
      </ul>

      {/* Mobile Dropdown Menu */}
      {open && (
        <ul className="absolute top-16 right-4 bg-gray-700 p-4 rounded-lg flex flex-col gap-3 sm:hidden">
          <li>
            <Link to="/" onClick={() => setOpen(false)}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/popular" onClick={() => setOpen(false)}>
              Popular
            </Link>
          </li>
          <li>
            <Link to="/top-rated" onClick={() => setOpen(false)}>
              Top Rated
            </Link>
          </li>
          <li>
            <Link to="/seasonal" onClick={() => setOpen(false)}>
              Ongoing
            </Link>
          </li>
          <li>
            <Link to="/trending" onClick={() => setOpen(false)}>
              Trending
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
};
