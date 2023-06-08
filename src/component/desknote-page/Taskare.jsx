import React, { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { debounce } from "lodash";
import axios from "axios";

function TaskArea({ task, setUpdateFlag, infoUpdate, setUpdate }) {
  const [nameTask, setNameTask] = useState(task.name);
  const [deleteVisible, setDeleteVisible] = useState(false);

  const saveData = debounce(async (nameTask) => {
    axios
      .post("http://localhost:5000/updateProjectTask", {
        idTask: task.id,
        nameTask: nameTask,
      })
      .then((responce) => {
        setUpdateFlag((prevFlag) => !prevFlag);
      })
      .catch((error) => console.log(error));
  }, 300);

  const deleteData = async () => {
    axios
      .post("http://localhost:5000/deleteProjectTask", {
        idItem: task.id,
      })
      .then((responce) => {
        setUpdateFlag((prevFlag) => !prevFlag);
        setUpdate((prevUpdate) => !prevUpdate);
      })
      .catch((error) => console.log(error));
  };
  const handleInputName = (e) => {
    const nameTask = e.target.value;
    setNameTask(nameTask);
    saveData(nameTask);
  };

  return (
    <div
      className="taskarea"
      onMouseEnter={(e) => setDeleteVisible(true)}
      onMouseLeave={(e) => setDeleteVisible(false)}
      onTouchStart={(e) => setDeleteVisible(true)}
      onTouchEnd={(e) => setDeleteVisible(false)}
    >
      <TextareaAutosize
        className="task-name"
        maxLength={150}
        minRows={1}
        value={nameTask}
        onChange={handleInputName}
        maxRows={10}
        placeholder="Введите задачу"
      />

      <div className={deleteVisible ? "delete" : "display-none"}>
        {new Date(task.date_create).toLocaleString().slice(0, 10)}
        <p onClick={deleteData}>Удалить</p>
      </div>
    </div>
  );
}

export default TaskArea;
