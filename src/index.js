// index.js

import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App'; // Импортируйте ваш корневой компонент приложения
import { Provider } from 'mobx-react';
import UserStore from './store/UserStore';
import SelectedItemStore from './store/SelectedItemStore';

const stores = {
  UserStore,
  SelectedItemStore,
}

createRoot(document.getElementById('root')).render(
    
    <Provider {...stores}>
     <App />
    </Provider>
);
