import React, { useEffect, useState } from "react";
import "./index.css";
import { BeatLoader } from "react-spinners";

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
}

const ProductCards: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    description: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    price: "",
    description: "",
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    setIsLoading(true);
    fetch("https://auth-rg69.onrender.com/api/products/All")
      .then((res) => res.json())
      .then((data: Product[]) => {
        setProducts(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.error("Serverdan xato keldi:", error);
      });
  };

  const handleProductDelete = async (elId: string) => {
    const a = window.confirm("Rostdam ham bu mahsultni o'chirmochimisz");
    if (a) {
      try {
        const response = await fetch(
          `https://auth-rg69.onrender.com/api/products/${elId}`,
          {
            method: "DELETE",
          }
        );
        if (!response.ok) {
          throw new Error("Serverdan xato keldi");
        }
        const updatedProducts = products.filter(
          (product) => product.id !== elId
        );
        setProducts(updatedProducts);
      } catch (error) {
        console.error("Xatolik yuz berdi:", error);
      }
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFormData({
      name: "",
      price: 0,
      description: "",
    });
    setErrors({
      name: "",
      price: "",
      description: "",
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      name: "",
      price: "",
      description: "",
    };

    if (formData.name.trim() === "") {
      newErrors.name = "Mahsulot nomini kiriting";
      isValid = false;
    }

    if (formData.price <= 0) {
      newErrors.price = "Narxi musbat son bo'lishi kerak";
      isValid = false;
    }

    if (formData.description.trim() === "") {
      newErrors.description = "Mahsulot tavsifini kiriting";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleAddProduct = async () => {
    if (validateForm()) {
      setIsLoading(true);
      try {
        const response = await fetch(
          "https://auth-rg69.onrender.com/api/products",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );

        if (!response.ok) {
          throw new Error("Serverdan xato keldi");
        }

        await fetchProducts();
        closeModal();
      } catch (error) {
        console.error("Xatolik yuz berdi:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      <div
        onClick={closeModal}
        className="modal"
        style={{ display: isModalOpen ? "block" : "none" }}
      >
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <span className="close" onClick={closeModal}>
            &times;
          </span>
          <h2>Mahsulot qo'shish</h2>
          <form className="modal-form">
            <input
              type="text"
              name="name"
              placeholder="Mahsulot nomi"
              value={formData.name}
              onChange={handleChange}
              required
            />
            {errors.name && <p className="error">{errors.name}</p>}
            <input
              type="number"
              name="price"
              placeholder="Narxi"
              value={formData.price}
              onChange={handleChange}
              required
            />
            {errors.price && <p className="error">{errors.price}</p>}
            <input
              type="text"
              name="description"
              placeholder="Tavsif"
              value={formData.description}
              onChange={handleChange}
              required
            />
            {errors.description && (
              <p className="error">{errors.description}</p>
            )}
            <button
              type="button"
              onClick={handleAddProduct}
              disabled={isLoading}
            >
              {isLoading ? <BeatLoader color="#fff" size={8} /> : "Qo'shish"}
            </button>
          </form>
        </div>
      </div>
      <button className="modal-button" onClick={openModal}>
        Mahsulot qo'shish
      </button>
      <div className="hero-section" onClick={closeModal}>
        {isLoading ? (
          <div className="loader-wrapper">
            <BeatLoader color="#36D7B7" size={30} />
          </div>
        ) : (
          <div className="card-grid">
            {products.map((product, index) => (
              <div key={index} className="card">
                <svg
                  onClick={() => {
                    handleProductDelete(product.id);
                  }}
                  className="deleteIcon"
                  width={35}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path
                    d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z"
                    stroke="white"
                    strokeWidth="32"
                  />
                </svg>
                <div
                  className="card__background"
                  style={{
                    backgroundImage: `url(https://picsum.photos/id/${index}/200/300)`,
                  }}
                ></div>

                <div className="card__content">
                  <p className="card__category">{product.name}</p>
                  <p
                    className="card__category"
                    style={{ color: "white", fontSize: "16px" }}
                  >
                    ${product.price}
                  </p>
                  <h3 className="card__heading">{product.description}</h3>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default ProductCards;
