import { cancelAShiftById } from "@/api/controllers/cancel-shift";
import { ISingleShift } from "@/api/controllers/get-all-shifts";
import ShiftsContext from "@/store/context/ShiftsContext";
import { checkIfDateIsTodayOrTomorrow, convertMillisecondsToHourAndMinute, convertMillisecondsToMonthNameAndDay, getTotalDurationOfShifts } from "@/util/utilityFunctions";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

import RedSpinner from "../../../assets/spinner_red.svg";
import "../../../styles/components/myShifts.scss";

const redSpinnerImage = <img src={RedSpinner} alt="red spinner" className="loader" />;
interface IMyShiftsProps {
  refreshAPIResults: () => void;
}
interface IShiftGroupsType {
  [key: string]: ISingleShift[];
}
const MyShifts = ({ refreshAPIResults }: IMyShiftsProps) => {
  const { shifts: shiftsData } = useContext(ShiftsContext);
  const [shiftGroups, setShiftGroups] = useState<IShiftGroupsType>({});
  const [loading, setLoading] = useState("");
  useEffect(() => {
    // this gives an object with dates as keys
    const groupShiftsByDate = shiftsData
      .filter((sft) => sft.booked)
      .reduce((dateGroups, shift) => {
        const date = checkIfDateIsTodayOrTomorrow(convertMillisecondsToMonthNameAndDay(shift.startTime));
        if (!dateGroups[date]) {
          dateGroups[date] = [];
        }
        dateGroups[date].push(shift);
        return dateGroups;
      }, {} as IShiftGroupsType);
    setShiftGroups(groupShiftsByDate);
  }, [shiftsData]);

  const cancelAShift = (id: string) => {
    setLoading(id);
    cancelAShiftById(id)
      .then((response) => {
        setLoading("");
        refreshAPIResults();
        toast.success(response.message);
      })
      .catch((error) => {
        setLoading("");
        toast.error(error.data.message);
      });
  };

  return (
    <div className="shifts-container">
      {Object.keys(shiftGroups).map((shift) => {
        let shiftCount = shiftGroups[shift].length;
        return (
          <div className="shifts-group-container" key={shift}>
            <h3 className="shift-group">
              {shift}{" "}
              <span className="shift-data">
                {shiftCount} {shiftCount > 1 ? "shifts" : "shift"}, {getTotalDurationOfShifts(shiftGroups[shift])}
              </span>
            </h3>
            {shiftGroups[shift].map((shift: ISingleShift) => {
              return (
                <div className="shift-details" key={shift.id}>
                  <div className="shift-timing">
                    <p className="time">
                      {convertMillisecondsToHourAndMinute(shift.startTime)}-{convertMillisecondsToHourAndMinute(shift.endTime)}
                    </p>
                    <p className="city">{shift.area}</p>
                  </div>
                  {/* a finished shift will have a green button and disabled with Finished text */}
                  <button className={`${Date.now() >= shift.endTime ? "btn-green" : "btn-pink"}`} disabled={Date.now() > shift.startTime} onClick={() => cancelAShift(shift.id)}>
                    {loading === shift.id ? redSpinnerImage : Date.now() >= shift.endTime ? "Finished" : "Cancel"}
                  </button>
                </div>
              );
            })}
          </div>
        );
      })}
      {Object.keys(shiftGroups).length === 0 && <p className="no-shifts">No shifts found!</p>}
    </div>
  );
};

export default MyShifts;
