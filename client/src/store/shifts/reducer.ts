import { ISingleShift } from "@/api/controllers/get-all-shifts";
import { useReducer } from "react";
import { REMOVE_LOADING, SET_LOADING, SET_SHIFTS } from "./type";

export const initialShiftsState: IShifts = {
  shifts: [],
  isApiLoading: false
};

const ourReducer = (state = initialShiftsState, action: { type: string; payload?: ISingleShift[] | [] }) => {
  switch (action.type) {
    case SET_SHIFTS:
      return { ...state, shifts: [...(action.payload as [])] };
    case SET_LOADING:
      return { ...state, isApiLoading: true };
    case REMOVE_LOADING:
      return { ...state, isApiLoading: false };
    default:
      return state;
  }
};

export const useShiftsData = (): [IShifts, React.Dispatch<{ type: string; payload?: ISingleShift[] | [] }>] => {
  const [state, dispatch] = useReducer(ourReducer, initialShiftsState);

  return [state, dispatch];
};

export interface IShifts {
  shifts: ISingleShift[] | [];
  isApiLoading: boolean;
}
