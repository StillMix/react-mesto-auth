import React,{useState} from 'react';
import { Link, withRouter } from 'react-router-dom';
import {mestoAuth} from '../Auth/Auth';
import headerLogo from '../../images/header-logo.svg';

function SignIn(props) {
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');

    function inpurEmail(e) {
      const {name, value} = e.target;
      setEmail({
        [name]: value
      });
    }

    function inpurPassword(e) {
      const {name, value} = e.target;
      setPassword({
        [name]: value
      });
    }

    function handleSubmit(event) {
      event.preventDefault();
      if (!Email || !Password){
        return;
      }
      mestoAuth.authorize(Password.PasswordInput, Email.EmailInput).then((data) => {
        if (data.token){
          setEmail('');
          setPassword('');
              props.handleLogin(Email.EmailInput);
              props.history.push('/main');
        }
      })
      .catch(err => console.log(err));
  }

    return (
      <>
    <header className="header">
    <img src={headerLogo} alt="Логотип сайта" className="header__logo" />
    <Link to="/sign-up" className="signup__link">Регистрация</Link>
    </header>

      <div className="login">
        <p className="login__welcome">
             Вход
        </p>
        <form onSubmit={handleSubmit} name="sign-in" className="login__form">
        <label>
      <input id="profile-email-input" type="Email" placeholder="Email" onChange={inpurEmail} className="input input_type_email" name="EmailInput" required minLength="2" maxLength="40" />
      <span className="popup__error profile-email-input-error"></span>
  </label>
  <label>
      <input id="profile-password-input" type="password" placeholder="Пароль" onChange={inpurPassword} className="input input_type_password" name="PasswordInput" required minLength="2" maxLength="40" />
      <span className="popup__error profile-password-input-error"></span>
  </label>
            <button type="submit" className="login__btn">Войти</button>
        </form>
      </div>
      </>
    );
}

export default withRouter(SignIn);