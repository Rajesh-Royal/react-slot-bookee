import HTTPService from "../httpService";

export const getListOfAllShifts = (): Promise<TGetListOfAllShiftsAPIResponse> => {
  return HTTPService.get("");
};

export interface ISingleShift {
  id: string;
  booked: boolean;
  area: string;
  startTime: number;
  endTime: number;
}
export type TGetListOfAllShiftsAPIResponse = {
  statusCode: 200;
  message: string;
  data: ISingleShift[];
};
