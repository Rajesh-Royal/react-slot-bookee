import HTTPService from "../httpService";
export const bookAShiftById = (id: string): Promise<TBookShiftAPIResponse> => {
  return HTTPService.post(`/${id}/book`, {});
};

export interface ISingleShift {
  id: string;
  booked: boolean;
  area: string;
  startTime: number;
  endTime: number;
}
export type TBookShiftAPIResponse = {
  statusCode: 200;
  message: string;
  data: ISingleShift;
};
