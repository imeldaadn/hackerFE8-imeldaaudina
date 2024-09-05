import { Component } from "react";
import styles from "./cycle.module.css";

// Memakai class component
class Products extends Component { // class induk Component
  constructor(props) { // untuk menginisialisasi state atau menjalankan kode pertama kali
    super(props); // harus memanggil super(props) agar class induk Component bisa mengakses this.props
    this.state = { // State adalah data internal yang bisa diubah oleh komponen itu sendiri.
      loading: false,
      products: [],
      counter: 0,
      params: {
        limit: 9,
        skip: 0,
      },
    };
    this.prevSkip = 0; // Track the previous skip value
  }

  async fetchProducts(params) { // Fetch data dari API
    const { limit = 10, skip = 0 } = params; // seberapa banyak data yang akan diambil dan dari mana mulai mengambilnya.
    try {
      this.setState({ loading: true }); 
      const result = await fetch( // mengambil data dari API
        `https://dummyjson.com/products?limit=${limit}&skip=${skip}`
      );
      const data = await result.json(); // mengubah data itu menjadi format yang bisa dimengerti oleh JavaScript (format JSON)
      this.setState({ products: data.products }); // menyimpan data product ke dalam state bernama products
    } catch (error) {
      console.log("error > ", error);
    } finally {
      this.setState({ loading: false }); // kita memberitahu aplikasi bahwa sudah tidak lagi memuat, jadi status loading diubah menjadi false.
    }
  }

  async componentDidMount() {
    this.fetchProducts(this.state.params); // ketika aplikasi sudah muncul di layar, kita langsung memanggil produk untuk ditampilkan
  }

  async componentDidUpdate(prevProps, prevState) {
    if (this.state.params.skip !== prevState.params.skip) { // cek apakah nilai skip sudah berubah, kalau berubah kita ambil produk baru di halaman baru
      this.fetchProducts(this.state.params); 
    }
  }

  render() {
    return (
      <div className={styles.container}>
        <h1 className={styles.heading}>Products</h1>
        <div>
          {this.state.loading ? (
            "loading..."
          ) : (
            <div className={styles.productsContainer}> {/* menampilkan data produk */}
              {this.state.products?.map((item, idx) => (
                <div key={idx} className={styles.productsItem}> {/* menampilkan produk sesuai dg index atau memakai card */}
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
              this.setState((state) => ({ // mengubah nilai skip ke halaman sebelumnya dengan mengurangi 9
                ...state,
                params: {
                  ...state.params,
                  skip: Math.max(state.params.skip - 9, 0),
                },
              }))
            }
          >
            Prev
          </button>
          <button
            type="button"
            onClick={() =>
              this.setState((state) => ({ // mengubah nilai skip ke halaman berikutnya dengan menambah 9
                ...state,
                params: {
                  ...state.params,
                  skip: state.params.skip + 9,
                },
              }))
            }
          >
            Next
          </button>
        </div>
      </div>
    );
  }
}

export default Products;
