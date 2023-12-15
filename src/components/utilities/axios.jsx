import axios from "axios"

const axiosInstance = axios.create({
  baseURL: "https://backend-project-d9id.onrender.com/api",
})

export default axiosInstance
