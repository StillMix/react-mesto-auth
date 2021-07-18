
import React,{useState} from 'react';
import {mestoAuth} from '../Auth/Auth';
import { Link, withRouter } from 'react-router-dom';
import headerLogo from '../../images/header-logo.svg';


function SignUp(props) {
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
      mestoAuth.register(Password.PasswordInput, Email.EmailInput).then((res) => {
        if(res){
            props.history.push('/sign-in');

        } else {
            console.log( 'Что-то пошло не так!')

        }
    })
  }

    return (
      <>
    <header className="header">
    <img src={headerLogo} alt="Логотип сайта" className="header__logo" />
    <Link to="/sign-in" className="signin__link">Войти</Link>
    </header>
      <div className="register">
        <p className="register__welcome">
             Регистрация
        </p>
        <form onSubmit={handleSubmit} name="sign-up" className="register__form">
        <label>
      <input id="profile-email-input" type="Email" placeholder="Email"  className="input input_type_email" onChange={inpurEmail} name="EmailInput" required minLength="2" maxLength="40" />
      <span className="popup__error profile-email-input-error"></span>
  </label>
  <label>
      <input id="profile-password-input" type="password" placeholder="Пароль" onChange={inpurPassword} className="input input_type_password" name="PasswordInput" required minLength="2" maxLength="40" />
      <span className="popup__error profile-password-input-error"></span>
  </label>
            <button type="submit" className="register__btn">Зарегистрироваться</button>
        </form>
        <div className="register__signin">
          <p className="register__text">Уже зарегистрированы?<span><Link to="/sign-in" className="register__login-link">Войти</Link></span></p>
        </div>
      </div>
      </>
    );
}

export default withRouter(SignUp);