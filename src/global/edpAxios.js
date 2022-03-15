import axios from "axios";

export const edpBackendUrl = "http://192.168.88.232:3000"

const instance = axios.create({
  // baseURL: "https://pimis.edp.mn/api/", // file upload hiiged url aa avdag 
  // baseURL: "https://154d-124-158-107-34.ngrok.io/api/", // file upload hiiged url aa avdag 
  baseURL: `${edpBackendUrl}/api/`, // file upload hiiged url aa avdag 
});

export default instance;

// export const edpurl = "https://pimis.edp.mn" // zurag aa uzuulj, haruuldag heseg
// export const edpurl = "https://pimis.vercel.app" // zurag aa uzuulj, haruuldag heseg
export const edpurl = "localhost:3100" // zurag aa uzuulj, haruuldag heseg