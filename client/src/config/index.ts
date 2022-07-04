let prefix = process.env.REACT_APP_API_PREFIX || "";
let apiURI = process.env.REACT_APP_SHIFTS_API || "";
export const appConfig = {
  apiUrl: `${apiURI}${prefix}`
};
