import React from "react";
import { useNavigate } from "react-router-dom";
import { LuHeart, LuArrowLeft } from "react-icons/lu";
import Card from "../../components/Card";
import "./index.css";

const Wishlist = ({ wishlist, toggleWishlist, addCartItem }) => {
  const navigate = useNavigate();

  return (
    <div className="wishlist-page-container">
      <div className="wishlist-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <LuArrowLeft /> Back
        </button>
        <h1 className="wishlist-heading">My Saved Garden</h1>
      </div>

      {wishlist.length === 0 ? (
        <div className="empty-wishlist">
          <LuHeart size={60} className="empty-heart-icon" />
          <h2 className="wishlist-des-1">Your wishlist is empty</h2>
          <p className="wishlist-des-2">
            Start exploring our rare collection and save your favorites!
          </p>
          <button className="shop-now-btn" onClick={() => navigate("/landing")}>
            Explore Products
          </button>
        </div>
      ) : (
        <div className="wishlist-grid">
          {wishlist.map((product) => (
            <Card
              key={product.id}
              product={product}
              addCartItem={addCartItem}
              wishlist={wishlist}
              toggleWishlist={toggleWishlist}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
