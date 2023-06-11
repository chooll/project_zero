import React, { useState, useEffect } from "react";
import TaskArea from "./Taskare";
import axios from "axios";
import UserStore from "../../store/UserStore";
import { debounce } from "lodash";

function ProjectItem({ projectItem, setUpdateFlag, infoUpdate }) {
  const [projectItemName, setProjectItemName] = useState(projectItem.name);
  const [taskProjectItem, setTaskProjectItem] = useState([]);
  const [selfUpdateFlag, setSelfUpdateFlag] = useState(false);

  useEffect(() => {
    loadItem();
  }, [selfUpdateFlag]);

  const saveData = debounce(async (name) => {
    axios.post("http://194.67.110.25:5000/updateKanbanItem", {
      itemId: projectItem.id,
      name: name,
    });
  }, 300);

  const handleNameProjectItem = (event) => {
    const name = event.target.value;
    setProjectItemName(name);
    saveData(name);
    infoUpdate.setter((prevFlag) => !prevFlag);
  };

  const loadItem = async () => {
    axios
      .post(`http://194.67.110.25:5000/getTaskKanban`, {
        idItem: projectItem.id,
      })
      .then((response) => {
        if (response.data) {
          setTaskProjectItem(response.data);
        }
      })
      .catch((error) => console.log(error));
  };

  const addTaskItem = async () => {
    axios
      .post(`http://194.67.110.25:5000/addTaskKanban`, {
        itemId: projectItem.id,
        nameTask: "",
        userId: UserStore.id,
      })
      .then((response) => {
        setSelfUpdateFlag((prevFlag) => !prevFlag);
      })
      .catch((error) => console.log(error));
  };

  const deleteItem = async () => {
    axios
      .post("http://194.67.110.25:5000/deleteProjectItem", {
        idItem: projectItem.id,
      })
      .then((response) => {
        setSelfUpdateFlag(response);
        setUpdateFlag((prevFlag) => !prevFlag);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="project-item">
      <div className="name-delete">
        <input
          type="text"
          className="item-name"
          value={projectItemName}
          onChange={handleNameProjectItem}
          maxLength={28}
        />
        <img
          onClick={deleteItem}
          className="icon"
          src="icon/kres_white.png"
          alt=""
        />
      </div>

      <article className="list-task">
        <section className="project-task">
          {taskProjectItem.map((task) => (
            <TaskArea
              infoUpdate={infoUpdate}
              setUpdateFlag={setSelfUpdateFlag}
              key={task.id}
              task={task}
              selfUpdateFlag={selfUpdateFlag}
              setUpdate={setUpdateFlag}
            />
          ))}

          <div className="add-task" onClick={addTaskItem}>
            Добавить задачу
          </div>
        </section>
      </article>
    </div>
  );
}

export default ProjectItem;
