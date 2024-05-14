import axios from "axios";

export interface Profile {
  id: number;
  name: string;
  email: string;
  registration: string;
  document: string;
}

const URL = "https://minha-escola-backend-fatec-tg.vercel.app/app/profile";

export async function getProfile(accessToken: string) {
  const { data } = await axios.get<Profile>(URL, {
    headers: {
      "Content-Type": "application/json",
      Authorization: accessToken,
    },
  });
  return data;
}
