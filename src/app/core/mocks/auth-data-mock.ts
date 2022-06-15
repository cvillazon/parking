import { Users } from "@auth/shared/model/Users";

export const loginSuccesfullyResult = () : Users[] => {
  return [
    {
      id: 1,
      email: 'andres.villazon@ceiba.com',
      password:"",
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFuZHJlcy52aWxsYXpvbkBjZWliYS5jb20uY28iLCJpZCI6IjEiLCJpYXQiOjE1MTYyMzkwMjJ9.PU9kIdBC_9CGttcUGe5BpGHKD75Sxfdbr495ZevNQ4s',
    },
  ];
};

export const loginFailedResult = () => {
  return [];
};
