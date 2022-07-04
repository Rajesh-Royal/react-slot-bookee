import HTTPService from "../httpService";
// @tdo convert to post request when hapi server is ready to handle it.
export const cancelAShiftById = (id: string): Promise<TCancelShiftAPIResponse> => {
    return HTTPService.get(`/${id}/cancel`);
}

export interface ISingleShift {
    id: string,
    booked: boolean,
    area: string,
    startTime: number,
    endTime: number
}
export type TCancelShiftAPIResponse = {
    statusCode: 200,
    message: string,
    data: ISingleShift
}