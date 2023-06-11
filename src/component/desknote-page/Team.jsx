import React, { useEffect, useState } from "react";
import UserStore from "../../store/UserStore";
import axios from "axios";
import { debounce } from "lodash";

function Team({ team, infoUpdate }) {
  const [nameTeam, setNameTeam] = useState(team.name);
  const [membersTeam, setMembersTeam] = useState([]);
  const [searchMember, setSearchMember] = useState("");
  const [emailMember, setEmailMember] = useState("");
  const [updateFlag, setUpdateFlag] = useState(false);

  useEffect(() => {
    setNameTeam(team.name);
    loadAllMembers();
  }, [team.id]);

  useEffect(() => {
    loadAllMembers();
  }, [updateFlag]);
  const saveUpdate = debounce(async (nameTeam, idTeam) => {
    axios
      .post("http://194.67.110.25:5000/updateTeam", {
        nameTeam: nameTeam,
        idTeam: idTeam,
      })
      .then((res) => {
        infoUpdate.setter((prevFlag) => !prevFlag);
      })
      .catch((error) => {
        console.error("Ошибка сохранения данных:", error);
      });
  }, 300);

  const handleTeamName = (event) => {
    const newNameTeam = event.target.value;
    setNameTeam(newNameTeam);
    saveUpdate(newNameTeam, team.id);
    infoUpdate.setter((prevFlag) => !prevFlag);
  };

  const loadAllMembers = () => {
    axios
      .post("http://194.67.110.25:5000/getMembersTeam", {
        idTeam: team.id,
        idUser: UserStore.id,
      })
      .then((response) => {
        setMembersTeam(response.data[0]);
      })
      .catch((error) => console.log(error));
  };

  const deleteMember = (idUser) => {
    axios
      .post("http://194.67.110.25:5000/deleteMember", {
        idTeam: team.id,
        idMember: idUser,
      })
      .then((response) => {
        setUpdateFlag((prevFlag) => !prevFlag);
        infoUpdate.setter((prevFlag) => !prevFlag);
      })
      .catch((err) => console.log(err));
  };

  // Функция для фильтрации участников поисковым запросом
  const filterMembers = () => {
    return membersTeam.filter((member) =>
      (member.name + " " + member.surname + " " + member.email)
        .toLowerCase()
        .includes(searchMember.toLowerCase())
    );
  };

  const addMember = (emailUser) => {
    var idUser = null;
    axios
      .post("http://194.67.110.25:5000/getUserIdEmail", {
        email: emailUser,
      })
      .then((response) => {
        idUser = response.data;
        console.log(idUser);
        if (idUser.length > 0) {
          idUser = idUser[0].id;
          if (idUser && idUser !== UserStore.id) {
            const existingMember = membersTeam.find(
              (member) => member.id === idUser
            );
            if (existingMember) {
              return;
            }
            axios
              .post("http://194.67.110.25:5000/addMember", {
                idUser: idUser,
                idTeam: team.id,
              })
              .then((response) => {
                infoUpdate.setter((prevFlag) => !prevFlag);
                setUpdateFlag((prevFlag) => !prevFlag);
              })
              .catch((err) => {
                console.log(err);
              });
          }
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <article className="team max-size">
      <div className="info">
        <input
          type="text"
          className="nameNote"
          value={nameTeam}
          onChange={handleTeamName}
          maxLength="32"
        />
        <p className="date">
          Дата {new Date(team.date_create).toLocaleString().slice(0, 10)}
        </p>
      </div>

      <section className="search-member">
        <img className="icon" src="icon/Icon Search.svg" alt="search" />
        <input
          className="search-input"
          type="text"
          placeholder="Поиск или добавление участников по email"
          value={searchMember}
          onChange={(event) => setSearchMember(event.target.value)}
        />
        <p
          className={
            team.user_create === UserStore.id ? "add-member" : "display-none"
          }
          onClick={(e) => addMember(searchMember)}
        >
          +
        </p>
      </section>

      <section className="team-members">
        {filterMembers().map((member) => (
          <div className="members" key={member.id}>
            <div className="info-member">
              {member.id === team.user_create ? (
                <p className="admin">Администратор</p>
              ) : (
                <span></span>
              )}
              <p className="member-name">
                {member.name + " " + member.surname}
              </p>
              <p className="email">{member.email}</p>
            </div>
            <img
              className={
                team.user_create === UserStore.id ? "icon" : "display-none"
              }
              onClick={(e) => deleteMember(member.id)}
              src="icon/krest.png"
              alt="krest"
            />
          </div>
        ))}
      </section>
    </article>
  );
}

export default Team;
