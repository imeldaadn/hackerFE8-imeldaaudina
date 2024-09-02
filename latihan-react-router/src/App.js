import './App.css';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import { useState } from 'react';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './pages/ProtectedRoute';
import PageNotFound from './pages/PageNotFound';
import Overview from './pages/Overview';
import Stats from './pages/Stats';
import Users from './pages/Users';
import UserDetails from './pages/UserDetails';
// import UserProfile from './pages/UserProfile';
// import UserSettings from './pages/UserSettings';

function App() { // fungsi App sebagai root component 
  const [isLoggedIn, setisLoggedIn] = useState(false); // komponen, state isLoggedIn untuk mengecek apakah user sudah login atau belum

  const handleAuth = () => { // fungsi handleAuth untuk mengubah state isLoggedIn
    setisLoggedIn(!isLoggedIn); // mengubah state isLoggedIn ketika tombol login/logout di klik
  };

  return (
    // Router sebagai parent component yang membungkus semua komponen
    <Router> 
      <div className="App">
        <nav className="topnav"> {/* navigasi untuk menu*/}
          <div>
            <ul>
              <Link to="/">
                <li>Home</li>
              </Link>
              <Link to="/about">
                <li>About</li>
              </Link>
              <Link to="/contact">
                <li>Contact</li>
              </Link>
              {isLoggedIn && ( // menampilkan menu dashboard dan user profile jika user sudah login
                <>
                  <Link to="/dashboard">
                    <li>Dashboard</li>
                  </Link>
                  <Link to="/user">
                    <li>User Profile</li>
                  </Link>
                </>
              )}
            </ul>
            <button onClick={handleAuth}> {/* tombol login/logout yang akan memanggil fungsi handleAuth ketika di klik  */}
              {isLoggedIn ? 'Logout' : 'Login'} {/* menampilkan teks login atau logout sesuai dengan state isLoggedIn */}
            </button>
          </div>
        </nav>

        <Routes> {/* Routes sebagai komponen yang berisi semua rute */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<PageNotFound />} />
          <Route
            path="/dashboard/*" // rute dashboard yang memiliki rute anak yaitu overview dan stats.
            element={ // element ProtectedRoute yang berisi komponen Dashboard dan mengecek apakah user sudah login atau belum
              <ProtectedRoute
                element={<Dashboard />}
                isAuthenticated={isLoggedIn}
              />
            }>
            <Route path="overview" element={<Overview />} />
            <Route path="stats" element={<Stats />} />
          </Route>
          <Route
            path="/about"
            element={
              <ProtectedRoute
                element={<About />}
                isAuthenticated={isLoggedIn}
              />
            }
          />
          <Route
            path="/user/*"
            element={
              <ProtectedRoute
                element={<Users />}
                isAuthenticated={isLoggedIn}
              />
            }>
            {/* <Route path="details/:userId/*" element={<UserDetails />} /> */}
          </Route>

          <Route
            path="/user/details/:userId/*"
            element={
              <ProtectedRoute
                element={<UserDetails />}
                isAuthenticated={isLoggedIn}
              />
            }></Route>
          {/* Tambahkan rute login jika perlu */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
