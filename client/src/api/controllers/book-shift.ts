import HTTPService from "../httpService";
// @tdo convert to post request when hapi server is ready to handle it.
export const bookAShiftById = (id: string): Promise<TBookShiftAPIResponse> => {
    return HTTPService.get(`/${id}/book`);
}

export interface ISingleShift {
    id: string,
    booked: boolean,
    area: string,
    startTime: number,
    endTime: number
}
export type TBookShiftAPIResponse = {
    statusCode: 200,
    message: string,
    data: ISingleShift
}