import { useEffect, useState } from "react";
import { ISingleShift } from "../../../api/controllers/get-all-shifts";
import "../../../styles/components/myShifts.scss";
import { checkIfDateIsTodayOrTomorrow, convertMillisecondsToHourAndMinute, convertMillisecondsToMonthNameAndDay, getTotalDurationOfShifts } from "../../../util/utilityFunctions";

interface IMyShiftsProps {
  shiftsData: ISingleShift[];
 }
const MyShifts = ({ shiftsData }: IMyShiftsProps) => {
  const [shiftGroups, setShiftGroups] = useState({})
  console.log('shiftGroups', shiftGroups)
  useEffect(() => {
    // this gives an object with dates as keys
    const groupShiftsByDate = shiftsData.filter((sft) => !sft.booked).reduce((dateGroups, shift) => {
      const date = convertMillisecondsToMonthNameAndDay(shift.startTime);
      if (!dateGroups[date as typeof dateGroups[keyof typeof dateGroups]]) {
        // @ts-ignore
        dateGroups[date] = [];
      }
      // @ts-ignore
      dateGroups[date].push(shift);
      return dateGroups;
    }, {});  
    setShiftGroups(groupShiftsByDate)
  }, [shiftsData])
  
  return (
    <div className="shifts-container">
      {Object.keys(shiftGroups).map((shift) => {
        return <>
          <h3 className="shift-group">{checkIfDateIsTodayOrTomorrow(shift)} <span className="shift-data">{
            // @ts-ignore
            shiftGroups[shift].length
          } shifts, {
              // @ts-ignore
              getTotalDurationOfShifts(shiftGroups[shift])
            }</span></h3>
          {
            // @ts-ignore
            shiftGroups[shift].map((shift: ISingleShift) => { 
              return <div className="shift-details">
                <div className="shift-timing">
                  <p className="time">{convertMillisecondsToHourAndMinute(shift.startTime)}-{convertMillisecondsToHourAndMinute(shift.endTime)}</p>
                  <p className="city">{shift.area}</p>
                </div>
                <button className="btn-pink">Cancel</button>
              </div>
            })
          }
        </>
       })}
    </div>
  )
}

export default MyShifts