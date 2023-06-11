import axios from "axios";
import React, { useState, useEffect } from "react";
import UserStore from "../../store/UserStore";

function ContentItem({
  type,
  updateFlag,
  contentInfo,
  setSelectedContentItem,
}) {
  const [confirm, setConfirm] = useState(true);
  const [deleted, setDeleted] = useState(false); // Добавленное состояние для отслеживания удаления элемента

  const changeConfirm = () => {
    setConfirm(confirm ? false : true);
  };

  const deleteItem = (idItem) => {
    switch (type) {
      case "task":
        axios
          .post("http://194.67.110.25:5000/deleteTask", { idTask: idItem })
          .then((response) => {
            updateFlag((prevFlag) => !prevFlag);
          })
          .catch((error) => {
            console.log(error);
          });
      case "note":
        axios
          .post("http://194.67.110.25:5000/deleteNote", {
            idNote: idItem,
          })
          .then((response) => {
            updateFlag((prevFlag) => !prevFlag);
          })
          .catch((error) => {
            console.error(error);
          });
      case "team":
        axios
          .post("http://194.67.110.25:5000/deleteMember", {
            idTeam: idItem,
            idMember: UserStore.id,
          })
          .then((response) => {
            updateFlag((prevFlag) => !prevFlag);
          })
          .catch((error) => {
            console.log(error);
          });
    }
  };

  return (
    <div
      className="content-item"
      key={contentInfo.id}
      onClick={() => {
        setSelectedContentItem(contentInfo.id);
      }}
    >
      <section className={!confirm ? "delete-confirm" : "display-none"}>
        <p>Вы точно хотите удалить?</p>
        <div className="choose">
          <p
            className="warning-conf"
            onClick={(e) => deleteItem(contentInfo.id)}
          >
            Да
          </p>
          <p onClick={changeConfirm}>Нет</p>
        </div>
      </section>

      <section className={confirm ? "name-content" : "display-none"}>
        <div className="color-item"></div>
        <p>{contentInfo.name}</p>
      </section>

      <section className={confirm ? "icon-func" : "display-none"}>
        <p onClick={changeConfirm}>Удалить</p>
      </section>
    </div>
  );
}

export default ContentItem;
