import { useEffect, useState } from "react";
import CarCard from "../components/CarCard";
import Navbar from "../components/Navbar";

const Home = () => {
  const [cars, setCars] = useState([]);
  const [filters, setFilters] = useState({
    brand: "",
    fuelType: "",
    minPrice: "",
    maxPrice: "",
    sort: "",
  });
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const carsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch(
         `${import.meta.env.VITE_API_URL}/cars`
        );
        const data = await res.json();

        let filteredCars = data;

        if (filters.brand) {
          filteredCars = filteredCars.filter(
            (car) => car.brand.toLowerCase() === filters.brand.toLowerCase()
          );
        }

        if (filters.fuelType) {
          filteredCars = filteredCars.filter(
            (car) =>
              car.fuelType.toLowerCase() === filters.fuelType.toLowerCase()
          );
        }

        if (filters.minPrice) {
          filteredCars = filteredCars.filter(
            (car) => car.price >= +filters.minPrice
          );
        }

        if (filters.maxPrice) {
          filteredCars = filteredCars.filter(
            (car) => car.price <= +filters.maxPrice
          );
        }

        if (filters.sort === "lowToHigh") {
          filteredCars = [...filteredCars].sort((a, b) => a.price - b.price);
        } else if (filters.sort === "highToLow") {
          filteredCars = [...filteredCars].sort((a, b) => b.price - a.price);
        }

        setCurrentPage(1);
        setCars(filteredCars);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [filters]);

  const indexOfLastCar = currentPage * carsPerPage;
  const indexOfFirstCar = indexOfLastCar - carsPerPage;
  const currentCars = cars.slice(indexOfFirstCar, indexOfLastCar);
  const totalPages = Math.ceil(cars.length / carsPerPage);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      <Navbar />
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">🚗 Explore Cars</h2>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          <input
            name="brand"
            placeholder="Brand (e.g. Honda)"
            value={filters.brand}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <select
            name="fuelType"
            value={filters.fuelType}
            onChange={handleChange}
            className="border p-2 rounded"
          >
            <option value="">Fuel Type</option>
            <option value="Petrol">Petrol</option>
            <option value="Diesel">Diesel</option>
            <option value="Electric">Electric</option>
          </select>

          <input
            type="number"
            name="minPrice"
            placeholder="Min Price"
            value={filters.minPrice}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <input
            type="number"
            name="maxPrice"
            placeholder="Max Price"
            value={filters.maxPrice}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <select
            name="sort"
            value={filters.sort}
            onChange={handleChange}
            className="border p-2 rounded"
          >
            <option value="">Sort by Price</option>
            <option value="lowToHigh">Low → High</option>
            <option value="highToLow">High → Low</option>
          </select>
        </div>

        {loading ? (
          <p>Loading cars...</p>
        ) : currentCars.length === 0 ? (
          <p>No cars match the filters.</p>
        ) : (
          <>
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {currentCars.map((car) => (
                <CarCard key={car.id} car={car} />
              ))}
            </div>

            <div className="flex justify-center mt-6 space-x-4">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
              >
                ⬅ Prev
              </button>
              <span className="px-4 py-2">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
              >
                Next ➡
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Home;
