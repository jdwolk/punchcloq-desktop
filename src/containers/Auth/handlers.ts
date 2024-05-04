import { fetch } from '../../util/ipc';

export async function authenticate({ email, password }: { email: string, password: string }) {
  const serverUrl = 'http://127.0.0.1:3000';
  const route = '/users/sign_in';
  const fullUrl = serverUrl + route;

  const payload = {
    user: {
      email,
      password,
    },
  };

  fetch(fullUrl, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(payload),
  }).then((result) => {
    console.log('### Result: ', result);
  }).catch((err) => {
    console.error(err);
  });
};
