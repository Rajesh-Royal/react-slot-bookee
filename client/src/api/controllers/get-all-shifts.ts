import HTTPService from "../httpService";

export const getListOfAllShifts = (): Promise<string> => {
    return HTTPService.get("");
}

export type TGetListOfAllShifts = {

}