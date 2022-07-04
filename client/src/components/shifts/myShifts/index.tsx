import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { cancelAShiftById } from "../../../api/controllers/cancel-shift";
import { ISingleShift } from "../../../api/controllers/get-all-shifts";
import "../../../styles/components/myShifts.scss";
import { checkIfDateIsTodayOrTomorrow, convertMillisecondsToHourAndMinute, convertMillisecondsToMonthNameAndDay, getTotalDurationOfShifts } from "../../../util/utilityFunctions";

interface IMyShiftsProps {
  shiftsData: ISingleShift[];
}
 interface IShiftGroupsType { [key: string]: ISingleShift[] }
const MyShifts = ({ shiftsData }: IMyShiftsProps) => {
  const [shiftGroups, setShiftGroups] = useState<IShiftGroupsType>({})
  useEffect(() => {
    // this gives an object with dates as keys
    const groupShiftsByDate = shiftsData.filter((sft) => sft.booked).reduce((dateGroups, shift) => {
      const date = checkIfDateIsTodayOrTomorrow(convertMillisecondsToMonthNameAndDay(shift.startTime));
      if (!dateGroups[date]) {
        dateGroups[date] = [];
      }
      dateGroups[date].push(shift);
      return dateGroups;
    }, {} as IShiftGroupsType);  
    setShiftGroups(groupShiftsByDate)
  }, [shiftsData])

  const cancelAShift = (id: string) => {
    cancelAShiftById(id).then((response) => {
      toast.success(response.message);
    }).catch((error) => {
      toast.error(error.data.message);
    })
  }
  
  return (
    <div className="shifts-container">
      {Object.keys(shiftGroups).map((shift) => {
        return <div className="shifts-group-container" key={shift}>
          <h3 className="shift-group">{shift} <span className="shift-data">{
            shiftGroups[shift].length
          } shifts, {
              getTotalDurationOfShifts(shiftGroups[shift])
            }</span>
          </h3>
          {
            
            shiftGroups[shift].map((shift: ISingleShift) => { 
              return <div className="shift-details" key={shift.id}>
                <div className="shift-timing">
                  <p className="time">{convertMillisecondsToHourAndMinute(shift.startTime)}-{convertMillisecondsToHourAndMinute(shift.endTime)}</p>
                  <p className="city">{shift.area}</p>
                </div>
                <button className="btn-pink" onClick={() => cancelAShift(shift.id)}>Cancel</button>
              </div>
            })
          }
        </div>
      })}
      {
        Object.keys(shiftGroups).length === 0 && <p className="no-shifts">No shifts found!</p>
      }
    </div>
  )
}

export default MyShifts