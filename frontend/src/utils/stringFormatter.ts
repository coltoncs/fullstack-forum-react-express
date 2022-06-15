export const dateTimeFormat = (dateTime: string): string => {
  let newDate: Date = new Date();
  const date: string = dateTime;
  const dateInt: number = parseInt(dateTime);
  newDate.setTime(dateInt);
  const dateString: string = newDate.toUTCString();
  const formattedDateString: string[] = dateString.split(" ");
  const hours: number = newDate.getHours();
  const minutes: number = newDate.getMinutes();
  const year: number = newDate.getFullYear();
  let timeOfDay: string;
  if (hours > 12) {
    timeOfDay = "PM";
  } else {
    timeOfDay = "AM";
  }
  const outputString: string =
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