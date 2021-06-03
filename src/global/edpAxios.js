import axios from "axios";

const instance = axios.create({
  baseURL: "https://pimis.edp.mn/api/",
  // baseURL: "http://localhost:3000/api/",
});

export default instance;

export const edpurl = "https://pimis.edp.mn"