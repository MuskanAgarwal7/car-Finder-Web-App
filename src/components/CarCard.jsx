import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const CarCard = ({ car }) => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(stored);
  }, []);

  const toggleWishlist = () => {
    let updated;
    if (wishlist.find((item) => item.id === car.id)) {
      updated = wishlist.filter((item) => item.id !== car.id);
    } else {
      updated = [...wishlist, car];
    }

    setWishlist(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
  };

  const isWishlisted = wishlist.some((item) => item.id === car.id);

  return (
    <div className="border rounded p-4 shadow hover:shadow-md transition">
      <Link to={`/car/${car.id}`}>
      <img src={car.image} alt={car.name} className="w-full h-40 object-cover mb-4" />
      <h3 className="text-lg font-bold">{car.name}</h3>
      <p>{car.brand}</p>
      <p>Fuel: {car.fuelType}</p>
      <p>₹{car.price}</p>
      </Link>

      <button
        onClick={toggleWishlist}
        className={`mt-2 px-3 py-1 rounded ${
          isWishlisted ? "bg-red-500 text-white" : "bg-gray-200"
        }`}
      >
        {isWishlisted ? "❤️ In Wishlist" : "🤍 Add to Wishlist"}
      </button>
    </div>
  );
};

export default CarCard;

