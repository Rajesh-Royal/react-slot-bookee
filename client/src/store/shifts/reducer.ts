import { ISingleShift } from "@/api/controllers/get-all-shifts";
import { useReducer } from "react";
import { SET_SHIFTS } from "./type";

export const initialShiftsState: IShifts = {
  shifts: []
};

const ourReducer = (state = initialShiftsState, action: { type: string; payload: ISingleShift[] | [] }) => {
  switch (action.type) {
    case SET_SHIFTS:
      return { shifts: [...action.payload] };
    default:
      return state;
  }
};

export const useShiftsData = (): [IShifts, React.Dispatch<{ type: string; payload: ISingleShift[] | [] }>] => {
  const [state, dispatch] = useReducer(ourReducer, initialShiftsState);

  return [state, dispatch];
};

export interface IShifts {
  shifts: ISingleShift[] | [];
}
