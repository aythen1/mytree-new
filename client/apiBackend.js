import axios from "axios";

export const BACKURL =
  "http://6f651255-2a5d-4271-a8c7-35730a2de342.pub.instances.scw.cloud:3000";

const axiosInstance = axios.create({
  baseURL:
    "http://6f651255-2a5d-4271-a8c7-35730a2de342.pub.instances.scw.cloud:3000",
});

export default axiosInstance;
