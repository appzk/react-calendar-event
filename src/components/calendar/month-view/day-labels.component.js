import React from "react";

const DayLabels = ({ daysLabels, startOfWeekMonday }) => {
  const dayLabelsDisplay = () => {
    let dayLabelsArray = [];
    daysLabels.map((dayLabel, index) => {
      const dayLabelComponent = (
        <div key={index} className="calendar-day">
          <span>{dayLabel}</span>
        </div>
      );
      return dayLabelsArray.push(dayLabelComponent);
    });
    return dayLabelsArray;
  };

  return <div className="calendar-days-label">{dayLabelsDisplay()}</div>;
};

export default DayLabels;
