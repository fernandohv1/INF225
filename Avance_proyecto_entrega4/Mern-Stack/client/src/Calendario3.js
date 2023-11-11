import React, { useState } from "react";
import moment from "moment";
import styled from "styled-components";
import "./Calendario.css";

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

const padWeekFront = (week) => {
  const daysCount = week.length;
  const paddingCount = 7 - daysCount;
  const paddedArray = Array(paddingCount).fill(null);
  return [...paddedArray, ...week];
};

const padWeekBack = (week) => {
  const daysCount = week.length;
  const paddingCount = 7 - daysCount;
  const paddedArray = Array(paddingCount).fill(null);
  return [...week, ...paddedArray];
};

const daysOfWeek = ["domingo", "lunes", "martes", "miercoles", "jueves", "viernes", "sabado"];

// const CalendarControlStyle = styled.div`
//   height: 15%;
// `;

// const CalendarControl = styled.div`
//   margin: auto;
//   max-width: 400px;
//   text-align: center;

//   button {
//     width: 45%;
//     margin: 0 2%;
//   }
// `;

const Tooltip = styled.div`
  position: absolute;
  background: white;
  border: 1px solid #ccc;
  padding: 10px;
  z-index: 1;
  display: ${({ show }) => (show ? "block" : "none")};
  top: -425px;
  right: 10px;
`;

const SecondTooltip = styled.div`
  position: absolute;
  background: white; // Customize the style as needed
  border: 1px solid #ccc; // Customize the style as needed
  padding: 10px; // Customize the style as needed
  z-index: 1;
  display: ${({ show }) => (show ? "block" : "none")};
  top: -100px; // Adjust the position as needed
  left: -300px; // Adjust the position to place it next to the first overlay
  height: 500px; // Adjust the height as needed
  width: 300px; // Adjust the width as needed
`;

const generateHalfHourIntervals = () => {
    const intervals = [];
    const start = moment().startOf("day").add(8, "hours");
    const end = moment().startOf("day").add(20, "hours");
    while (start <= end) {
        intervals.push(start.format("h:mm A"));
        start.add(30, "minutes");
    }
    return intervals;
};

export const Calendar3 = () => {
  const today = moment();

  const [currentMonthMoment, setCurrentMonthMoment] = useState(today);
  const [selectedDay, setSelectedDay] = useState(null);

  const [showSecondOverlay, setShowSecondOverlay] = useState(false);
  const [selectedHour, setSelectedHour] = useState(null);

  // const handleHourClick = (hour) => {
  //   setSelectedHour(hour);
  //   setShowSecondOverlay(true);
  // };


  const nextMonth = () => {
    setCurrentMonthMoment(moment(currentMonthMoment).add(1, "month"));
    setSelectedDay(null); // Clear the selected day when changing months
  };

  const prevMonth = () => {
    setCurrentMonthMoment(moment(currentMonthMoment).subtract(1, "month"));
    setSelectedDay(null); // Clear the selected day when changing months
  };

  const weeks = segmentIntoWeeks(getDaysInMonth(currentMonthMoment));

  const handleDayClick = (dayMoment) => {
    setSelectedDay(dayMoment);
  };

  const [secondOverlayPosition, setSecondOverlayPosition] = useState({ top: 0, left: 0 });

  const handleSecondOverlayClick = () => {
    setShowSecondOverlay(!showSecondOverlay);
  };

  const handleHourClick = (hour) => {
    setSelectedHour(hour);
    
    // Calculate the position for the second overlay based on the clicked hour button
    const hourButton = document.getElementById(`hour-button-${hour}`);
    if (hourButton) {
      const rect = hourButton.getBoundingClientRect();
      const top = rect.top + window.scrollY;
      const left = rect.left + window.scrollX + rect.width;
      setSecondOverlayPosition({ top, left });
    }

    setShowSecondOverlay(true);
  };

  return (
    <>
    
      
      <h1>{currentMonthMoment.format("MMMM YYYY")}</h1>
      <button onClick={prevMonth}>Prev</button>
      <button onClick={nextMonth}>Next</button>
       
      <table>
        <thead>
          <tr>
            {daysOfWeek.map((day) => (
              <th key={day}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {weeks.map((week, index) => {
            const displayWeek = index === 0 ? padWeekFront(week) : index === weeks.length - 1 ? padWeekBack(week) : week;
            return (
              <tr key={index}>
                {displayWeek.map((dayMoment, index) => (
                  <td key={index}>
                    {dayMoment ? (
                      <div
                        style={{ position: "relative" }}
                        onClick={() => handleDayClick(dayMoment)} // Handle the click event
                      >
                        {dayMoment.format("D")}
                        <Tooltip show={selectedDay && selectedDay.isSame(dayMoment, "day")}>
                          {selectedDay && selectedDay.isSame(dayMoment, "day") && (
                            <div>
                              <button onClick={() => setSelectedDay(null)} className="close-button">
                                X
                              </button>
                              <h3>{dayMoment.format("MMMM D, YYYY")}</h3>
                              <ul>
                                {generateHalfHourIntervals().map((interval, index) => (
                                  <li key={index}>
                                    <button onClick={() => handleHourClick(interval)}>{interval}</button>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </Tooltip>
                      </div>
                    ) : (
                      <td key={index}></td>
                    )}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* segunda overlay */}
      <SecondTooltip show={showSecondOverlay} style={secondOverlayPosition}>
        {/* contenido de la segunda overlay */}
        {selectedHour && (
          <div>
            Esta es la overlay {selectedHour}
            <div style={{ background: 'white', width: '100%', height: '100%' }}>
              {/* Contenido de la overlay*/}
            </div>
          </div>
        )}
      </SecondTooltip>
    </>
  );
};
