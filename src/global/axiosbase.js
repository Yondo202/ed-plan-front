import axios from "axios";

const instance = axios.create({
  baseURL: "https://pimis-plan.edp.mn/pimis-edplan/",
  // baseURL: "http://localhost:1337/pimis-edplan/",
  // baseURL: "http://192.168.88:230:1337/pimis-edplan/",
});

export default instance;

export const axiosGraphql = axios.create({
  baseURL: "https://pimis-plan.edp.mn/",
});