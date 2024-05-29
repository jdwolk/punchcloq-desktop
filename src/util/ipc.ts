const { ipcRenderer } = window.require('electron');

type DefaultHeader = Record<string, string>;

interface IResponseWrapper<JSONType, HeaderType = DefaultHeader> {
  status: Response['status'],
  json: JSONType,
  headers: HeaderType,
}

export function fetch<JSONType, HeaderType = DefaultHeader>(
  url: string,
  data?: RequestInit
): Promise<IResponseWrapper<JSONType>> {
  return new Promise((resolve, reject) => {
    ipcRenderer.send('api-request', url, data);
    ipcRenderer.once('api-response', (_event, responseData) => {
      resolve(responseData);
    });
    ipcRenderer.once('api-error', (_event, error) => {
      reject(error);
    });
  });
};
