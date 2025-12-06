import { useState } from "react";
import { bracelets } from "../../data/bracelets";
import ProductCard from "./ProductCard";
import ProductModal from "./ProductModal";

import "../../styles/product.css";

export default function BraceletGrid() {
  const [selected, setSelected] = useState(null);
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState("right");

  const perPage = 3;
  const totalPage = Math.ceil(bracelets.length / perPage);

  const visibleProducts = bracelets.slice(
    page * perPage,
    page * perPage + perPage
  );

  const prevPage = () => {
    if (page > 0) {
      setDirection("left");
      setPage(page - 1);
    }
  };

  const nextPage = () => {
    if (page < totalPage - 1) {
      setDirection("right");
      setPage(page + 1);
    }
  };

  return (
    <div className="product-grid-wrapper">
      <div className={`product-grid slide-${direction}`} key={page}>
        {visibleProducts.map((item) => (
          <ProductCard
            key={item.id}
            product={item}
            onSelect={() => setSelected(item)}
          />
        ))}
      </div>

      {/* PAGINATION */}
      <div className="pagination-dots">
        <button className="pagination-arrow" onClick={prevPage}>
          ‹
        </button>

        {Array.from({ length: totalPage }).map((_, i) => (
          <button
            key={i}
            className={`pagination-number ${page === i ? "active" : ""}`}
            onClick={() => {
              setDirection(i > page ? "right" : "left");
              setPage(i);
            }}
          >
            {i + 1}
          </button>
        ))}

        <button className="pagination-arrow" onClick={nextPage}>
          ›
        </button>
      </div>

      {selected && (
        <ProductModal product={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}
