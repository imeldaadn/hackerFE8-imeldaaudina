import { createContext, useState } from 'react';
import PropTypes from 'prop-types'; // library yang digunakan untuk memvalidasi tipe data yang diterima oleh properti

export const ThemeContext = createContext(); // membuat context baru dengan nama ThemeContext

// ThemeProvider adalah komponen yang menyediakan state tema (`theme`) dan fungsi `toggleTheme` kepada semua komponen yang berada di dalamnya (`children`). 
// Ini memungkinkan komponen lain untuk mengakses dan mengubah tema (light atau dark) tanpa perlu mengoper prop secara manual.
const ThemeProvider = ({ children }) => { 
    const lightModeMediaQuery = window.matchMedia('(prefers-color-scheme: light)');
    const mode = lightModeMediaQuery.matches ? 'light' : 'dark';
  
    const [theme, setTheme] = useState('mode'); // komponen memiliki state `theme` yang berisi nilai awal `light` dan fungsi `toggleTheme` yang akan mengubah nilai `theme` dari `light` ke `dark` atau sebaliknya.

    const toggleTheme = () => { // fungsi `toggleTheme` akan memanggil fungsi `setTheme` dengan parameter berupa kondisi jika `theme` sama dengan `light` maka akan mengubahnya menjadi `dark` dan sebaliknya.
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    return (
        // ThemeProvider akan menyediakan state `theme` dan fungsi `toggleTheme` ke semua komponen yang berada di dalamnya.
        <ThemeContext.Provider value={{ theme, toggleTheme }}> 
            {children}
        </ThemeContext.Provider>
    );

    ThemeProvider.propTypes = { //opsional, tp lebih baik ada karena dapat mespesifikasikan tipe data yang diterima
        children: PropTypes.node.isRequired,
    };
};

export default ThemeProvider;

