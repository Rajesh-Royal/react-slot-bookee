import { bookAShiftById, ISingleShift } from "@/api/controllers/book-shift";
import { cancelAShiftById } from "@/api/controllers/cancel-shift";
import ShiftsContext from "@/store/context/ShiftsContext";
import { checkIfDateIsTodayOrTomorrow, convertMillisecondsToMonthNameAndDay } from "@/util/utilityFunctions";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export interface IShiftGroupsType {
  [key: string]: ISingleShift[];
}

const useAvailableShifts = (refreshAPIResults: () => void) => {
  const { shifts: shiftsData, isApiLoading } = useContext(ShiftsContext);
  const [shiftGroupsByDate, setShiftGroupsByDate] = useState<IShiftGroupsType>({});
  const [shiftGroupsByCity, setShiftGroupsByCity] = useState<IShiftGroupsType>({});
  const [currentShifts, setCurrentShifts] = useState<IShiftGroupsType>({});
  const [currentArea, setCurrentArea] = useState<string>("");
  const [bookedShifts, setBookedShifts] = useState<typeof shiftsData>([]);
  const [loading, setLoading] = useState("");

  useEffect(() => {
    // this gives an object with dates as keys
    // @ts-ignore
    const groupShiftsByDate = shiftsData.reduce((dateGroups, shift) => {
      const date = checkIfDateIsTodayOrTomorrow(convertMillisecondsToMonthNameAndDay(shift.startTime));
      if (!dateGroups[date]) {
        dateGroups[date] = [];
      }
      dateGroups[date].push(shift);
      return dateGroups;
    }, {} as IShiftGroupsType);
    setShiftGroupsByDate(groupShiftsByDate);
    // group shifts by city
    // @ts-ignore
    const groupShiftsByCity = shiftsData.reduce((cityGroups, shift) => {
      const city = shift.area;
      if (!cityGroups[city]) {
        cityGroups[city] = [];
      }
      cityGroups[city].push(shift);
      return cityGroups;
    }, {} as IShiftGroupsType);
    setShiftGroupsByCity(groupShiftsByCity);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shiftsData]);

  useEffect(() => {
    if (Object.keys(shiftGroupsByCity).length > 0) {
      // set default shifts city
      currentArea === "" ? setCurrentArea(Object.keys(shiftGroupsByCity)?.[0]) : filterShiftsByCity(currentArea);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shiftGroupsByCity]);

  const bookAShift = (id: string) => {
    setLoading(id);
    bookAShiftById(id)
      .then((response) => {
        refreshAPIResults();
        setLoading("");
        toast.success(response.message);
        // console.log(response);
      })
      .catch((error) => {
        setLoading("");
        toast.error(error.data.message);
        // console.log(error);
      });
  };
  const cancelAShift = (id: string) => {
    setLoading(id);
    cancelAShiftById(id)
      .then((response) => {
        refreshAPIResults();
        setLoading("");
        toast.success(response.message);
        // console.log(response);
      })
      .catch((error) => {
        setLoading("");
        toast.error(error.data.message);
        // console.log(error);
      });
  };

  useEffect(() => {
    if (shiftsData.length > 0) {
      const bookedShifts = shiftsData.filter((s) => s.booked);
      setBookedShifts(bookedShifts);
    }
  }, [shiftsData]);

  const checkIfAnShiftIsOverLapping = (shift: ISingleShift) => {
    // if user can book multiple shifts at the same time in different areas
    // use this code s.area === currentArea &&
    return !!bookedShifts.find((s) => s.startTime < shift.endTime && s.endTime > shift.startTime);
  };

  // when current area changes filter the shifts by current city name
  const filterShiftsByCity = (cityName: keyof typeof shiftGroupsByDate) => {
    const shifts = { ...shiftGroupsByDate };
    Object.keys(shifts).forEach((shift) => {
      shifts[shift] = shifts[shift].filter((s) => s.area === cityName);
    });
    setCurrentShifts(shifts);
  };
  useEffect(() => {
    if (currentArea) {
      filterShiftsByCity(currentArea);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentArea]);
  return { bookAShift, cancelAShift, filterShiftsByCity, checkIfAnShiftIsOverLapping, loading, currentShifts, currentArea, shiftGroupsByCity, shiftGroupsByDate, setCurrentArea, isApiLoading };
};

export default useAvailableShifts;
