import { useEffect, useContext } from 'react';
import { ThemeContext } from './context/ThemeContext';

export default function Component() { // komponen ini akan mengakses state `theme` dan fungsi `toggleTheme` dari ThemeContext
  const { theme, toggleTheme } = useContext(ThemeContext);

  useEffect(() => { // useEffect ini akan menambahkan class `light-mode` atau `dark-mode` ke elemen dengan id `root` berdasarkan nilai `theme` yang diterima (css).
    const root = document.getElementById('root');

    if (theme === 'light') { // jika `theme` sama dengan `light` maka akan menambahkan class `light-mode` dan menghapus class `dark-mode` dari elemen dengan id `root`.
      root.classList.add('light-mode');
      root.classList.remove('dark-mode');
    } else {
      root.classList.add('dark-mode');
      root.classList.remove('light-mode');
    }
  }, [theme]);

  const handleChangeTheme = () => {
    toggleTheme();
  };

  return (
    <div className="card">
      <h1>Hands-on React Context</h1>
      <p>Current Theme: {theme}</p>
      <button onClick={handleChangeTheme}> {/* ketika button di klik maka akan memanggil fungsi `handleChangeTheme` */}
        Change Theme
      </button>
    </div>
  )
}
