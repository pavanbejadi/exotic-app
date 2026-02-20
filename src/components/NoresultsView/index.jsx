import React from "react";
import "./index.css";

const NoResultsView = ({ onReset }) => {
  return (
    <div className="no-results-wrapper">
      <div className="no-results-card">
        <div className="no-results-image-container">
          <img
            src="https://img.freepik.com/free-vector/hand-drawn-no-data-concept_52683-127823.jpg"
            alt="no results"
            className="no-results-image"
          />
        </div>
        <h1 className="no-results-heading">Oops! No Exotic Finds</h1>
        <p className="no-results-text">
          We couldn't find any products matching your current selection. Maybe
          try a different category or clear your search?
        </p>
        {/* Providing a way out for the user */}
        <button className="reset-filter-btn" onClick={onReset}>
          View All Products
        </button>
      </div>
    </div>
  );
};

export default NoResultsView;
