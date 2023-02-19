import axios from 'axios';
import { DEV_API } from '../constants/constants';

export const authenticate = async idToken => {
  const response = await fetch(`${DEV_API}/auth/login/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
    },
    body: JSON.stringify({
      id_token: idToken,
    }),
  });
  const data = await response.json();
  // const response = await axios.post(
  //   `${DEV_API}/auth/login/`,
  //   {
  //     id_token: idToken,
  //   },
  //   {
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Accept: 'application/json',
  //     },
  //   }
  // );

  console.log(data);

  return data;
};
