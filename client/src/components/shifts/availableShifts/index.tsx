import { useEffect, useState } from "react";
import { ISingleShift } from "../../../api/controllers/get-all-shifts";
import { checkIfDateIsTodayOrTomorrow, convertMillisecondsToHourAndMinute, convertMillisecondsToMonthNameAndDay } from "../../../util/utilityFunctions";

interface IAvailableShiftsProps {
  shiftsData: ISingleShift[];
}
 interface IShiftGroupsType { [key: string]: ISingleShift[] }
const AvailableShifts = ({ shiftsData }: IAvailableShiftsProps) => {
  const [shiftGroups, setShiftGroups] = useState<IShiftGroupsType>({})
  useEffect(() => {
    // this gives an object with dates as keys
    const groupShiftsByDate = shiftsData.reduce((dateGroups, shift) => {
      const date = checkIfDateIsTodayOrTomorrow(convertMillisecondsToMonthNameAndDay(shift.startTime));
      if (!dateGroups[date]) {
        dateGroups[date] = [];
      }
      dateGroups[date].push(shift);
      return dateGroups;
    }, {} as IShiftGroupsType);  
    setShiftGroups(groupShiftsByDate)
  }, [shiftsData])
  return (
    <div className="shifts-container">
      {Object.keys(shiftGroups).map((shift) => {
        return <>
          <h3 className="shift-group">{shift}</h3>
          {
            
            shiftGroups[shift].map((shift: ISingleShift) => { 
              return <div className="shift-details">
                <div className="shift-timing">
                  <p className="time">{convertMillisecondsToHourAndMinute(shift.startTime)}-{convertMillisecondsToHourAndMinute(shift.endTime)}</p>
                </div>
                <div className={`booking-status ${shift.booked ? "booked" : "overlapping"}`}>{shift.booked ? "Booked" : "Overlapping"}</div>
                <button className={`${shift.booked ? "btn-pink" : "btn-green"}`}>{!shift.booked ? "Book" : "Cancel"}</button>
              </div>
            })
          }
        </>
      })}
      {
        Object.keys(shiftGroups).length === 0 && <p className="no-shifts">No shifts found!</p>
      }
    </div>
  )
}

export default AvailableShifts