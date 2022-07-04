import { ISingleShift } from "../api/controllers/get-all-shifts";

// generate an array of months names
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
/**
 *
 * @param milliseconds the number of milliseconds to convert to a month and day string
 * @returns MonthName DayOfMonth;
 * @example getMonthAndDayFromMilliseconds(1577836800000) // returns "January 1"
 */
export const convertMillisecondsToMonthNameAndDay = (milliseconds: number) => {
  const date = new Date(milliseconds);
  const month = date.getMonth();
  const day = date.getDate();
  return `${monthNames[month]} ${day}`;
};
/**
 *
 * @param milliseconds the number of milliseconds to convert to a hour and minutes
 * @returns Hour:Minutes
 * @example ```
 * convertMillisecondsToHourAndMinutes(3600000) returns "1:00"
 * ```
 */
export const convertMillisecondsToHourAndMinute = (milliseconds: number) => {
  const date = new Date(milliseconds);
  const hour = date.getHours();
  const minute = date.getMinutes();
  return `${hour}:${minute || "00"}`;
};
/**
 *
 * @param {date} date to be converted
 * @returns {string} Today || Tomorrow || MonthName DayOfMonth
 * @example
 *  checkDate(new Date()) returns "Today"
 */
export const checkIfDateIsTodayOrTomorrow = (date: string): string => {
  const todayDate = new Date();
  const today = convertMillisecondsToMonthNameAndDay(todayDate.valueOf());
  todayDate.setDate(todayDate.getDate() + 1);
  const tomorrow = convertMillisecondsToMonthNameAndDay(todayDate.valueOf());
  // console.log('today', today)

  if (today === date) return "Today";
  else if (tomorrow === date) return "Tomorrow";
  else return date;
};

/**
 *
 * @param {ISingleShift} shiftsArray an array of shifts
 * @returns {string} the total number of hours of all shifts
 * @example "9h"
 *
 * @todo
 * - ~~remove the hours which are overlapping~~
 * - ~~return minutes if the hours are less than 1~~
 */
export const getTotalDurationOfShifts = (shiftsArray: ISingleShift[]) => {
  let totalTime = 0;
  shiftsArray.forEach((shift) => {
    totalTime += shift.endTime - shift.startTime;
  });
  totalTime /= 3600000;
  return totalTime >= 1 ? `${Math.floor(totalTime)}h` : `${totalTime * 60}m`;
};
