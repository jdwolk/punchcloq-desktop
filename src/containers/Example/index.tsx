const { ipcRenderer } = window.require('electron');

function Example() {
  const closeWindow = () => {
    ipcRenderer.send('close-child-window');
  }

  return (
    <div>
      <h1>This is an example screen</h1>
      <button onClick={closeWindow}>Close Window</button>
    </div>
  );
}

export default Example;
