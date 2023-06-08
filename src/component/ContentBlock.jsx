import React, { useEffect } from "react";
import ContentItem from "./ContentItem";
import { useState } from "react";
import UserStore from "../store/UserStore";
import axios from "axios";
import AddProjectTeam from "../component/desknote-page/AddProjectTeam";

function ContentBlock({
  selectedMenuItem,
  setSelectedContentItem,
  infoUpdate,
}) {
  const [data, setData] = useState([]);
  const [updateFlag, setUpdateFlag] = useState(false);

  const blockNames = {
    project: {
      name: "Проекты",
      descript: "В данной вкладке отображаются ваши текущие проекты",
    },
    note: {
      name: "Заметки",
      descript: "В данной вкладке отображаются ваши текущие заметки",
    },
    task: {
      name: "Задачи",
      descript: "В данной вкладке отображаются ваши текущие задачи",
    },
    team: {
      name: "Команды",
      descript: "В данной вкладке отображаются ваши текущие команды",
    },
    idei: {
      name: "Идеи",
      descript: "В данной вкладке отображаются ваши текущие идеи",
    },
  };

  const allURLData = {
    task: "getAllTask",
    note: "getAllNotes",
    team: "getUserTeam",
    project: "getUserProject",
    idei: "getAllIdea",
  };

  const displayBlockName = (numBlock) => {
    return (
      <div className="name-descript-content">
        <h2 className="name-content">{blockNames[numBlock].name}</h2>
        <p className="descript-content">{blockNames[numBlock].descript}</p>
      </div>
    );
  };

  const loadAllDataFromDB = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/${allURLData[selectedMenuItem]}?id=${UserStore.id}`
      );

      const data = await response.json();
      if (data[0]) {
        setData(data[0]);
      }
    } catch (error) {
      console.log("ОШИБКА", error);
    }
  };

  const [visible, setVisible] = useState(false);

  const addContentItem = {
    task: async () => {
      axios
        .post("http://localhost:5000/addTask", {
          name: "Задача без названия",
          idUser: UserStore.id,
          dataEnd: new Date().toISOString().slice(0, 10),
        })
        .then((response) => {
          setUpdateFlag((prevFlag) => !prevFlag);
        })
        .catch((error) => {
          console.log("ошибка добавления заметки", error);
        });
    },

    note: async () => {
      axios
        .post("http://localhost:5000/addNote", {
          name: "Пустая заметка",
          description: "",
          userId: UserStore.id,
        })
        .then((response) => {
          setUpdateFlag((prevFlag) => !prevFlag);
        })
        .catch((error) => {
          console.error("ошибка добавление заметки", error);
        });
    },

    team: async () => {
      axios
        .post("http://localhost:5000/addTeam", {
          nameTeam: "Команда без названия",
          idUser: UserStore.id,
        })
        .then((response) => {
          setUpdateFlag((prevFlag) => !prevFlag);
        })
        .catch((err) => console.log("Ошибка добавления команды", err));
    },
    project: async () => {
      setVisible(true);
    },
    idei: "getAllIdea",
  };

  useEffect(() => {
    loadAllDataFromDB();
  }, [updateFlag, selectedMenuItem, infoUpdate.value]);

  useEffect(() => {
    setData([]);
  }, [selectedMenuItem]);

  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    // Функция фильтрации данных
    const filterData = () => {
      const filteredItems = data.filter((el) =>
        el.name.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredData(filteredItems);
    };

    filterData();
  }, [data, search]);

  return (
    <article
      className={selectedMenuItem === 0 ? "display-none" : "content-block"}
    >
      {displayBlockName(selectedMenuItem)}
      <AddProjectTeam
        idUser={UserStore.id}
        visible={visible}
        setVisible={setVisible}
        setUpdateFlag={setUpdateFlag}
      />
      <div className="filter">
        <img className="icon" src="icon/Icon Search.svg" alt="search" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input gray-back"
          placeholder="Поиск"
        />
      </div>

      <section className="content-list">
        {filteredData.map((el) => (
          <ContentItem
            updateFlag={setUpdateFlag}
            key={el.id}
            type={selectedMenuItem}
            setSelectedContentItem={setSelectedContentItem}
            contentInfo={el}
          />
        ))}
      </section>

      <section className="add-icon">
        <img
          src="icon/Icon Plus.svg"
          alt="plus pd20"
          onClick={(e) => addContentItem[selectedMenuItem]()}
          className="icon"
        />
      </section>
    </article>
  );
}
export default ContentBlock;
