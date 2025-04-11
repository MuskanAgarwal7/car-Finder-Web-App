export const getWishlist = () => {
    const data = localStorage.getItem("wishlist");
    return data ? JSON.parse(data) : [];
  };
  
  export const addToWishlist = (car) => {
    const current = getWishlist();
    const updated = [...current, car];
    localStorage.setItem("wishlist", JSON.stringify(updated));
  };
  
  export const removeFromWishlist = (id) => {
    const current = getWishlist();
    const updated = current.filter((car) => car.id !== id);
    localStorage.setItem("wishlist", JSON.stringify(updated));
  };
  
  export const isInWishlist = (id) => {
    const current = getWishlist();
    return current.some((car) => car.id === id);
  };
  