// index.js

import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './redux/store'; // Импортируйте ваш Redux store
import App from './App'; // Импортируйте ваш корневой компонент приложения

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
);
