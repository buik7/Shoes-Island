export const parseUTCToDate = UTCDate => {
  try {
    const date = new Date(UTCDate);
    return {
      day: date.getDay(),
      date: date.getDate(),
      month: date.getMonth(),
      year: date.getFullYear(),
      hour: date.getHours(),
      minute: date.getMinutes(),
      second: date.getSeconds(),
    };
  } catch (error) {
    console.log(error);
    return {
      day: 1,
      date: 1,
      month: 1,
      year: 1,
      hour: 1,
      minute: 1,
      second: 1,
    };
  }
};

const convertToTwoDigits = number => {
  let output = number.toString();
  if (0 <= number && number <= 9) output = '0' + output;
  return output;
};

export const printDate = UTCDate => {
  const {date, month, year, hour, minute} = parseUTCToDate(UTCDate);
  return `${convertToTwoDigits(hour)}:${convertToTwoDigits(
    minute,
  )} ${convertToTwoDigits(date)}/${convertToTwoDigits(month + 1)}/${year}`;
};
