import React, { Fragment } from "react";
// import "./styles.less";

import Calendar from "./components/calendar/month-view";
import "./components/calendar/assets/less/calendar.styles.less";

import { data } from "./data";

const App = () => {
  return (
    <Fragment>
      <Calendar calendarStartDate="2020-05" />
    </Fragment>
  );
};

export default App;
