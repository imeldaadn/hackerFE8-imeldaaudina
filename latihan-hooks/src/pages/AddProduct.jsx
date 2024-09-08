import { useState } from "react";
import styles from "./cycle.module.css";

const AddProduct = () => {
  // State untuk menyimpan data formulir
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    brand: "",
    sku: "",
    weight: "",
  });

  // Handler untuk mengubah state berdasarkan input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log(`${name}: ${value}`); // Debug: menampilkan perubahan input di console
  };

  // Handler untuk menangani pengiriman formulir
  const handleSubmit = (e) => {
    e.preventDefault(); // Mencegah refresh halaman
    console.log("Submitted data:", formData); // Tampilkan data formulir di console
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Add New Product</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            
          />
        </label>
        <label>
          Description:
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            
          />
        </label>
        <label>
          Price:
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            
          />
        </label>
        <label>
          Brand:
          <input
            type="text"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            
          />
        </label>
        <label>
          SKU:
          <input
            type="text"
            name="sku"
            value={formData.sku}
            onChange={handleChange}
            
          />
        </label>
        <label>
          Weight:
          <input
            type="number"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddProduct;
