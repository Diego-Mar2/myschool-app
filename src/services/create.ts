import { fetchData } from ".";

export async function create(
  accessToken: string = "eyJhbGciOiJIUzI1NiIsImtpZCI6InAzVktKVzhiY2tJdTZKNysiLCJ0eXAiOiJKV1QifQ.eyJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNzEyODgxNzM2LCJpYXQiOjE3MTIyNzY5MzYsImlzcyI6Imh0dHBzOi8vdXh6ZGFoYnFramhzc2FocWV6cnouc3VwYWJhc2UuY28vYXV0aC92MSIsInN1YiI6IjE4ZGVhMjlmLTk4ZDItNGIxMS05ZDRjLTExZDgwYzIxNGJlYSIsImVtYWlsIjoiaWNhcm9wYWl2YWRiekBnbWFpbC5jb20iLCJwaG9uZSI6IiIsImFwcF9tZXRhZGF0YSI6eyJwcm92aWRlciI6ImVtYWlsIiwicHJvdmlkZXJzIjpbImVtYWlsIl19LCJ1c2VyX21ldGFkYXRhIjp7ImlzX3N0YWZmIjp0cnVlfSwicm9sZSI6ImF1dGhlbnRpY2F0ZWQiLCJhYWwiOiJhYWwxIiwiYW1yIjpbeyJtZXRob2QiOiJwYXNzd29yZCIsInRpbWVzdGFtcCI6MTcxMjI3NjkzNn1dLCJzZXNzaW9uX2lkIjoiOWM5NGE0M2MtZmI2My00OTdkLWI4ODEtM2I2OTY0ZGQ2NWNiIiwiaXNfYW5vbnltb3VzIjpmYWxzZX0.Sa7a169k3D7Bp1J3-vPk_k6arGIiyK6edLvsIbCO-xQ",
  path: string,
  body: object
) {
   await fetchData(accessToken).post(path, body);
}
