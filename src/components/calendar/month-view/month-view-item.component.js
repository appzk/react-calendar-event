import React from "react";

const MonthViewItem = ({ monthText, selected, itemId, onMonthClick }) => {
  const clickMonthViewItem = e => {
    onMonthClick(e.target.id);
  };

  return (
    <div
      className={`${selected ? "selected " : ""}month`}
      id={itemId}
      onClick={e => clickMonthViewItem(e)}
    >
      {monthText}
    </div>
  );
};

export default MonthViewItem;
