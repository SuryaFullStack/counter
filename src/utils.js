Date.prototype.getWeek = function (dowOffset) {
  // eslint-disable-next-line valid-typeof
  dowOffset = typeof dowOffset == "int" ? dowOffset : 0;
  const newYear = new Date(this.getFullYear(), 0, 1);
  let day = newYear.getDay() - dowOffset;
  day = day >= 0 ? day : day + 7;
  const daynum =
    Math.floor(
      (this.getTime() -
        newYear.getTime() -
        (this.getTimezoneOffset() - newYear.getTimezoneOffset()) * 60000) /
        86400000
    ) + 1;
  let weeknum;
  if (day < 4) {
    weeknum = Math.floor((daynum + day - 1) / 7) + 1;
    if (weeknum > 52) {
      const nYear = new Date(this.getFullYear() + 1, 0, 1);
      let nday = nYear.getDay() - dowOffset;
      nday = nday >= 0 ? nday : nday + 7;
      weeknum = nday < 4 ? 1 : 53;
    }
  } else {
    weeknum = Math.floor((daynum + day - 1) / 7);
  }
  return weeknum;
};

const formatDate = (date) => {
  const d = new Date(date),
    year = d.getFullYear();
  let month = "" + (d.getMonth() + 1),
    day = "" + d.getDate();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [day, month, year].join("-");
};

const ckeckIfUpcomingLaunch = (date) => {
  const myDate = new Date(date),
    today = new Date();
  return myDate > today ? "Yes" : "No";
};

const getArrayChunks = (array) => {
  const tempArray = [],
    chunk = 3;
  for (let i = 0, j = array.length; i < j; i += chunk) {
    tempArray.push(array.slice(i, i + chunk));
  }
  return tempArray;
};

const getFilterBySpaceXLaunches = (spaceXLaunche, filterBy) => {
  const { launch_date_local = "", launch_success = false } = spaceXLaunche,
    curr = new Date(),
    launchDate = new Date(launch_date_local),
    currWeek = curr.getWeek() - 1,
    launchWeek = launchDate.getDay(),
    currMonth = curr.getMonth() - 1,
    launchMonth = launchDate.getMonth(),
    currYear = curr.getFullYear() - 1,
    launchYear = launchDate.getFullYear();
  if (filterBy === "week") {
    return currWeek === launchWeek;
  } else if (filterBy === "month") {
    return (
      currMonth === launchMonth &&
      curr.getFullYear() === launchYear
    );
  } else if (filterBy === "year") {
    return currYear === launchYear;
  } else if (filterBy === "launchStatus") {
    return ckeckIfUpcomingLaunch(launch_date_local) === "Yes";
  } else if (filterBy === "upcoming") {
    return launch_success;
  } else {
    return true;
  }
};
export { formatDate, getArrayChunks, getFilterBySpaceXLaunches, ckeckIfUpcomingLaunch };
