import React, { useState, useEffect } from "react";

import Header from "./header.component";
import DayLabels from "./day-labels.component";
import Days from "./days.component";
import Footer from "./footer.component";
import MonthYearChanger from "./month-year-changer.component";

import {
  getHeaderMeta,
  getCurrentDisplayDate,
  addMonth,
  subtractMonth,
  getMonths,
  getWeekdays
} from "../lib/calendar.lib";

const Calendar = ({ calendarStartDate }) => {
  const [currentDisplayDate, setCurrentDisplayDate] = useState();
  const [monthLabel, setMonthLabel] = useState("");
  const [yearLabel, setYearLabel] = useState("");
  const [showMonthYearChanger, setShowMonthYearChanger] = useState(false);
  const [monthYearChangerTab, setMonthYearChangerTab] = useState("");
  const [months, setMonths] = useState();
  const [daysLabels, setDaysLabels] = useState();

  useEffect(() => {
    if (!currentDisplayDate) {
      setMonths(getMonths());
      setDaysLabels(getWeekdays());
      setCurrentDisplayDate(getCurrentDisplayDate(calendarStartDate));
    }
  }, [calendarStartDate, currentDisplayDate]);

  useEffect(() => {
    const headerMeta = getHeaderMeta(currentDisplayDate);
    setMonthLabel(headerMeta.monthLabel);
    setYearLabel(headerMeta.yearLabel);
  }, [currentDisplayDate]);

  const onMonthBtnClick = e => {
    if (e.target.id === "month-add") {
      setCurrentDisplayDate(addMonth(currentDisplayDate));
    } else {
      setCurrentDisplayDate(subtractMonth(currentDisplayDate));
    }
  };

  const onMonthLabelClick = e => {
    setShowMonthYearChanger(true);
    setMonthYearChangerTab("m");
  };

  const onYearLabelClick = e => {
    setShowMonthYearChanger(true);
    setMonthYearChangerTab("y");
  };

  const onMonthYearChangerCloseClick = () => {
    setShowMonthYearChanger(false);
    setMonthYearChangerTab("");
  };

  const onUpdateDate = date => {
    console.log("onUpdateDate: ", date);
    setCurrentDisplayDate(getCurrentDisplayDate(date));
    setShowMonthYearChanger(false);
    setMonthYearChangerTab("");
  };

  return (
    <div className="calendar-month-view">
      <Header
        onMonthBtnClick={e => onMonthBtnClick(e)}
        onMonthLabelClick={() => onMonthLabelClick()}
        onYearLabelClick={() => onYearLabelClick()}
        monthLabel={monthLabel}
        yearLabel={yearLabel}
      />
      {daysLabels && <DayLabels daysLabels={daysLabels} />}
      <Days currentDisplayDate={currentDisplayDate} />
      <Footer />
      <div className={`${showMonthYearChanger ? "fadeIn " : "fadeOut "}`}>
        {showMonthYearChanger && (
          <MonthYearChanger
            onMonthYearChangerCloseClick={() => onMonthYearChangerCloseClick()}
            monthYearChangerTab={monthYearChangerTab}
            monthLabel={monthLabel}
            yearLabel={yearLabel}
            months={months}
            onUpdateDate={date => onUpdateDate(date)}
            currentDisplayDate={currentDisplayDate}
            toggleMonthYearView={tab => setMonthYearChangerTab(tab)}
          />
        )}
      </div>
    </div>
  );
};

export default Calendar;
