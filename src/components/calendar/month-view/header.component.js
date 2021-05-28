import React from "react";

const Header = ({
  onMonthBtnClick,
  onMonthLabelClick,
  onYearLabelClick,
  monthLabel,
  yearLabel
}) => {
  return (
    <div className="calendar-header">
      <span id="month-subtract" className="month-btn" onClick={onMonthBtnClick}>
        &laquo;
      </span>
      <div>
        <span className="month-label" onClick={onMonthLabelClick}>
          {monthLabel}
        </span>
        <span className="year-label" onClick={onYearLabelClick}>
          {yearLabel}
        </span>
      </div>
      <span id="month-add" className="month-btn" onClick={onMonthBtnClick}>
        &raquo;
      </span>
    </div>
  );
};

export default Header;
