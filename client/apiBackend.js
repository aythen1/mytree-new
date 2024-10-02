import axios from "axios";

export const BACKURL =
  process.env.EXPO_PUBLIC_LOCAL_BACKEND ||
  "http://6f651255-2a5d-4271-a8c7-35730a2de342.pub.instances.scw.cloud:3000";

const axiosInstance = axios.create({
  baseURL:
    process.env.EXPO_PUBLIC_LOCAL_BACKEND ||
    "http://6f651255-2a5d-4271-a8c7-35730a2de342.pub.instances.scw.cloud:3000",
});

export default axiosInstance;
