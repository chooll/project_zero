// actions.js

// Действие для установки значения userName
export const setUserName = (userName) => {
  return {
    type: 'SET_USER_NAME',
    payload: userName,
  };
};
