import { fetch } from '../../util/ipc';
import { restEndpoints as api } from '../../util/routes';
import * as Result from '../../util/result';

interface IAuthenticateHeaders {
  authorization: string,
};

type AuthenticateFailure = string;

export async function authenticate({ email, password }: { email: string, password: string }): Promise<Result.Result<string, AuthenticateFailure>> {
  const payload = {
    user: {
      email,
      password,
    },
  };

  try {
    const { headers } = await fetch<unknown, IAuthenticateHeaders>(api.signIn(), {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const { authorization } = headers;
    const jwt = authorization.split(' ')[1];
    localStorage.setItem('jwt', jwt);

    return Result.success(jwt);
  } catch {
    return Result.failure('Failed to authenticate');
  }
};
