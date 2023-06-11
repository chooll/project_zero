import axios from "axios";
import React, { useState, useEffect } from "react";
import TaskArea from "./Taskare";
import ProjectItem from "./ProjectItem";
import { debounce } from "lodash";

const namePoints = ["getItemKanban", "getTaskKanban"];

function Kanban({ kanban, infoUpdate }) {
  const [nameKanban, setNameKanban] = useState(kanban.name);
  const [itemKanban, setItemKanban] = useState([]);
  const [updateFlag, setUpdateFlag] = useState(false);

  useEffect(() => {
    setNameKanban(kanban.name);
    loadItem(namePoints[0], setItemKanban); // Массив
  }, [kanban.id, updateFlag]);

  const saveData = debounce(async (name) => {
    axios
      .post("http://194.67.110.25:5000/updateProject", {
        project: kanban.id,
        name: name,
      })
      .then((res) => {
        infoUpdate.setter((prevFlag) => !prevFlag);
      })
      .catch((err) => console.log(err));
  }, 300);

  const loadItem = async () => {
    axios
      .post(`http://194.67.110.25:5000/getItemKanban`, {
        idItem: kanban.id,
      })
      .then((response) => {
        setItemKanban(response.data[0]);
      })
      .catch((error) => console.log(error));
  };

  const addItemKanban = async () => {
    axios
      .post(`http://194.67.110.25:5000/addKanbanItem`, {
        itemName: "Без названия",
        idKanban: kanban.id,
      })
      .then((res) => {
        setUpdateFlag((prevFlag) => !prevFlag);
        infoUpdate.setter((prevFlag) => !prevFlag);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChangeName = (event) => {
    const name = event.target.value;
    setNameKanban(name);
    saveData(name);
    infoUpdate.setter((prevFlag) => !prevFlag);
  };

  return (
    <article className="kanbas">
      <article className="team">
        <div className="info">
          <input
            type="text"
            className="nameNote"
            value={nameKanban}
            onChange={handleChangeName}
            maxLength="32"
          />
          <p className="team-name">Команда</p>
          <p className="date">
            Дата {new Date(kanban.date_create).toLocaleString().slice(0, 10)}
          </p>
        </div>
      </article>

      <div className="func">
        <p className="add" onClick={addItemKanban}>
          Добавить план
        </p>
      </div>

      <article className="work-kanban">
        {itemKanban.map((item) => {
          return (
            <ProjectItem
              key={item.id}
              projectItem={item}
              infoUpdate={infoUpdate}
              setUpdateFlag={setUpdateFlag}
            />
          );
        })}
      </article>
    </article>
  );
}

export default Kanban;
