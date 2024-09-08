import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate untuk navigasi
import styles from "./cycle.module.css";

const Products = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [params, setParams] = useState({ limit: 9, skip: 0 });
  const navigate = useNavigate(); // Hook untuk navigasi ke halaman lain

  const fetchProducts = async (params) => {
    const { limit = 10, skip = 0 } = params;
    try {
      setLoading(true);
      const result = await fetch(
        `https://dummyjson.com/products?limit=${limit}&skip=${skip}`
      );
      const data = await result.json();
      setProducts(data.products);
    } catch (error) {
      console.log("error > ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(params);
  }, [params]);

  return (
    <div className={styles.container}>
      {/* Header untuk heading dan tombol */}
      <div className={styles.header}>
        <h1 className={styles.heading}>Products</h1>
        <button
          type="button"
          onClick={() => navigate("/products-function/add")}
          className={styles.createButton}
        >
          Create New Product
        </button>
      </div>

      <div>
        {loading ? (
          "loading..."
        ) : (
          <div className={styles.productsContainer}>
            {products?.map((item, idx) => (
              <div key={idx} className={styles.productsItem}>
                <img
                  className={styles.productsItemCover}
                  src={item.images?.[0]}
                  alt={`product-cover-${idx}`}
                />
                <span>{item.title}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className={styles.paginationContainer}>
        <button
          type="button"
          onClick={() =>
            setParams((prevParams) => ({
              ...prevParams,
              skip: Math.max(prevParams.skip - 9, 0),
            }))
          }
        >
          Prev
        </button>
        <button
          type="button"
          onClick={() =>
            setParams((prevParams) => ({
              ...prevParams,
              skip: prevParams.skip + 9,
            }))
          }
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Products;
