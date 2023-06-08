import { useEffect, useState } from "react";
import React from "react";
import Subtask from "./Subtask";
import axios from "axios";
import { debounce } from "lodash";

function Task({ task, infoUpdate }) {
  const [allSubtask, setAllSubtask] = useState([]);
  const [nameTask, setNameTask] = useState(task.name ? task.name : "");
  const [amountAccepted, setAmountAccepted] = useState(0);
  const [updateFlag, setUpdateFlag] = useState(false);

  useEffect(() => {
    setNameTask(task.name);
    loadData();
  }, [task.id, updateFlag]);

  const saveData = debounce(async (idTask, nameTask, dateEnd) => {
    axios
      .post("http://localhost:5000/updateTask", {
        idTask: idTask,
        nameTask: nameTask,
        dateEnd: dateEnd,
      })
      .then((res) => {
        infoUpdate.setter((prevFlag) => !prevFlag);
      })
      .catch((err) => {
        console.log(err);
      });
  }, 300);

  const loadData = async () => {
    axios
      .post("http://localhost:5000/getSubtask", {
        idTask: task.id,
      })
      .then((res) => {
        setAllSubtask(res.data[0]);
        console.log(res.data[0]);
      })
      .catch((error) => console.log(error));
  };

  const addSubtask = async () => {
    axios
      .post("http://localhost:5000/addSubtask", {
        idTask: task.id,
        title: "Новая задача",
        status: 0,
      })
      .then((res) => {
        setUpdateFlag((prevFlag) => !prevFlag);
      });
  };

  const handleTaskNameChange = (event) => {
    const newName = event.target.value;
    setNameTask((prev) => newName);
    const date = new Date(task.end_time).toISOString().slice(0, 10);
    saveData(task.id, newName, date);
    infoUpdate.setter((prevFlag) => !prevFlag);
  };

  return (
    <div className="task max-size">
      <div className="info">
        <input
          type="text"
          className="nameNote"
          value={nameTask}
          onChange={handleTaskNameChange}
          maxLength={32}
        />
        {/* <h2>{nameTask}</h2> */}
        <p className="date">
          Дата {new Date(task.create_time).toLocaleString()}
        </p>
      </div>

      <div className="subtask-list">
        {allSubtask.map((sub) => {
          return (
            <Subtask
              key={sub.id}
              subtaskItem={sub}
              setUpdateFlag={setUpdateFlag}
            />
          );
        })}
      </div>

      <div className="under-task-field">
        <img
          onClick={addSubtask}
          src="icon/Icon Plus.svg"
          alt="Plus"
          className="icon-plus"
        />
      </div>
    </div>
  );
}

export default Task;
