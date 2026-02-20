import { LuTrash2, LuPlus, LuMinus, LuShoppingBag } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import "./index.css";

const Cart = ({ cartList, setCartList }) => {
  const navigate = useNavigate();

  // Dynamic Calculation of Total
  const totalAmount = cartList.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  const incrementQuantity = (id) => {
    setCartList((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  };

  const decrementQuantity = (id) => {
    setCartList((prev) =>
      prev.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      ),
    );
  };

  const removeItem = (id) => {
    setCartList((prev) => prev.filter((item) => item.id !== id));
  };

  if (cartList.length === 0) {
    return (
      <div className="empty-cart-container">
        <img
          src="https://img.freepik.com/free-vector/hand-drawn-no-data-concept_52683-127823.jpg"
          alt="empty cart"
          className="empty-cart-img"
        />
        <h1 className="cart-heading">Your bag is empty</h1>
        <p className="check-out-description">
          Looks like you haven't added any exotic treats yet!
        </p>
        <button
          className="proceed-btn"
          style={{ maxWidth: "250px" }}
          onClick={() => navigate("/landing")}
        >
          Back to Shop
        </button>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h1 className="cart-heading">Your Shopping Bag</h1>

      <div className="items-and-checkout-container">
        {/* Left Side: Product Grid */}
        <ul className="checkout-cards-container">
          {cartList.map((item) => (
            <li key={item.id} className="checkout-card">
              <div className="image-item-container">
                <img
                  src={item.image}
                  alt={item.name}
                  className="checkout-product-image"
                />
              </div>

              <div className="product-info-container">
                <h3 className="checkout-product-name">{item.name}</h3>
                <p className="checkout-product-brand">{item.origin}</p>
              </div>

              <div className="cart-controls-row">
                <p className="checkout-product-price">
                  ${item.price.toFixed(2)}
                </p>

                <div className="quantity-controls">
                  <button
                    className="qty-btn"
                    onClick={() => decrementQuantity(item.id)}
                  >
                    <LuMinus />
                  </button>
                  <span className="qty-number">{item.quantity}</span>
                  <button
                    className="qty-btn"
                    onClick={() => incrementQuantity(item.id)}
                  >
                    <LuPlus />
                  </button>
                </div>

                <button
                  className="delete-icon-btn"
                  onClick={() => removeItem(item.id)}
                >
                  <LuTrash2 />
                </button>
              </div>
            </li>
          ))}
        </ul>

        {/* Right Side: Order Summary */}
        <div className="checkout-container">
          <h2 className="total-amount-heading">Order Summary</h2>

          <div className="check-out-description">
            <div className="summary-item">
              <span className="summary-label">Subtotal</span>
              <span className="summary-value">${totalAmount.toFixed(2)}</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Shipping</span>
              <span className="span-free">FREE</span>
            </div>
          </div>

          <hr className="separator" />

          <div className="final-total">
            <span className="total-label">Total</span>
            <span className="total-value">${totalAmount.toFixed(2)}</span>
          </div>

          <button className="proceed-btn">Proceed to Checkout</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
