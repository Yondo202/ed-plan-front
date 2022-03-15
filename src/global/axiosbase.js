import axios from "axios";

const instance = axios.create({
  // baseURL: "https://pimis-plan.edp.mn/pimis-edplan/", // undsen backend ed-plan - ii

  // baseURL: "http://localhost:1337/pimis-edplan/",
  baseURL: "http://192.168.88.232:1337/pimis-edplan/",
  // baseURL: "https://3a15-124-158-107-34.ngrok.io/pimis-edplan/",
});

export default instance;

export const axiosGraphql = axios.create({
  // baseURL: "https://pimis-plan.edp.mn/",  // undsen backend ed-plan - ii axiosbase
  baseURL: "http://localhost/",
});

