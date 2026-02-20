import { Navigate } from "react-router-dom";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";

const ProtectedRoute = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    // Listen for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });
    return () => unsubscribe();
  }, []);

  // While checking the auth state, show nothing or a loader
  if (isLoggedIn === null) return <div>Loading...</div>;

  // If not logged in, redirect to the Login page
  return isLoggedIn ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
