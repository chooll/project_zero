import axios from "axios";
import React from "react";
import { useState } from "react";

function AddProjectTeam({ visible, setVisible, idUser, setUpdateFlag }) {
  const [team, setTeam] = useState([]);

  const loadAllDataFromDB = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/getUserTeam?id=${idUser}`
      );
      const data = await response.json();
      if (data[0]) {
        setTeam(data[0]);
      }
    } catch (error) {
      console.log("ОШИБКА", error);
    }
  };

  useState(() => {
    loadAllDataFromDB();
  }, []);

  const addProject = async (idItem) => {
    axios
      .post("http://localhost:5000/addProject", {
        name: "Проект без названия",
        id: idItem,
      })
      .then((response) => {
        setUpdateFlag((prevFlag) => !prevFlag);
        setVisible(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <article className={visible ? "modal-overlay-project" : "display-none"}>
      <div className="modal">
        <div className="name-window">
          Выберите команду, для добавления проекта
          <img onClick={(e) => setVisible(false)} src="icon/krest.png" alt="" />
        </div>

        <div className="teams-list">
          {team.map((item) => (
            <div
              onClick={(e) => addProject(item.id)}
              className="team-item"
              key={item.id}
            >
              <p className="team-name-item">{item.name}</p>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}

export default AddProjectTeam;
