import React, { useState } from "react";
import "./index.css";
import { auth, googleProvider } from "../../firebase";
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { LuEye, LuEyeOff, LuLeaf } from "react-icons/lu";

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false); // Toggle state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/landing");
    } catch (error) {
      alert(error.message);
    }
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    try {
      if (isSignUp) {
        // SIGN UP LOGIC
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password,
        );
        // Save the Name to Firebase Profile
        await updateProfile(userCredential.user, { displayName: name });
      } else {
        // LOGIN LOGIC
        await signInWithEmailAndPassword(auth, email, password);
      }
      navigate("/landing");
    } catch (error) {
      console.error("Auth error:", error);
      alert(error.message);
    }
  };

  return (
    <div className="login-layout">
      {/* LEFT BRAND PANEL (Layout Unchanged) */}
      <section className="login-brand">
        <div className="brand-content">
          <div className="brand-logo">
            <LuLeaf className="leaf-icon" />
            <h3>Exotica</h3>
          </div>
          <h1>
            {isSignUp ? "Join the" : "Taste the"} <br />
            <span>{isSignUp ? "Family." : "Extraordinary."}</span>
          </h1>
          <p>
            The world's rarest fruits and vegetables, delivered fresh to your
            doorstep.
          </p>
        </div>
      </section>

      {/* RIGHT FORM CARD (Layout Unchanged) */}
      <section className="login-form-wrapper">
        <div className="login-card">
          <div className="form-header">
            <h2>{isSignUp ? "Create Account" : "Welcome Back"}</h2>
            <p>
              {isSignUp
                ? "Start your healthy journey with us."
                : "Please enter your details to sign in."}
            </p>
          </div>

          <form onSubmit={handleAuth} className="auth-form">
            {/* Dynamic Name Field for Sign Up */}
            {isSignUp && (
              <div className="input-field">
                <label>Full Name</label>
                <input
                  type="text"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            )}

            <div className="input-field">
              <label>Email Address</label>
              <input
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="input-field">
              <label>Password</label>
              <div className="password-input-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="password-toggle-btn"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <LuEyeOff /> : <LuEye />}
                </button>
              </div>
            </div>

            <button className="main-login-btn">
              {isSignUp ? "Join the Garden" : "Sign In"}
            </button>
          </form>

          <div className="app-divider">
            <span>or</span>
          </div>

          <button onClick={handleGoogleLogin} className="google-social-btn">
            <img
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              alt="Google"
            />
            Continue with Google
          </button>

          <p className="signup-redirect">
            {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
            <span onClick={() => setIsSignUp(!isSignUp)}>
              {isSignUp ? "Login" : "Join the Garden"}
            </span>
          </p>
        </div>
      </section>
    </div>
  );
};

export default Login;
