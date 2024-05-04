const { ipcRenderer } = window.require('electron');

// TODO: use types from the fetch API?
export function fetch<DataType, ResponseType>(url: string, data?: DataType): Promise<ResponseType> {
  return new Promise((resolve, reject) => {
    ipcRenderer.send('http-request', url, data);
    ipcRenderer.once('http-response', (_event, responseData) => {
      console.log('### ResonseData: ', JSON.stringify(responseData));
      resolve(responseData);
    });
    ipcRenderer.once('http-error', (_event, error) => {
      reject(error);
    });
  });
};
