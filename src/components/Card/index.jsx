import { useNavigate } from "react-router-dom";
import { LuHeart } from "react-icons/lu";
import "./index.css";

const Card = (props) => {
  const { product, addCartItem, wishlist, toggleWishlist } = props;
  const { id, name, image, price, status, category, origin } = product;
  const navigate = useNavigate();

  const isWishlisted = wishlist?.some((item) => item.id === id);

  const addItem = (e) => {
    e.stopPropagation();
    addCartItem(product);
  };

  const onFavorite = (e) => {
    e.stopPropagation(); // Stops the navigation to details page
    toggleWishlist(product);
  };

  return (
    <li className="product-card" onClick={() => navigate(`/product/${id}`)}>
      <div className="image-container">
        <img className="img" src={image} alt={name} />
        {status && <span className="status-badge">{status}</span>}

        {/* Fixed Wishlist Button Position */}
        <button
          type="button"
          className={`wishlist-btn ${isWishlisted ? "active" : ""}`}
          onClick={onFavorite}
          aria-label="Add to wishlist"
        >
          <LuHeart
            fill={isWishlisted ? "#ef4444" : "none"}
            stroke={isWishlisted ? "#ef4444" : "#1b3d2f"}
          />
        </button>
      </div>

      <div className="product-info-container">
        <h1 className="product-name">{name}</h1>
        <p className="product-origin">{origin}</p>
        <p className="product-category">{category}</p>

        <div className="price-action-row">
          <span className="price">${price.toFixed(2)}</span>
          <button className="add-to-cart-btn" type="button" onClick={addItem}>
            + Add
          </button>
        </div>
      </div>
    </li>
  );
};

export default Card;
