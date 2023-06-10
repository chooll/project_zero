import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "../style/user-page.scss";

import Sidebar from "../component/Sidebar";
import ContentBlock from "../component/content-block/ContentBlock";
import Note from "../component/Note";
import Task from "../component/Task";
import UserStore from "../store/UserStore";
import Team from "../component/desknote-page/Team";
import Kanban from "../component/desknote-page/Kanbas";

function Desknote() {
  const navigate = useNavigate();

  const [selectedMenuItem, setSelectedMenuItem] = useState(0);
  const [selectedContentItem, setSelectedContentItem] = useState(-1);

  const [valueUpdate, setValueUpdate] = useState(false);

  const [loadedNote, setLoadedNote] = useState({});

  const [loadedTask, setLoadedTask] = useState({});
  const [loadedSubtask, setLoadedSubtask] = useState([]);

  const [loadedTeam, setLoadedTeam] = useState([]);
  const [loadedKanban, setLoadedKanban] = useState({});

  // Флаги обновления для дочерних элементов
  const infoUpdate = {
    value: valueUpdate,
    setter: setValueUpdate,
  };

  // отображение в рабочей области выбранного меню
  const displayWorkDeskContent = (selectedMenuItem) => {
    switch (selectedMenuItem) {
      case "note":
        return loadedNote.id ? (
          <Note infoUpdate={infoUpdate} note={loadedNote} />
        ) : (
          <div>Loading...</div>
        );

      case "task":
        return loadedTask && loadedTask.length > 0 ? (
          <Task
            infoUpdate={infoUpdate}
            task={loadedTask[0]}
            subtask={loadedSubtask}
          />
        ) : (
          <div className="text">Загрузка</div>
        );

      case "team":
        return loadedTeam.id ? (
          <Team team={loadedTeam} infoUpdate={infoUpdate} />
        ) : (
          <div className="text">Загрузка</div>
        );

      case "project":
        return loadedKanban.id ? (
          <Kanban kanban={loadedKanban} infoUpdate={infoUpdate} />
        ) : (
          <div>Загрузка...</div>
        );
    }
  };

  const loadKanbanInfo = (selectedContentItem) => {
    axios
      .post("http://localhost:5000/getProject", {
        idProject: selectedContentItem,
      })
      .then((response) => {
        setLoadedKanban(response.data[0]);
      })
      .catch((error) => console.log(error));
  };

  const loadTeamInfo = (selectedContentItem) => {
    axios
      .post("http://localhost:5000/getTeam", {
        idTeam: selectedContentItem,
      })
      .then((response) => {
        setLoadedTeam(response.data[0][0]);
      })
      .catch((error) => console.log(error));
  };

  const loadTaskInfo = async (selectedContentItem) => {
    axios
      .post("http://localhost:5000/getTask", {
        idTask: selectedContentItem,
      })
      .then((res) => {
        setLoadedTask(res.data[0]);
      })
      .catch((error) => console.log(error));
  };

  const fetchToServer = async (api, id) => {
    try {
      const response = await fetch(`http://localhost:5000/${api}?id=${id}`);
      const data = await response.json();
      if (data.length !== 0) {
        setLoadedNote(data[0]);
      }
    } catch (error) {
      console.log("ОШИБКА", error);
    }
  };

  const getWorkSpaceData = async () => {
    switch (selectedMenuItem) {
      case "note":
        fetchToServer("getNoteData", selectedContentItem);
        break;
      case "task":
        loadTaskInfo(selectedContentItem);
        break;
      case "team":
        loadTeamInfo(selectedContentItem);
        break;
      case "project":
        loadKanbanInfo(selectedContentItem);
        break;
    }
  };
  const SendOnAutorisation = () => {
    if (!UserStore.id) {
      navigate("/autorisation");
    }
  };

  useEffect((e) => {
    SendOnAutorisation();
  }, []);

  useEffect(
    (e) => {
      getWorkSpaceData();
    },
    [selectedContentItem, infoUpdate.value]
  );

  return (
    <div className="desk-note">
      <Sidebar setSelectedMenuItem={setSelectedMenuItem} />

      <div className="grid-table">
        {selectedMenuItem === 0 ? (
          <span></span>
        ) : (
          <ContentBlock
            infoUpdate={infoUpdate}
            setSelectedContentItem={setSelectedContentItem}
            selectedMenuItem={selectedMenuItem}
          />
        )}

        <div className="work-desk">
          {selectedContentItem === -1 ? (
            <div className="text">Здесь ничего нет, пока</div>
          ) : (
            <div className="content-space" id="cs">
              {displayWorkDeskContent(selectedMenuItem)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default Desknote;
