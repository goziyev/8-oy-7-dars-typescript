import React from "react";
import "./index.css";

const ProductCards: React.FC = () => {
  return (
    <div className="hero-section">
      <div className="card-grid">
        <div className="card">
          <div
            className="card__background"
            style={{
              backgroundImage:
                "url(https://images.unsplash.com/photo-1557177324-56c542165309?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80)",
            }}
          ></div>
          <div className="card__content">
            <p className="card__category">Category</p>
            <h3 className="card__heading">Example Card Heading</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCards;
