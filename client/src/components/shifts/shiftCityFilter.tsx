import React from 'react';
import { IShiftGroupsType } from './availableShifts/useAvailableShifts';

interface IShiftCityFilterProps {
    shiftGroupsByCity: IShiftGroupsType,
    setCurrentArea: React.Dispatch<React.SetStateAction<string>>,
    currentArea: string,
}

const ShiftCityFilter = ({shiftGroupsByCity, setCurrentArea, currentArea}: IShiftCityFilterProps) => {
  return (
    <div className="city-filter">
        {Object.keys(shiftGroupsByCity).map((area, index) => {
          return (
            <button
              key={area}
              className={`${currentArea === area ? "active" : ""}`}
              onClick={() => {
                setCurrentArea(area);
              }}>
              {area} ({shiftGroupsByCity[area].length})
            </button>
          );
        })}
      </div>
  )
}

export default ShiftCityFilter