import React, { useState, useEffect } from 'react';
const { ipcRenderer } = window.require('electron');

import Auth from './containers/Auth';
import Example from './containers/Example';
import { IWindowConfig } from './types';

import styles from './styles.module.css'

enum Screen {
  Auth = 'Auth',
  Settings = 'Settings',
  Example = 'Example',
}

interface IScreen {
  content: React.JSX.Element;
  windowConfig: IWindowConfig;
}

function getScreen(screenName: Screen): IScreen {
  switch (screenName) {
    case Screen.Auth:
      return {
        content: <Auth />,
        windowConfig: Auth.windowConfig,
      };
    case Screen.Settings:
      return {
        content: <Settings />,
        windowConfig: { width: 600, height: 400 },
      };
    case Screen.Example:
      return {
        content: <Example />,
        windowConfig: { width: 500, height: 700 },
      };
    default:
      return {
        content: <div>Screen not found</div>,
        windowConfig: {},
      };
  }
}

function Main() {
  const [currentScreen, setCurrentScreen] = useState(Screen.Auth);

  useEffect(() => {
    // Listen for messages from Electron
    ipcRenderer.on('change-window', (event, screenName) => {
      setCurrentScreen(screenName);
    });

    // Clean up event listener when component unmounts
    return () => {
      ipcRenderer.removeAllListeners('change-window');
    };
  }, []);

  const handleChangeScreen = (screenName: Screen) => {
    setCurrentScreen(screenName);
    // Notify Electron main process of page change
    ipcRenderer.send('change-window', screenName);
  };

   const openChildWindow = () => {
    ipcRenderer.send('open-child-window', `/#/example`);
  };

  const { content, windowConfig } = getScreen(currentScreen);

  // Notify Electron main process of window configuration change
  useEffect(() => {
    ipcRenderer.send('window-config', windowConfig);
  }, [currentScreen]);

  return (
    <div className={styles.container}>
      {content}
      {/*
      <button onClick={() => handleChangeScreen(Screen.Auth)}>Go to Auth Screen</button>
      <button onClick={() => handleChangeScreen(Screen.Settings)}>Go to Settings Screen</button>
      <button onClick={openChildWindow}>Open Child Window</button>
      */}
    </div>
  );
};

const Settings = () => {
  return <div>This is the Settings Screen</div>;
};

export default Main;
