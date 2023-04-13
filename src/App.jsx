// App.js

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUserName } from './redux/actions';
import { useState } from 'react';

function App() {
  const [inputName, setInputName] = useState ('');
  const userName = useSelector((state) => state.userName);
  const dispatch = useDispatch();

  const loadDateFromForm = (event) => {
    event.preventDefault();

    if (inputName.length > 5) {
      dispatch(setUserName(inputName));
      console.log('send on server');
    }
  };

  return (
    <div className="App">
      <form className="form-user" onSubmit={(e) => loadDateFromForm(e)}>
        <label>Введите имя</label>
        <input
          type="text"
          onChange={(e) => setInputName(e.target.value)}
          value={inputName}
        />
        <input type="submit"></input>
      </form>

      {userName ? <p>Добро пожаловать {userName}</p> : <span></span>}
    </div>
  );
}

export default App;
