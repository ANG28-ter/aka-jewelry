import { create } from "zustand";

export const useWishlistStore = create((set, get) => ({
  wishlist: JSON.parse(localStorage.getItem("wishlist")) || [],

  toggleWishlist: (product) => {
    const { wishlist } = get();
    const exists = wishlist.some((p) => p.id === product.id);

    const newList = exists
      ? wishlist.filter((p) => p.id !== product.id)
      : [...wishlist, product];

    localStorage.setItem("wishlist", JSON.stringify(newList));
    set({ wishlist: newList });
  },

  isWished: (id) => {
    return get().wishlist.some((p) => p.id === id);
  },
}));
