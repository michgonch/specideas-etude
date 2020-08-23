import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://specideas.herokuapp.com/api",
  headers: {
    "Content-type": "application/json"
  }
});

export default apiClient;