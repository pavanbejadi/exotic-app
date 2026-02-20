import { useState } from "react";
import Card from "../../components/Card";
import TabItem from "../../components/TabItem";
import NoResultsView from "../../components/NoresultsView";
import { auth } from "../../firebase";
import "./index.css";

const tabsList = [
  { tabId: "ALL", displayText: "All" },
  { tabId: "fruit", displayText: "Fruits" },
  { tabId: "vegetable", displayText: "Vegetables" },
  { tabId: "New", displayText: "New Arrivals" },
];

// Added wishlist and toggleWishlist to the props
const LandingPage = ({
  products,
  searchTerm,
  addCartItem,
  wishlist,
  toggleWishlist,
}) => {
  const user = auth.currentUser;
  const [activeTabId, setActiveTabId] = useState(tabsList[0].tabId);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesTab =
      activeTabId === "ALL" ||
      product.category === activeTabId ||
      product.status === activeTabId;
    return matchesSearch && matchesTab;
  });

  return (
    <div className="bg-container">
      <div className="hero-section">
        <div className="greeting-container">
          {user?.photoURL && (
            <img src={user.photoURL} alt="Profile" className="hero-avatar" />
          )}
          <h1 className="hero-heading">
            Welcome back,{" "}
            {user?.displayName
              ? user.displayName.split(" ")[0]
              : "Exotica User"}
            !
          </h1>
        </div>
        <p className="hero-description">
          From the Amazon to the Himalayas, delivered to you
        </p>
        <button className="shop-btn">Shop Now</button>
      </div>

      <ul className="btns-container">
        {tabsList.map((tab) => (
          <TabItem
            key={tab.tabId}
            tab={tab}
            activeTabIdChange={setActiveTabId}
            isActive={tab.tabId === activeTabId}
          />
        ))}
      </ul>

      <h1 className="category-heading">
        {searchTerm ? `Results for "${searchTerm}"` : "Categories"}
      </h1>

      <div className="cards-container">
        {filteredProducts.length === 0 ? (
          <NoResultsView onReset={() => setActiveTabId("ALL")} />
        ) : (
          filteredProducts.map((product) => (
            <Card
              key={product.id}
              product={product}
              addCartItem={addCartItem}
              /* Passing wishlist props to each Card */
              wishlist={wishlist}
              toggleWishlist={toggleWishlist}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default LandingPage;
