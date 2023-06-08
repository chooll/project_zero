import axios from "axios";
import React, { useState } from "react";
import { debounce } from "lodash";
import TextareaAutosize from "react-textarea-autosize";

function Subtask({ subtaskItem, setUpdateFlag }) {
  const [subtaskName, setSubtaskName] = useState(subtaskItem.title);
  const [subtaskStatus, setSubtaskStatus] = useState(
    subtaskItem.status > 0 ? true : false
  );

  const deleteSubtask = async () => {
    axios
      .post("http://localhost:5000/deleteSubtask", {
        idSubtask: subtaskItem.id,
      })
      .then((res) => {
        setUpdateFlag((prevFlag) => !prevFlag);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const saveUpdate = debounce((idSubtask, title, status) => {
    axios
      .post("http://localhost:5000/updateSubtask", {
        idSubtask: idSubtask,
        title: title,
        status: status,
      })
      .catch((error) => {
        console.error("Ошибка сохранения данных:", error);
      });
  }, 200);

  const handleSubtaskTitle = (event) => {
    const newTitle = event.target.value;
    setSubtaskName(newTitle);
    saveUpdate(subtaskItem.id, newTitle, subtaskStatus);
  };

  const handleSubtaskStatus = (event) => {
    setSubtaskStatus(event.target.checked);
    console.log(subtaskStatus);
    saveUpdate(subtaskItem.id, subtaskName, event.target.checked);
  };

  return (
    <article className="subtask" key={subtaskItem.id}>
      <input
        type="checkbox"
        className="checkbox-subtask"
        checked={subtaskStatus}
        onChange={handleSubtaskStatus}
      />

      {/* <input
        type="text"
        className="text-subtask"
        value={subtaskName}
        onChange={handleSubtaskTitle}
        maxLength={64}
      /> */}

      <TextareaAutosize
        className="text-subtask"
        minRows={1}
        maxRows={3}
        maxLength="220"
        value={subtaskName}
        placeholder="Название задачи"
        onChange={handleSubtaskTitle}
      />

      <section className="delete-section">
        <p onClick={deleteSubtask}>Удалить</p>
      </section>
    </article>
  );
}

export default Subtask;
