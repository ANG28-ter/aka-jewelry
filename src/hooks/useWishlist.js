import { useEffect, useState } from "react";

// 🌐 GLOBAL storage (bukan local state)
let _wishlist = [];
let subscribers = [];

function notify() {
  subscribers.forEach((fn) => fn([..._wishlist]));
}

export default function useWishlist() {
  const [wishlist, setWishlist] = useState(_wishlist);

  // subscribe changes
  useEffect(() => {
    const handler = (data) => setWishlist(data);
    subscribers.push(handler);

    // initial load from localStorage
    const saved = localStorage.getItem("wishlist");
    if (saved) {
      _wishlist = JSON.parse(saved);
      notify();
    }

    return () => {
      subscribers = subscribers.filter((fn) => fn !== handler);
    };
  }, []);

  // persist to localStorage
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const toggleWishlist = (product) => {
    const exists = _wishlist.some((x) => x.id === product.id);

    if (exists) {
      _wishlist = _wishlist.filter((x) => x.id !== product.id);
    } else {
      _wishlist = [..._wishlist, product];
    }

    notify();
  };

  const isWished = (id) => _wishlist.some((x) => x.id === id);

  return { wishlist, toggleWishlist, isWished };
}
