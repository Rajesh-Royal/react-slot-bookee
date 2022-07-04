import { useEffect, useState } from "react";
import toast from 'react-hot-toast';
import { bookAShiftById } from "../../../api/controllers/book-shift";
import { cancelAShiftById } from "../../../api/controllers/cancel-shift";
import { ISingleShift } from "../../../api/controllers/get-all-shifts";
import GreenSpinner from "../../../assets/spinner_green.svg";
import RedSpinner from "../../../assets/spinner_red.svg";
import { checkIfDateIsTodayOrTomorrow, convertMillisecondsToHourAndMinute, convertMillisecondsToMonthNameAndDay } from "../../../util/utilityFunctions";

const greenSpinnerImage = <img src={GreenSpinner} alt="green spinner" className="loader"/>
const redSpinnerImage = <img src={RedSpinner} alt="red spinner" className="loader"/>

interface IAvailableShiftsProps {
  shiftsData: ISingleShift[];
  refreshAPIResults: () => void;
}
 interface IShiftGroupsType { [key: string]: ISingleShift[] }
const AvailableShifts = ({ shiftsData, refreshAPIResults }: IAvailableShiftsProps) => {
  const [shiftGroups, setShiftGroups] = useState<IShiftGroupsType>({})
  const [bookedShifts, setBookedShifts] = useState<typeof shiftsData>([]);
  const [loading, setLoading] = useState("");
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
  
  const bookAShift = (id: string) => {
    setLoading(id);
    bookAShiftById(id).then((response) => {
       refreshAPIResults();
      setLoading("");
      toast.success(response.message);
      // console.log(response);
    }).catch((error) => {
      setLoading("");
      toast.error(error.data.message);
      // console.log(error);
    })
  }
  const cancelAShift = (id: string) => {
    setLoading(id);
    cancelAShiftById(id).then((response) => {
      refreshAPIResults();
      setLoading("");
      toast.success(response.message);
      // console.log(response);
    }).catch((error) => {
      setLoading("");
      toast.error(error.data.message);
      // console.log(error);
    })
  }


  useEffect(() => {
    if (shiftsData.length > 0) {
      const bookedShifts = shiftsData
        .filter(s => s.booked)
      setBookedShifts(bookedShifts);
    }
  }, [shiftsData])

  const checkIfAnShiftIsOverLapping = (shift: ISingleShift) => {
    return !!bookedShifts.find(s => s.startTime < shift.endTime && s.endTime > shift.startTime);
   }
  return (
    <div className="shifts-container">
      {Object.keys(shiftGroups).map((shift) => {
        return <div className="shifts-group-container" key={shift}>
          <h3 className="shift-group">{shift}</h3>
          {
            
            shiftGroups[shift].map((shift: ISingleShift) => { 
              return <div className="shift-details" key={shift.id}>
                <div className="shift-timing">
                  <p className="time">{convertMillisecondsToHourAndMinute(shift.startTime)}-{convertMillisecondsToHourAndMinute(shift.endTime)}</p>
                </div>
                <div className={`booking-status
                  ${shift.booked ? "booked" : ""}
                  ${!shift.booked && checkIfAnShiftIsOverLapping(shift) ? "overlapping" : ""}`}
                >
                  {shift.booked ? "Booked" : ""}
                  {!shift.booked && checkIfAnShiftIsOverLapping(shift) ? "overlapping" : ""}
                </div>
                <button className={`${shift.booked ? "btn-pink" : "btn-green"}`}
                  disabled={checkIfAnShiftIsOverLapping(shift)}
                  onClick={() => {
                    !shift.booked ? bookAShift(shift.id) : cancelAShift(shift.id);
                  }}
                >{!shift.booked ? loading === shift.id ? greenSpinnerImage : "Book" : loading === shift.id ? redSpinnerImage : "Cancel"}</button>
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

export default AvailableShifts