import moment from "moment";

export const getCurrentDisplayDate = calendarStartDate => {
  if (calendarStartDate) {
    return moment(new Date(calendarStartDate)).format("YYYY-MM");
  } else {
    return moment().format("YYYY-MM");
  }
};

export const getStartOfWeek = displayMonth => {
  return moment(displayMonth).startOf("week");
};

export const addMonth = currentDisplayDate => {
  return moment(currentDisplayDate)
    .add(1, "M")
    .format("YYYY-MM");
};

export const subtractMonth = currentDisplayDate => {
  return moment(currentDisplayDate)
    .subtract(1, "M")
    .format("YYYY-MM");
};

export const getMonths = () => {
  return moment.months();
};

export const getWeekdays = () => {
  return moment.weekdaysShort();
};

export const getMonthFromLabel = label => {
  return moment()
    .month(label)
    .format("M");
};

export const getHeaderMeta = currentDisplayDate => {
  const displayMonth = getCurrentDisplayDate(currentDisplayDate);

  return {
    monthLabel: moment(displayMonth).format("MMMM"),
    yearLabel: moment(displayMonth).format("YYYY")
  };
};

export const generateCalendarMatrix = currentDisplayDate => {
  const displayMonth = getCurrentDisplayDate(currentDisplayDate);

  const startDate = getStartOfWeek(displayMonth);

  const rows = 6;
  const cols = 7;
  const length = rows * cols;

  let dateMatrix = [];
  const matrix = Array.from({ length });

  matrix.map((_, index) => {
    const date = moment(startDate).add(index, "days");

    const dateObject = {
      date: date.format("D"),
      isToday: moment(date).isSame(new Date(), "day"),
      isCurrentMonth: moment(date).isSame(displayMonth, "month"),
      isPublicHoliday: false, //@todo: pass public holidays as array
      eventsCount: Math.round(Math.random() * 10) //@todo: pass events count
    };

    return dateMatrix.push([dateObject]);
  });

  dateMatrix = dateMatrix.reduce(
    (dateMatrix, current, index, days) =>
      !(index % cols !== 0)
        ? [...dateMatrix, days.slice(index, index + cols)]
        : dateMatrix,
    []
  );

  return dateMatrix;
};

export const eventsCount = data => {
  let eventArray = [];
  for (var i = 0; i < data.length; i++) {
    eventArray.push(moment(data[i].date).format("DD-MM-YYYY"));
  }

  let sortedEventArray = eventArray.sort(
    (a, b) => new moment(a) - new moment(b)
  );

  let sortedEventArrayCount = {};
  sortedEventArray.forEach(function(x) {
    sortedEventArrayCount[x] = (sortedEventArrayCount[x] || 0) + 1;
  });
  return sortedEventArrayCount;
};
