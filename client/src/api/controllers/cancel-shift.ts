import HTTPService from "../httpService";
export const cancelAShiftById = (id: string): Promise<TCancelShiftAPIResponse> => {
  return HTTPService.post(`/${id}/cancel`, {});
};

export interface ISingleShift {
  id: string;
  booked: boolean;
  area: string;
  startTime: number;
  endTime: number;
}
export type TCancelShiftAPIResponse = {
  statusCode: 200;
  message: string;
  data: ISingleShift;
};
