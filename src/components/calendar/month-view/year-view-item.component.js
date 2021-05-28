import React from "react";

const YearViewItem = ({ yearText, selected, itemId, onYearClick }) => {
  const clickYearViewItem = e => {
    onYearClick(e.target.innerText);
  };

  return (
    <div
      className={`${selected ? "selected " : ""}year`}
      onClick={e => clickYearViewItem(e)}
    >
      {yearText}
    </div>
  );
};

export default YearViewItem;
