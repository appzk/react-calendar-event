import React from "react";

const Day = ({ matrixItem, itemId }) => {
  const eventsCount = matrixItem.eventsCount;

  const eventsCountLabel = () =>
    eventsCount > 1 ? <span>events</span> : <span>event</span>;

  const clickMe = e => {
    if (e.target.className === "calendar-date") {
      console.log(e.target.className);
      console.log(e.target.id);
    }
  };

  return (
    <div
      className={`${matrixItem.isCurrentMonth ? "" : "not-current-month "}${
        matrixItem.isPublicHoliday ? "is-public-holiday " : ""
      }${matrixItem.isToday ? "is-today " : ""}calendar-date`}
      id={itemId}
      onClick={e => clickMe(e)}
    >
      <span className="date">{matrixItem.date}</span>

      <span className="events">
        <ul>
          {eventsCount ? (
            <li>
              <span className="count">{eventsCount}</span>
              {eventsCountLabel()}
            </li>
          ) : (
            ""
          )}
        </ul>
      </span>
    </div>
    // <div className="calendar-date public-holiday">
    //   <span className="date">00</span>
    //   <span className="events">
    //     <ul>
    //       <li className="notice">
    //         <i>Public Holiday</i>
    //       </li>
    //       <li>
    //         <span className="count">0</span>
    //         <span>events</span>
    //       </li>
    //     </ul>
    //   </span>
    // </div>
  );
};

export default Day;
