import React, {useState} from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { Link, useNavigate } from "react-router-dom";

function Registration() {
  const navigate = useNavigate(); 
  const [errorReg, setErrorReg] = useState(0); 
  const errorList = [
    "",
    "Учетная запись с таким E-mail существует!"
  ]
  const validateForm = (values) => {
    const errors = {};
    if (!values.email) {
      errors.email = 'Обязательное поле';
    }
    if (!values.password) {
      errors.password = 'Обязательное поле';
    }
    if (!values.name) {
      errors.name = 'Обязательное поле';
    }
    if (!values.surname) {
      errors.surname = 'Обязательное поле';
    }
    if (values.password !== values.repeat_password) {
      errors.repeat_password = 'Пароли должны совпадать';
    }

    return errors;
  }

  const initialValues = { 
    email: '', 
    name: '', 
    surname: '', 
    password: '', 
    repeat_password: ''
  };

  const regUser = async (values) => {
    if (values.password === values.repeat_password) {
      const userData = {
        name: values.name,
        surname: values.surname,
        password: values.password,
        email: values.email
      };
      fetch('http://localhost:5000/registerUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      })
      .then(response => response.json())
      .then(data => {
        if (data.status === 400) { 
          setErrorReg (1);
          return;
        }
        navigate ('/autorisation');
      })
      .catch(error => {
        console.error('Ошибка при выполнении запроса:', error);
      });
    }
  }

  return (
    <article className='modal-overlay'>
      <section className="modal">
      <Formik
        initialValues={initialValues}
        validate={validateForm}
        onSubmit={regUser}
      >
        <Form>
        <div className="logotype-form-text">
          <img src="logotype/Logotype.svg" alt="LOGO" />
          <p>Excellent Note Desk</p>
        </div>
        <h2 className="name-form">Регистрация</h2>

          <section className="flex-reg">
            <div className="section-reg">
                <div className="block-input">
                <p>E-mail</p>
                <Field type="email" id="login" name="email" className="input-custom" placeholder="testemail@yandex.ru"/>
                <ErrorMessage name="email" component="div" className="error-message"/>
              </div>

              <div className="block-input">
                <label htmlFor="password">Имя</label>
                <Field type="name" id="name" name="name" className="input-custom" placeholder="Иван"/>
                <ErrorMessage name="name" component="div" className="error-message"/>
              </div>

              <div className="block-input">
                <label htmlFor="surname">Фамилия</label>
                <Field type="surname" id="surname" name="surname" className="input-custom" placeholder="Иванов"/>
                <ErrorMessage name="surname" component="div" className="error-message"/>
              </div>
            </div>

            <div className="section-reg">
              <div className="block-input">
                <label htmlFor="password">Пароль</label>
                <Field type="password" id="password" name="password" className="input-custom"/>
                <ErrorMessage name="password" component="div" className="error-message"/>
              </div>

              <div className="block-input">
                <label htmlFor="repeat_password">Повторите пароль</label>
                <Field type="password" id="repeat_password" name="repeat_password" className="input-custom"/>
                <ErrorMessage name="repeat_password" component="div" className="error-message"/>
              </div>

              
            <div className="block-input">
              <p className="error-message">{errorList[errorReg]}</p>
            </div>
            </div>

  
          </section>


        <section className="button-panel">
          <button className="button-c red" type="sumbit">Регистрация</button>
          <Link className="button-c orange" to="/autorisation">Назад</Link>
        </section>


        </Form>
      </Formik>
      </section>
    </article>
  )
}

export default Registration
