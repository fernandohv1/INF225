import React from "react";
import moment from "moment";

export const getDaysInMonth = monthMoment => {
  const monthCopy = monthMoment.clone();
  monthCopy.startOf('month');

  let days = [];

  while(monthCopy.month() === monthMoment.month()) {
    days.push(monthCopy.clone());
    monthCopy.add(1, 'days');
  }

  return days;

}

export const segmentIntoWeeks = daysMoments => {
  let weeks = [];
  let currentWeek = [];

  daysMoments.forEach(day => {
    currentWeek.push(day);

    if(day.weekday() === 6) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  });

  if(currentWeek.length > 0) {
    weeks.push(currentWeek);
  }

  return weeks;
}

const padWeekFront = (week, padWith = null) => {
  return [...Array(7 - week.length).fill(padWith), ...week];
}

const padWeekBack = (week, padWith = null) => {
  return [...week , ...Array(7 - week.length).fill(padWith)];
}

const daysOfWeek = ['domingo', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado']

export const Calendar = () => {
  const currentMonthMoment = moment();
  const weeks = segmentIntoWeeks(getDaysInMonth(currentMonthMoment));
  console.log(weeks);
  return (
    <>
    <h1>{currentMonthMoment.format('MMMM YYYY')}</h1>
    <table>
      <thead>
        <tr>
          {daysOfWeek.map(day => <th key={day}>{day}</th>)}
        </tr>
      </thead>
      <tbody>
        {weeks.map((week, index) => {
          const displayWeek = index === 0
            ? padWeekFront(week)
            : index === weeks.length - 1
              ? padWeekBack(week)
              : week;
          return (
            <tr key={index}>
              {displayWeek.map((daysMoments, index) => daysMoments
              ? <td key={daysMoments.format('D')}>{daysMoments.format('D')}</td>
              : <td key={index}></td>
              )}
            </tr>
          );
        })}
      </tbody>
    </table>
    </>
  );
}