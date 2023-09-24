import axios from "axios";

const apiClient = axios.create({
    baseURL:  "https://forttyreapi.onrender.com",
    headers : {
        "Content-Type": "application/json",
    }
})


apiClient.interceptors.request.use(
    async (config) => {
      if (localStorage.getItem('userAccessToken'))
        config.headers.authorization = `Bearer ${
          JSON.parse(localStorage.getItem('userAccessToken')!).accessToken
        }`
  
      return config
    },
    (error) => {
      Promise.reject(error)
    }
  )
  

export default apiClient;