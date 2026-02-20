import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LuLeaf } from "react-icons/lu";
import Login from "./pages/Login";
import LandingPage from "./pages/LandingPage";
import Navbar from "./components/Navbar";
import Cart from "./components/Cart";
import ProtectedRoute from "./components/ProtectedRoute";
import { db } from "./firebase";
import { collection, getDocs, writeBatch, doc } from "firebase/firestore";
import ProductDetail from "./pages/productDetails";
import Wishlist from "./pages/Wishlist";

import "./App.css";

const productsData = [
  {
    id: 1,
    name: "Purple Dragon Fruit",
    origin: "Vietnam",
    price: 8.5,
    category: "fruit",
    status: "New",
    image:
      "https://www.bhg.com/thmb/8_j1ruTfWBDXxwNmi8FIKcyXyH0=/4000x0/filters:no_upscale():strip_icc()/BHG-what-is-dragon-fruit-hero-01_9os_zIWTKn69t8V0Bu0i2c-52c3fd77ee0e4cd8b7d8cb6e17fe2868.jpg",
  },
  {
    id: 2,
    name: "Rambutan",
    origin: "Thailand",
    price: 12.0,
    category: "fruit",
    status: "Best Seller",
    image:
      "https://images.unsplash.com/photo-1521503862198-2ae9a997bbc9?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: 3,
    name: "Romanesco Broccoli",
    origin: "Italy",
    price: 6.75,
    category: "vegetable",
    status: "Seasonal",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmzBCerSZ9ooUNsO6T5HKA69A8pIMK6V2-25nFaOPTBiClHmDMU2fE1rqihmSzwkDNhDs44iNCFmnNGbJPU_eeejyWhjh6FM1cWUMTIDS-rw&s=10",
  },
  {
    id: 4,
    name: "Purple Carrots",
    origin: "Turkey",
    price: 4.5,
    category: "vegetable",
    status: "Organic",
    image:
      "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: 5,
    name: "Lychees",
    origin: "Madagascar",
    price: 9.25,
    category: "fruit",
    status: "New",
    image:
      "https://www.allrecipes.com/thmb/f97jpLOG3lw2p2i0RIN_97qt1sc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/what-is-lychee-fruit-3x2-1-bb3f004f69804b4192a35481f80d1d48.jpg",
  },
  {
    id: 6,
    name: "Oyster Mushrooms",
    origin: "Oregon, USA",
    price: 15.0,
    category: "vegetable",
    status: "Rare",
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=600",
  },
];

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [cartList, setCartList] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // FETCH DATA FROM FIRESTORE

  useEffect(() => {
    const initializeData = async () => {
      console.log("📡 Attempting to connect to Firestore...");

      // Safety Timeout: If it takes more than 10 seconds, force stop the loader
      const timeout = setTimeout(() => {
        if (loading) {
          console.error("⏰ Firestore connection timed out.");
          setLoading(false);
        }
      }, 10000);

      try {
        const productsCollection = collection(db, "products");
        const snapshot = await getDocs(productsCollection);

        console.log("✅ Snapshot received. Empty:", snapshot.empty);

        if (snapshot.empty) {
          console.log("🌱 Database empty, starting batch seed...");
          const batch = writeBatch(db);
          productsData.forEach((product) => {
            const newDocRef = doc(productsCollection);
            batch.set(newDocRef, product);
          });
          await batch.commit();
          console.log("✨ Seeding complete.");

          // Re-fetch after seeding
          const newSnapshot = await getDocs(productsCollection);
          const items = newSnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          setProducts(items);
        } else {
          const items = snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          setProducts(items);
          console.log("🍎 Products mapped to state:", items.length);
        }
      } catch (error) {
        console.error("❌ Firestore Initialization Error:", error.message);
        // You can add an alert here to see the error on your mobile/browser
        alert("Database Error: " + error.message);
      } finally {
        clearTimeout(timeout);
        setLoading(false); // FORCES the spinning to stop
        console.log("🏁 Loading sequence finished.");
      }
    };

    initializeData();
  }, []);

  // WISHLIST PERSISTENCE
  useEffect(() => {
    const saved = localStorage.getItem("exotica_wishlist");
    if (saved) setWishlist(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("exotica_wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const toggleWishlist = (product) => {
    const exists = wishlist.find((item) => item.id === product.id);
    if (exists) {
      setWishlist((prev) => prev.filter((item) => item.id !== product.id));
    } else {
      setWishlist((prev) => [...prev, product]);
    }
  };

  const addCartItem = (product) => {
    const isAlreadyInCart = cartList.find((item) => item.id === product.id);
    if (!isAlreadyInCart) {
      setCartList((prev) => [...prev, { ...product, quantity: 1 }]);
    } else {
      setCartList((prev) =>
        prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      );
    }
  };

  if (loading) {
    return (
      <div className="loader-wrapper">
        <div className="loader-content">
          <LuLeaf className="loader-leaf" />
          <h2 className="loader-logo">Exotica</h2>
          <div className="progress-bar">
            <div className="progress-fill"></div>
          </div>
          <p>Curating your exotic garden...</p>
        </div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        {/* Landing Page Route */}
        <Route
          path="/landing"
          element={
            <ProtectedRoute>
              <Navbar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                cartList={cartList}
                wishlist={wishlist}
              />
              <LandingPage
                products={products}
                searchTerm={searchTerm}
                addCartItem={addCartItem}
                wishlist={wishlist}
                toggleWishlist={toggleWishlist}
              />
            </ProtectedRoute>
          }
        />

        {/* Product Detail Route */}
        <Route
          path="/product/:id"
          element={
            <ProtectedRoute>
              <Navbar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                cartList={cartList}
                wishlist={wishlist}
              />
              <ProductDetail products={products} addCartItem={addCartItem} />
            </ProtectedRoute>
          }
        />

        {/* Cart Route */}
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Navbar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                cartList={cartList}
                wishlist={wishlist}
              />
              <Cart cartList={cartList} setCartList={setCartList} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/wishlist"
          element={
            <ProtectedRoute>
              <Navbar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                cartList={cartList}
                wishlist={wishlist}
              />
              <Wishlist
                wishlist={wishlist}
                toggleWishlist={toggleWishlist}
                addCartItem={addCartItem}
              />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
