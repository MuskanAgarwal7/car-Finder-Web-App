import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white px-4 py-3 flex justify-between">
      <Link to="/" className="font-bold text-xl">
        🚗 CarFinder
      </Link>
      <div className="space-x-4">
        <Link to="/" className="hover:underline">
          Home
        </Link>
        <Link to="/wishlist" className="hover:underline">
          Wishlist
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
