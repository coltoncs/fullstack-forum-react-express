export const dateTimeFormat = (dateTime: string) => {
  let newDate = new Date();
  const date: any = dateTime;
  newDate.setTime(date);
  const dateString = newDate.toUTCString();
  const formattedDateString = dateString.split(" ");
  const hours = newDate.getHours();
  const minutes = newDate.getMinutes();
  const year = newDate.getFullYear();
  let timeOfDay;
  if (hours > 12) {
    timeOfDay = "PM";
  } else {
    timeOfDay = "AM";
  }
  const outputString =
    formattedDateString[0] +
    " " +
    formattedDateString[1] +
    " " +
    formattedDateString[2] +
    " " +
    year +
    " @ " +
    hours +
    ":" +
    minutes +
    " " +
    timeOfDay;

  return outputString;
};