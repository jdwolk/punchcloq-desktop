import React from 'react';
import { createRoot } from 'react-dom/client';
import { createHashRouter, createRoutesFromElements, HashRouter, Route, Routes, RouterProvider } from "react-router-dom";

import Example from './containers/Example';
import Main from './Main'

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path='/' element={<Main />}/>
        <Route path='/example' element={<Example />}/>
      </Routes>
    </HashRouter>
  );
}

const root = createRoot(document.getElementById('root'));
root.render(<App />);
