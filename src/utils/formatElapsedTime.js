export const formatElapsedTime = (timestamp) => {
  const currentTime = new Date();
  const requestTime = new Date(timestamp);

  const elapsedMilliseconds = currentTime - requestTime;
  const elapsedSeconds = Math.floor(elapsedMilliseconds / 1000);
  const elapsedMinutes = Math.floor(elapsedSeconds / 60);
  const elapsedHours = Math.floor(elapsedMinutes / 60);
  const elapsedDays = Math.floor(elapsedHours / 24);
  const elapsedWeeks = Math.floor(elapsedDays / 7);
  const elapsedYears = Math.floor(elapsedDays / 365);

  if (elapsedYears > 0) {
    return `${elapsedYears} ${elapsedYears === 1 ? "year" : "years"} ago`;
  } else if (elapsedWeeks > 0) {
    return `${elapsedWeeks} ${elapsedWeeks === 1 ? "week" : "weeks"} ago`;
  } else if (elapsedDays > 0) {
    return `${elapsedDays} ${elapsedDays === 1 ? "day" : "days"} ago`;
  } else if (elapsedHours > 0) {
    return `${elapsedHours} ${elapsedHours === 1 ? "hour" : "hours"} ago`;
  } else if (elapsedMinutes > 0) {
    return `${elapsedMinutes} ${
      elapsedMinutes === 1 ? "minute" : "minutes"
    } ago`;
  } else {
    return `${elapsedSeconds} ${
      elapsedSeconds === 1 ? "second" : "seconds"
    } ago`;
  }
};
