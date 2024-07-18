import axios from 'axios'

// export const BACKURL = 'http://192.168.0.77:3000'
export const BACKURL =
  'http://6f651255-2a5d-4271-a8c7-35730a2de342.pub.instances.scw.cloud:3000'

const axiosInstance = axios.create({
  baseURL: BACKURL ||
    'http://6f651255-2a5d-4271-a8c7-35730a2de342.pub.instances.scw.cloud:3000'
})

export default axiosInstance
