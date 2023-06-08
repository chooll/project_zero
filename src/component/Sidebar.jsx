import React from "react";
import "../style/sidebar-style.scss";
import UserStore from "../store/UserStore";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
const icons = [
  {
    src: "icon/Icon User.svg",
    alt: "User Icon",
    className: "icon icon-user",
    menuIndex: "user",
  },
  {
    src: "icon/Icon Desk.svg",
    alt: "Проект Icon",
    className: "icon",
    menuIndex: "project",
  },
  {
    src: "icon/Icon Zametki.svg",
    alt: "Заметки Icon",
    className: "icon",
    menuIndex: "note",
  },
  {
    src: "icon/Icon Note.svg",
    alt: "Задачи Icon",
    className: "icon",
    menuIndex: "task",
  },
  {
    src: "icon/Icon Command.svg",
    alt: "Команды Icon",
    className: "icon",
    menuIndex: "team",
  },
  //
  // Идеи умерли, как и желание делать диплом
  // { src: "icon/Icon Idei.svg", alt: "Идеи Icon", className: "icon", menuIndex: "idei" }
];

function Sidebar({ setSelectedMenuItem }) {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies();
  return (
    <section className="sidebar">
      <div className="sidebar-small">
        {icons.map((icon, index) => (
          <img
            key={index}
            src={icon.src}
            alt={icon.alt}
            className={icon.className}
            onClick={() => setSelectedMenuItem(icon.menuIndex)}
          />
        ))}
      </div>

      {/* Убийство сайдбара, было новым загадочным делом, и никто не понял как он умер! - Леонид Каневский */}
      <div className="sidebar-full">
        <div
          className="menu-block"
          onClick={(e) => {
            removeCookie("user");
            navigate("/autorisation");
          }}
        >
          <img
            src={icons[0].src}
            alt={icons[0].alt}
            className={icons[0].className}
          />
          <p className="name-user">{UserStore.name}</p>
          <p className="out-acc">Выйти?</p>
        </div>

        {/* Работает красиво */}
        {icons.slice(1).map((icon, index) => (
          <div
            key={index}
            className="menu-block"
            onClick={() => setSelectedMenuItem(icon.menuIndex)}
          >
            <img src={icon.src} alt={icon.alt} className={icon.className} />
            <p>{icon.alt.split(" ")[0]}</p>
          </div>
        ))}
        {/* Простое удаление куки  */}
      </div>
    </section>
  );
}

export default Sidebar;
