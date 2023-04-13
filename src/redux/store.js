// store.js

import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // localStorage в качестве хранилища

// Импортируйте редюсер, который будет обрабатывать действия, связанные с userName
import rootReducer from './reducers';

// Конфигурация для redux-persist
const persistConfig = {
  key: 'root', // ключ для хранения данных в localStorage
  storage,
};

// Создаем persistedReducer с использованием persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Создаем store с использованием persistedReducer
const store = createStore(persistedReducer);

// Создаем persistor для хранения данных в localStorage
export const persistor = persistStore(store);

export default store;
