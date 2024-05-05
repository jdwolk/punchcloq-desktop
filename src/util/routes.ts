export const SERVER_HOST = 'http://127.0.0.1:3000'; // TODO: pull from env

function serverUrl(route: string) {
  return `${SERVER_HOST}${route}`
}

export const restEndpoints = {
  signIn: () => serverUrl('/users/sign_in'),
}
