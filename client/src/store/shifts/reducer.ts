import { ISingleShift } from "@/api/controllers/get-all-shifts";
import { useReducer } from "react";
import { SET_LOADING, SET_SHIFTS } from "./type";

export const initialShiftsState: IShifts = {
  shifts: [],
  loading: false
};

const ourReducer = (state = initialShiftsState, action: { type: string; payload: ISingleShift[] | [] }) => {
  switch (action.type) {
    case SET_SHIFTS:
      return { ...state, shifts: [...action.payload] };
    case SET_LOADING:
      // @todo - create actions instead of doing type assertions
      return { ...state, loading: action.payload as unknown as boolean };
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
  loading: boolean;
}
