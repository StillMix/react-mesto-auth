import React from 'react';
import avatarEdit from '../../images/avatar-edit.svg';
import Card from '../Card/Card.js';
import Header from '../header/Header';
import {  useHistory } from 'react-router-dom';
import { UserContext } from '../../contexts/CurrentUserContext.js';



function Main(props) {
  const currentUser = React.useContext(UserContext);
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [avatar, setAvatar] = React.useState('');
  const history = useHistory();

React.useEffect(() => {
  currentUser && setName(currentUser.name)
  currentUser && setDescription(currentUser.about)
  currentUser && setAvatar(currentUser.avatar)
}, [currentUser]);

function signOut(){
  localStorage.removeItem('token');
  history.push('/sign-in');
}

    return (
      <>
        <Header>
        <p className="header__email">{props.email}<span><button onClick={signOut} className="header__link header__button">Выйти</button></span></p>
        </Header>
<main className="content">
            <div className="profile">

                <img className="profile__avatar-edit" alt="Аватарка профиля" src={avatarEdit} onClick={props.onEditAvatar} />
                <img alt="Аватарка профиля" className="profile__avatar"  src={avatar}  />
                <div className="profile__info">
                    <div className="profile__container">
                        <h1 className="profile__name">{name}</h1>
                        <button aria-label="Close" type="button" className="profile__btn-edit" onClick={props.onEditProfile}></button>
                    </div>
                    <p className="profile__status">{description}</p>
                </div>
                <button className="profile__btn-add" onClick={props.onAddPlace}></button>
            </div>
            <div className="cards">
                <ul className="elements">
                {props.cards.map((card) => {
            return(
                <Card key={card._id} card={ {...card} }  onCardClick={props.onCardClick} onCardDelete={props.onCardDelete} onCardLike={props.onCardLike} />
            )
        })}
                </ul>
            </div>
        </main>
        </>
    );
}

export default Main;