import React from "react";
import { useNavigate } from "react-router-dom";

function SubscribeBlock() {
  const navigate = useNavigate();

  return (
    <article className="subscribe-block" id="subscribe">
      <div className="container">
        <h2 className="name-block">Подписки</h2>

        <div className="grid-subscribe-block">
          <section className="card-subscribe">
            <div className="content-card">
              <h3>Начальный уровень</h3>
              <p>
                Бесплатная подписка, для личного пользования, предоставляет
                базовый функционал приложения
              </p>
              <p className="card-accent">Возможности</p>

              <div className="possibility">
                <img src="icon/Icon Plus.svg" alt="-" className="icon" />
                <p>Создание команды до 5-ти чел.</p>
              </div>

              <div className="possibility">
                <img src="icon/Icon Plus.svg" alt="-" className="icon" />
                <p>Создание досок планирования до 5 штук</p>
              </div>

              <div className="possibility">
                <img src="icon/Icon Plus.svg" alt="-" className="icon" />
                <p>Создание групп задач до 10 штук.</p>
              </div>
            </div>
            <button onClick={(e) => navigate("/user")} className="go-subsribe">
              Начать
            </button>
          </section>

          <section className="card-subscribe">
            <div className="content-card">
              <h3>Продвинутый уровень</h3>
              <p>
                Подписка, для пользователей кому, уже не хватает базового
                фунцкционала
              </p>
              <p className="card-accent">Возможности</p>

              <div className="possibility">
                <img src="icon/Icon Plus.svg" alt="-" className="icon" />
                <p>Создание команды до 12-ти чел.</p>
              </div>

              <div className="possibility">
                <img src="icon/Icon Plus.svg" alt="-" className="icon" />
                <p>Создание досок планирования до 10 штук</p>
              </div>

              <div className="possibility">
                <img src="icon/Icon Plus.svg" alt="-" className="icon" />
                <p>Неограниченное количество групп</p>
              </div>

              <div className="possibility">
                <img src="icon/Icon Plus.svg" alt="-" className="icon" />
                <p>Уведомление о текущих задачах</p>
              </div>
              <div className="possibility">
                <img src="icon/Icon Plus.svg" alt="-" className="icon" />
                <p>Дополнительные возможности кастомизации</p>
              </div>
            </div>
            <button onClick={(e) => navigate("/user")} className="go-subsribe">
              499 руб./мес
            </button>
          </section>

          <section className="card-subscribe">
            <div className="content-card">
              <h3>Копоративный уровень</h3>
              <p>
                Подписка, для пользователей кому, уже не хватает базового
                фунцкционала
              </p>
              <p className="card-accent">Возможности</p>

              <section className="posibility-list">
                <div className="possibility">
                  <img src="icon/Icon Plus.svg" alt="-" className="icon" />
                  <p>Создание команды до 35-ти чел.</p>
                </div>

                <div className="possibility">
                  <img src="icon/Icon Plus.svg" alt="-" className="icon" />
                  <p>Количество досок не ограничено</p>
                </div>

                <div className="possibility">
                  <img src="icon/Icon Plus.svg" alt="-" className="icon" />
                  <p>Уведомление о текущих задачах</p>
                </div>
              </section>
            </div>
            <button onClick={(e) => navigate("/user")} className="go-subsribe">
              1200 руб./мес
            </button>
          </section>
        </div>
      </div>
    </article>
  );
}

export default SubscribeBlock;
