import React from "react";

function FunctionalProduct() {
  return (
    <div className="container" id="func">
      <article className="project-functional">
        <h2>Возможности Enote Desk</h2>

        <section className="project-list">
          <div className="flex-three">
            <div className="project-card">
              <div className="project-name">
                <h3>ПЛАНИРОВАНИЕ ЗАДАЧ</h3>
              </div>
              <div className="project-description">
                <div className="text-icon">
                  <img
                    className="project-icon"
                    src="icon/Icon Note.svg"
                    alt="Icon Note"
                  />
                  <p>Планирование и тонкая настройка любых ваших задач</p>
                </div>
              </div>
            </div>

            <div className="project-card">
              <div className="project-name">
                <h3>РАБОТА В КОМАНДЕ</h3>
              </div>
              <div className="project-description">
                <div className="text-icon">
                  <img
                    className="project-icon"
                    src="icon/Icon Command.svg"
                    alt="Icon Note"
                  />
                  <p>Работайте со своей командой до 50-ти человек вместе </p>
                </div>
              </div>
            </div>

            <div className="project-card">
              <div className="project-name">
                <h3>ГЕНЕРАЦИЯ ИДЕЙ</h3>
              </div>
              <div className="project-description">
                <div className="text-icon">
                  <img
                    className="project-icon"
                    src="icon/Icon Idei.svg"
                    alt="Icon Note"
                  />
                  <p>Записывайте ваши идеи, чтобы они не пропадали безследно</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-three">
            <div className="project-card">
              <div className="project-name">
                <h3>СОЗДАНИЕ ЗАМЕТОК</h3>
              </div>
              <div className="project-description">
                <div className="text-icon">
                  <img
                    className="project-icon"
                    src="icon/Icon Zametki.svg"
                    alt="Icon Note"
                  />
                  <p>
                    Записывайте ваши мысли и различные напоминания о ваших делах
                  </p>
                </div>
              </div>
            </div>

            <div className="project-card">
              <div className="project-name">
                <h3>УПРАВЛЕНИЕ ПРОЕКТАМИ</h3>
              </div>
              <div className="project-description">
                <div className="text-icon">
                  <img
                    className="project-icon"
                    src="icon/Icon Desk.svg"
                    alt="Icon Note"
                  />
                  <p>
                    Создание плана ваших проектов, любых маштабов с детальным
                    описанием
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </article>
    </div>
  );
}

export default FunctionalProduct;
