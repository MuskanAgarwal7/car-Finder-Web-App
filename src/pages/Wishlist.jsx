import { useEffect, useState } from "react";
import { getWishlist, removeFromWishlist } from "../utils/wishlist";
import CarCard from "../components/CarCard";
import Navbar from "../components/Navbar";

const Wishlist = () => {
  const [wishlistCars, setWishlistCars] = useState([]);

  useEffect(() => {
    const data = getWishlist();
    setWishlistCars(data);
  }, []);

  const handleRemove = (id) => {
    removeFromWishlist(id);
    setWishlistCars((prev) => prev.filter((car) => car.id !== id));
  };

  return (
    <>
      <Navbar />
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">❤️ Your Wishlist</h2>

        {wishlistCars.length === 0 ? (
          <p>No cars in wishlist.</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {wishlistCars.map((car) => (
              <div key={car.id} className="relative">
                <CarCard car={car} />
                <button
                  onClick={() => handleRemove(car.id)}
                  className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 text-sm rounded"
                >
                  ❌ Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Wishlist;


