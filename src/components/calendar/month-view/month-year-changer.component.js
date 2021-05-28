import React, { Fragment, useState, useEffect } from "react";

import MonthViewItem from "./month-view-item.component";
import YearViewItem from "./year-view-item.component";

import { getMonthFromLabel } from "../lib/calendar.lib";

const MonthYearChanger = ({
  onMonthYearChangerCloseClick,
  monthYearChangerTab,
  monthLabel,
  yearLabel,
  months,
  onUpdateDate,
  currentDisplayDate,
  toggleMonthYearView
}) => {
  const [selectedDate, setSelectedDate] = useState();
  const [currentMonth, setCurrentMonth] = useState();
  const [currentYear, setCurrentYear] = useState();
  const [updateFlag, setUpdateFlag] = useState(false);
  const [monthYearTabToggle, setMonthYearTabToggle] = useState();
  const [yearInput, setYearInput] = useState("");
  const [yearInputValid, setYearInputValid] = useState(true);

  useEffect(() => {
    setCurrentMonth(getMonthFromLabel(monthLabel));
    setCurrentYear(yearLabel);
    setSelectedDate(currentDisplayDate);
    setMonthYearTabToggle(monthYearChangerTab);
  }, [yearLabel, monthLabel, currentDisplayDate, monthYearChangerTab]);

  useEffect(() => {
    if (selectedDate) {
      setSelectedDate(`${currentYear}-${("0" + currentMonth).slice(-2)}`);
      setUpdateFlag(true);
    }
  }, [currentMonth, currentYear, selectedDate]);

  useEffect(() => {
    if (updateFlag && currentDisplayDate !== selectedDate) {
      onUpdateDate(selectedDate);
    }
    setUpdateFlag(false);
  }, [currentDisplayDate, onUpdateDate, selectedDate, updateFlag]);

  const onToggleMonthYearView = tab => {
    toggleMonthYearView(tab);
    setMonthYearTabToggle(tab);
  };

  const onYearChange = e => {
    const re = /^[0-9\b]+$/;
    if (e.target.value === "" || re.test(e.target.value)) {
      setYearInput(e.target.value);
    }
  };

  const validateYearInput = e => {
    const inputYear = parseInt(e.target.value, 10);
    if (inputYear > 1900 && inputYear < 2100) {
      setYearInputValid(false);
    } else {
      setYearInputValid(true);
    }
  };

  const MonthsView = () => {
    let monthsDisplay = [];
    months.map((month, index) => {
      const selected = month === monthLabel ? true : false;
      const monthDisplay = (
        <MonthViewItem
          key={index}
          monthText={month}
          selected={selected}
          itemId={index + 1}
          onMonthClick={selectedMonth => setCurrentMonth(selectedMonth)}
        />
      );
      return monthsDisplay.push(monthDisplay);
    });

    return monthsDisplay;
  };

  const YearView = () => {
    const year = Number(yearLabel);
    const startingYear = year - 12;
    const endingYear = year + 12;

    let yearsDisplay = [];
    let index = 0;
    for (let i = startingYear; i <= endingYear; i++) {
      const yearDisplay = (
        <YearViewItem
          key={index}
          yearText={i}
          selected={i === year ? true : false}
          onYearClick={selectedYear => setCurrentYear(selectedYear)}
        />
      );
      index++;
      yearsDisplay.push(yearDisplay);
    }

    return yearsDisplay;
  };

  return (
    <div className="month-year-changer-overlay">
      <span className="close" onClick={onMonthYearChangerCloseClick} />
      <h3 className="current-date">
        {monthLabel} {yearLabel}
      </h3>
      <h3>
        <span
          className={`${
            monthYearTabToggle === "m" ? "active " : ""
          }month-year-tab-toggle`}
          onClick={() => onToggleMonthYearView("m")}
        >
          Month
        </span>{" "}
        |{" "}
        <span
          className={`${
            monthYearTabToggle === "y" ? "active " : ""
          }month-year-tab-toggle`}
          onClick={() => onToggleMonthYearView("y")}
        >
          Year
        </span>
      </h3>
      {monthYearChangerTab === "m" && (
        <Fragment>
          <div className="month-changer">
            <MonthsView />
          </div>
        </Fragment>
      )}

      {monthYearChangerTab === "y" && (
        <Fragment>
          <div className="year-changer">
            <YearView />
          </div>
          <div style={{ width: "fit-content", margin: "0 auto" }}>
            <input
              className="custom-year-input"
              type="text"
              placeholder="Enter custom year - YYYY"
              maxLength="4"
              onChange={e => onYearChange(e)}
              onKeyUp={e => validateYearInput(e)}
              value={yearInput}
            />
            <button
              className="custom-year-input-submit"
              onClick={() => setCurrentYear(yearInput)}
              disabled={yearInputValid}
            >
              OK
            </button>
          </div>
          {yearInputValid && (
            <div className="custom-year-validation-text">
              Valid years are between 1900 and 2100
            </div>
          )}
        </Fragment>
      )}
    </div>
  );
};

export default MonthYearChanger;
