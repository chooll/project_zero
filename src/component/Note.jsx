import axios from "axios";
import React, { useState, useEffect } from "react";
import { debounce } from "lodash";
import TextareaAutosize from "react-textarea-autosize";

function Note({ note, infoUpdate }) {
  const [noteName, setNoteName] = useState(note.name ? note.name : "");
  const [noteDescription, setNoteDescription] = useState(note.description);

  useEffect(() => {
    setNoteDescription(note.description);
    setNoteName(note.name);
  }, [note.id]);

  const saveUpdate = debounce(async (nT, noteDescription, idNote) => {
    axios
      .post("http://194.67.110.25:5000/updateNote", {
        noteName: nT,
        noteDescription: noteDescription,
        idNote: idNote,
      })
      .then((res) => {
        infoUpdate.setter((prevFlag) => !prevFlag);
      })
      .catch((error) => {
        console.error("Ошибка сохранения данных:", error);
      });
  }, 100);

  const handleNoteNameChange = (event) => {
    const newNoteName = event.target.value;
    setNoteName(newNoteName);
    saveUpdate(newNoteName, noteDescription, note.id);
    infoUpdate.setter((prevFlag) => !prevFlag);
  };

  const handleNoteDescriptionChange = (event) => {
    const newDescription = event.target.value;
    setNoteDescription(newDescription);
    saveUpdate(noteName, newDescription, note.id);
    infoUpdate.setter((prevFlag) => !prevFlag);
  };

  return (
    <div className="content-space max-size">
      <div className="info">
        <input
          type="text"
          className="nameNote"
          value={noteName}
          onChange={handleNoteNameChange}
          maxLength="30"
        />

        <p className="date">
          Дата {new Date(note.date_create).toLocaleString()}
        </p>
      </div>

      <TextareaAutosize
        className="inputBlock"
        minRows={1}
        maxRows={200}
        maxLength="2300"
        value={noteDescription}
        placeholder="Запишите вашу заметку"
        onChange={handleNoteDescriptionChange}
      />

      {/* <p>{noteDescription.length}</p> */}
      <button className="red c-button"></button>
    </div>
  );
}

export default Note;
