import { useParams, useNavigate } from "react-router-dom";
import { LuArrowLeft, LuMapPin, LuShoppingBag } from "react-icons/lu";
import "./index.css";

const ProductDetail = ({ products, addCartItem }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find the specific product based on the ID in the URL
  const product = products.find((p) => p.id === id);

  if (!product)
    return <div className="loader-wrapper">Finding your fruit...</div>;

  return (
    <div className="detail-container">
      <button className="back-btn" onClick={() => navigate(-1)}>
        <LuArrowLeft /> Back
      </button>

      <div className="detail-content">
        <div className="detail-image-wrapper">
          <img src={product.image} alt={product.name} />
          <span className="detail-status">{product.status}</span>
        </div>

        <div className="detail-info">
          <span className="category-tag">{product.category}</span>
          <h1>{product.name}</h1>
          <div className="origin-row">
            <LuMapPin /> <span>Origin: {product.origin}</span>
          </div>
          <p className="description">
            Experience the unique flavors of {product.name}. Sourced directly
            from {product.origin}, this premium {product.category} is delivered
            fresh to maintain its exotic quality and taste.
          </p>

          <div className="price-section">
            <span className="price">${product.price.toFixed(2)}</span>
            <button
              className="add-to-bag-btn"
              onClick={() => addCartItem(product)}
            >
              <LuShoppingBag /> Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
