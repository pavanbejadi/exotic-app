import "./index.css";

const TabItem = (props) => {
  const { tab, activeTabIdChange, isActive } = props;
  const { tabId, displayText } = tab;
  const onChangeTabId = () => {
    activeTabIdChange(tabId);
  };
  const activeClassName = isActive ? "active-tab-btn" : "";
  return (
    <li className="tab-item-container ">
      <button
        type="button"
        className={`tab-btn ${activeClassName}`}
        onClick={onChangeTabId}
      >
        {displayText}
      </button>
    </li>
  );
};

export default TabItem;
