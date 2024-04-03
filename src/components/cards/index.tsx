import React, { useEffect, useState } from "react";
import "./index.css";

const ProductCards: React.FC = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://auth-rg69.onrender.com/api/products/All")
      .then((res) => res.json())
      .then((el) => {
        console.log(el);
        setProducts(el);
      });
  }, []);

  const handleProductDelete = async (elId) => {
    const a = confirm("Rostdam ham bu mahsultni o'chirmochimisz");
    if (a) {
      try {
        const response = await fetch(
          `https://auth-rg69.onrender.com/api/products/${elId}`,
          {
            method: "DELETE",
          }
        );
        console.log("Mahsulot o'chirildi");
      } catch (error) {
        console.error("Xatolik yuz berdi:", error);
      }
    }
  };
  return (
    <div className="hero-section">
      <div className="card-grid">
        {products &&
          products.map((el, index) => {
            return (
              <div key={index} className="card">
                <svg
                  onClick={() => {
                    handleProductDelete(el.id);
                  }}
                  className="deleteIcon"
                  width={35}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z" />
                </svg>
                <div
                  className="card__background"
                  style={{
                    backgroundImage: `url(https://picsum.photos/id/${index}/200/300)`,
                  }}
                ></div>
                <div className="card__content">
                  <p className="card__category">{el.name}</p>
                  <p
                    className="card__category"
                    style={{ color: "white", fontSize: "16px" }}
                  >
                    ${el.price}
                  </p>
                  <h3 className="card__heading">{el.description}</h3>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ProductCards;
