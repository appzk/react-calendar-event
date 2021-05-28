import React, { Fragment } from "react";

import { generateCalendarMatrix } from "../lib/calendar.lib";

import Day from "./day.component";

const Days = ({ currentDisplayDate }) => {
  const DatesArray = () => {
    let dateMatrix = generateCalendarMatrix(currentDisplayDate);

    let datesArray = [];

    let itemCount = 0;
    dateMatrix.forEach(function(matrixRow) {
      matrixRow.forEach(function(matrixItem) {
        const dayItem = (
          <Day
            key={itemCount}
            matrixItem={matrixItem[0]}
            itemId={itemCount + 1}
          />
        );
        datesArray.push(dayItem);
        itemCount++;
      });
    });

    return <Fragment>{datesArray}</Fragment>;
  };

  return (
    <div className="calender-body">
      <DatesArray />
    </div>
  );
};

export default Days;
