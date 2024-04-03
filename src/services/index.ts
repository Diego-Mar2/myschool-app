import axios from "axios";

const baseURL = "http://localhost:3001/admin";

export const fetchData = (accessToken: string) => {
  return axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
      Authorization: accessToken
    },
  });
};
