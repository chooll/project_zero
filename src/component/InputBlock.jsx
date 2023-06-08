import React, { useState } from "react";


function InputBlock ({text, type, typeDate, inputValue, setInputValue}) {

  
  const verifyString = (event) => {
    var inputString = event.target.value; 
    switch (typeDate) {
      case "only_text": 
        inputString = inputString.replace(/[^а-яa-zA-Z\s,.]/gi, '');
        break;
    }
    setInputValue (inputString);
  }

  return (
    <div className="input-block">
      <p>{text}</p>
      <input 
        type={type} 
        value={inputValue} 
        onChange={e => verifyString(e)}
      />
    </div>

  );
} export default InputBlock;