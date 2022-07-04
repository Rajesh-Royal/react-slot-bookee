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
  const [shiftGroupsByDate, setShiftGroupsByDate] = useState<IShiftGroupsType>({});
  const [shiftGroupsByCity, setShiftGroupsByCity] = useState<IShiftGroupsType>({});
  const [currentShifts, setCurrentShifts] = useState<IShiftGroupsType>({});
   const [currentArea, setCurrentArea] = useState<string>("")
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
    setShiftGroupsByDate(groupShiftsByDate)
    // group shifts by city
    const groupShiftsByCity = shiftsData.reduce((cityGroups, shift) => {
      const city = shift.area;
      if (!cityGroups[city]) {
        cityGroups[city] = [];
      }
      cityGroups[city].push(shift);
      return cityGroups;
    }, {} as IShiftGroupsType)
    setShiftGroupsByCity(groupShiftsByCity);
    // set default shifts city
    if (currentArea === "") {
      setCurrentArea(Object.keys(groupShiftsByCity)[0]);
    } else {
      filterShiftsByCity(currentArea);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
    // if user can book multiple shifts at the same time in different areas
    // use this code s.area === currentArea &&
    return !!bookedShifts.find(s =>  s.startTime < shift.endTime && s.endTime > shift.startTime);
  }

  // when current area changes filter the shifts by current city name
  const filterShiftsByCity = (cityName: keyof typeof shiftGroupsByDate) => {
    const shifts = {...shiftGroupsByDate};
    Object.keys(shifts).forEach((shift) => {
      shifts[shift] = shifts[shift].filter(s => s.area === cityName);
    })
    setCurrentShifts(shifts);
  }
  useEffect(() => {
    if (currentArea) {
      filterShiftsByCity(currentArea);
    }
   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [currentArea])
  
  return (
    <div className="shifts-container">
      <div className="city-filter">
        {
          Object.keys(shiftGroupsByCity).map((area, index) => {
            return <button className={`${currentArea === area ? "active" : ""}`} onClick={() => {
              setCurrentArea(area);
            }}>{area} ({shiftGroupsByCity[area].length})</button>
           })
        }
      </div>
      {Object.keys(currentShifts).map((shift) => {
        return <div className="shifts-group-container" key={shift}>
          <h3 className="shift-group">{shift}</h3>
          {
            currentShifts[shift].map((shift: ISingleShift) => { 
              return <div className="shift-details" key={shift.id}>
                <div className="shift-timing">
                  <p className="time">{convertMillisecondsToHourAndMinute(shift.startTime)}-{convertMillisecondsToHourAndMinute(shift.endTime)}</p>
                </div>
                <div className={`booking-status
                  ${shift.booked ? "booked" : !shift.booked && checkIfAnShiftIsOverLapping(shift) ? "overlapping" : ""}`}
                >
                  {shift.booked ? "Booked" : !shift.booked && checkIfAnShiftIsOverLapping(shift) ? "Overlapping" : ""}
                </div>
                <button className={`${shift.booked ? "btn-pink" : "btn-green"}`}
                  disabled={checkIfAnShiftIsOverLapping(shift) || Date.now() > shift.startTime}
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
        Object.keys(shiftGroupsByDate).length === 0 && <p className="no-shifts">No shifts found!</p>
      }
    </div>
  )
}

export default AvailableShifts