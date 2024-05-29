import { createContext } from 'react';

export enum Screen {
  Auth = 'Auth',
  Settings = 'Settings',
  Example = 'Example',
}

const CurrentScreen = createContext(Screen.Auth);
