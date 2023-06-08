import { observable } from "mobx";

const UserStore = observable({
  name: null,
  id: null,
  surname: null,

  toObjectUser() {
    return {
      id: this.id,
      name: this.name,
      surname: this.surname,
    };
  },

  writeUserData(id, name, surname) {
    this.id = id;
    this.name = name;
    this.surname = surname;
  },
});

export default UserStore;
