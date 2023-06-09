import React from "react";
import "../../style/about-page-style/about-page.scss";
import { Link } from "react-router-dom";

function Header() {
  return (
    <article className="header">
      <section className="top-bar">
        <div className="logotype">
          <img src="logotype/Logotype.svg" alt="logo" className="logo" />
          <p>Enote Desk</p>
        </div>
      </section>

      <section className="info-brand container">
        <div className="logotype">
          <img src="logotype/Logotype.svg" alt="logo" className="logo" />
          <p>Excellent Note Desk</p>
        </div>

        <div className="text-brand">
          <p>
            Это простое и изящное решение для тех, кто хочет прогрессировать.
          </p>
          <Link className="link" to="/autorisation">
            В перед к прогрессу
          </Link>
        </div>
      </section>

      <section className="link-bar container">
        <a href="#about" className="link">
          О нас
        </a>
        <a href="#func" className="link">
          Возможности
        </a>
        <a href="#subscribe" className="link">
          Подписи
        </a>
        <Link to="/autorisation" className="link">
          Регистрация
        </Link>
      </section>
    </article>
  );
}

export default Header;
