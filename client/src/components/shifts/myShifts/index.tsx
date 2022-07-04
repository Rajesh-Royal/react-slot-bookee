import { ISingleShift } from "@/api/controllers/get-all-shifts";
import { convertMillisecondsToHourAndMinute, getTotalDurationOfShifts } from "@/util/utilityFunctions";

import GreenSpinner from "../../../assets/spinner_green.svg";
import RedSpinner from "../../../assets/spinner_red.svg";
import "../../../styles/components/myShifts.scss";
import useMyShifts from "./useMyShifts";

const redSpinnerImage = <img src={RedSpinner} alt="red spinner" className="loader" />;
const greenSpinnerImage = <img src={GreenSpinner} alt="green spinner" className="loader" />;
interface IMyShiftsProps {
  refreshAPIResults: () => void;
}

const MyShifts = ({ refreshAPIResults }: IMyShiftsProps) => {
  const { cancelAShift, loading, shiftGroups, isApiLoading } = useMyShifts(refreshAPIResults);

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
      {!isApiLoading && Object.keys(shiftGroups).length === 0 && <p className="no-shifts">No shifts found!</p>}
      {isApiLoading && <p className="no-shifts">{greenSpinnerImage}</p>}
    </div>
  );
};

export default MyShifts;
