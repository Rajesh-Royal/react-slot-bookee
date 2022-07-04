import { useEffect } from "react";
import toast from "react-hot-toast";
import { getListOfAllShifts } from "./api/controllers/get-all-shifts";
import { IShifts, useShiftsData } from "./store/shifts/reducer";
import { SET_SHIFTS } from "./store/shifts/type";

export const useApp = (): [IShifts, () => void] => {
  const [shifts, dispatch] = useShiftsData();
  const refreshShifts = () => {
    getListOfAllShifts()
      .then((allShifts) => {
        dispatch({ type: SET_SHIFTS, payload: allShifts.data });
      })
      .catch((err) => {
        toast.error(err?.data?.message);
      });
  };
  useEffect(() => {
    refreshShifts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [shifts, refreshShifts];
};
