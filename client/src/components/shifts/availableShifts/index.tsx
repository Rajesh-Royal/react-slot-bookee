import { ISingleShift } from "../../../api/controllers/get-all-shifts";

interface IAvailableShiftsProps {
  shiftsData: ISingleShift[];
 }
const AvailableShifts = ({shiftsData}: IAvailableShiftsProps) => {
  return (
    <div>available shifts</div>
  )
}

export default AvailableShifts