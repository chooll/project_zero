// reducers.js

// Здесь должны быть импорты необходимых действий и типов действий

// Изначальное состояние для userName
const initialState = {
  userName: '',
};

// Редюсер для обработки действий связанных с userName
const userNameReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER_NAME':
      return {
        ...state,
        userName: action.payload,
      };
    default:
      return state;
  }
};

export default userNameReducer;
