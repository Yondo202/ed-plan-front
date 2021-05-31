import axios from "axios";

const instance = axios.create({
  baseURL: "https://pimis.edp.mn/api/",
});

export default instance;