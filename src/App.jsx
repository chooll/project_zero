import React from "react";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CookiesProvider } from "react-cookie";

// Страницы
import About from "./page/About";
import Autorisation from "./page/Autorisation";
import Desknote from "./page/Desknote";
import Registration from "./page/Registration";

function App() {
  const [inputName, setInputName] = useState("");

  return (
    <CookiesProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<About />} exact />
          <Route path="/autorisation" element={<Autorisation />} exact />
          <Route path="/reg" element={<Registration />} exact />
          <Route path="/user" element={<Desknote />} exact />
          <Route path="*" element={<About />} />
        </Routes>
      </BrowserRouter>
    </CookiesProvider>
  );
}

export default App;
