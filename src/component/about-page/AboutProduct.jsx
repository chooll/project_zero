import React from "react";

export default function AboutProduct() {
  return (
    <article className="about-product" id="about">
      <section className="container">
        <div className="flex-block">
          <div className="text-flex-block">
            <h2>Что такое Enote Desk?</h2>
            <p>
              Это простое веб-приложение, которые позволит вам планировать ваши
              задачи или вашей команды, создание различных заметок, а так же
              послужит генератором идей для ваших проектов или дел
            </p>
          </div>
          <img src="icon/Image Project.svg" alt="" />
        </div>
      </section>
    </article>
  );
}
