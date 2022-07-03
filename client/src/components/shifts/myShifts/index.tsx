import { useEffect } from "react";
import { ISingleShift } from "../../../api/controllers/get-all-shifts";
import "../../../styles/components/myShifts.scss";

interface IMyShiftsProps {
  shiftsData: ISingleShift[];
 }
const MyShifts = ({ shiftsData }: IMyShiftsProps) => {
  useEffect(() => {
    // this gives an object with dates as keys
const groups = shiftsData.reduce((dateGroups, shift) => {
  const date = new Date(shift.startTime).getDay().toString();
  if (!dateGroups[date as typeof dateGroups[keyof typeof dateGroups]]) {
    // @ts-ignore
    dateGroups[date] = [];
  }
  // @ts-ignore
  dateGroups[date].push(shift);
  return dateGroups;
}, {});
console.log('groups', groups)
  
  }, [])
  
  return (
    <div className="shifts-container">
      {shiftsData.filter((sft) => !sft.booked).map((shift) => {
        return <>
          <h3  className="shift-group">Today <span className="shift-data">2 shifts, 4 h</span></h3>
          <div className="shift-details">
            <div className="shift-timing">
              <p className="time">12:00-14:00</p>
                  <p className="city">{shift.area}</p>
            </div>
            <button className="btn-pink">Cancel</button>
          </div>
        </>
       })}
    </div>
  )
}

export default MyShifts