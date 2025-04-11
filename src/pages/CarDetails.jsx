import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

const CarDetails = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCar = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/cars/${id}`
        );
        const data = await res.json();
        setCar(data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch car details:", err);
        setLoading(false);
      }
    };

    fetchCar();
  }, [id]);

  if (loading) return <p className="p-4">Loading...</p>;
  if (!car) return <p className="p-4 text-red-500">Car not found.</p>;

  return (
    <>
      <Navbar />
      <div className="p-6 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">{car.name}</h1>
        <img
          src={car.image}
          alt={car.name}
          className="w-full h-64 object-cover mb-6 rounded"
        />
        <ul className="text-lg space-y-2">
          <li>
            <strong>Brand:</strong> {car.brand}
          </li>
          <li>
            <strong>Price:</strong> ₹{car.price}
          </li>
          <li>
            <strong>Fuel Type:</strong> {car.fuelType}
          </li>
          <li>
            <strong>Seating Capacity:</strong> {car.seatingCapacity}
          </li>
          <li>
            <strong>Description:</strong> {car.description || "N/A"}
          </li>
        </ul>
      </div>
    </>
  );
};

export default CarDetails;
