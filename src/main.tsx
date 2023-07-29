import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider as ReduxProvider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App.tsx';
import store from './redux/store.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ReduxProvider store={store}>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </ReduxProvider>
    </BrowserRouter>
  </React.StrictMode>
);
