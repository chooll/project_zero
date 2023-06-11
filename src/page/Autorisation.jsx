import React, { useState, useEffect } from "react";
import "../style/autorisation-page.scss";
import UserStore from "../store/UserStore";
import { observer } from "mobx-react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { values } from "mobx";
import { useCookies } from "react-cookie";

function Autorisation() {
  const navigate = useNavigate();
  const [autorisationError, setAutorisationError] = useState(false);
  const [cookies, setCookie] = useCookies(["user"]);

  const saveCookies = cookies.user;

  const validateForm = (values) => {
    const errors = {};
    if (!values.email) {
      errors.email = "Обязательное поле";
    }
    if (!values.password) {
      errors.password = "Обязательное поле";
    }

    return errors;
  };

  const skipAuth = () => {
    if (saveCookies) {
      UserStore.writeUserData(
        saveCookies.id,
        saveCookies.name,
        saveCookies.surname
      );
      navigate("/user");
    }
  };

  useEffect(() => {
    skipAuth();
  }, []);

  const loginUser = async (values) => {
    const promiseResultLogin = await fetch(
      `http://194.67.110.25:5000/loginUser?password=${values.password}&login=${values.email}`
    );
    const resultLogin = await promiseResultLogin.json();

    if (resultLogin.length > 0) {
      UserStore.writeUserData(
        resultLogin[0].ID,
        resultLogin[0].name,
        resultLogin[0].surname
      );

      setCookie("user", JSON.stringify(UserStore.toObjectUser()), {
        path: "/",
        maxAge: 7 * 24 * 60 * 60,
        sameSite: "none",
        secure: true,
      });
      navigate("/user");
    } else {
      setAutorisationError(true);
    }
  };

  const initialValues = { email: "", password: "" };

  return (
    <article className="modal-overlay">
      <article className="modal">
        <Formik
          initialValues={initialValues}
          validate={validateForm}
          onSubmit={loginUser}
        >
          <Form>
            <div className="logotype-form-text" onClick={(e) => navigate("/")}>
              <img src="logotype/Logotype.svg" alt="LOGO" />
              <p>Excellent Note Desk</p>
            </div>
            <h2 className="name-form">Авторизация</h2>

            <div className="block-input">
              <p>Почта</p>
              <Field
                type="email"
                id="login"
                name="email"
                className="input-custom"
                placeholder="testemail@yandex.ru"
                maxLength="60"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="error-message"
              />
            </div>

            <div className="block-input">
              <label htmlFor="password">Пароль</label>
              <Field
                type="password"
                id="password"
                name="password"
                className="input-custom"
                maxLength="60"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="error-message"
              />
            </div>

            <section
              className={
                autorisationError
                  ? "error-authorization"
                  : "none-visible error-authorization"
              }
            >
              <img src="icon/Icon Error.svg" alt="ERIcon" />
              <p>Неправильный e-mail или пароль!</p>
            </section>

            <section className="button-panel">
              <button className="button-c red" type="sumbit">
                Войти
              </button>
              <Link className="button-c orange" to="/reg">
                Регистрация
              </Link>
            </section>
          </Form>
        </Formik>
      </article>
    </article>
  );
}
export default observer(Autorisation);
