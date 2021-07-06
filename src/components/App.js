import React, { useState,  useCallback} from 'react';
import Header from './header/Header';
import Main from './main/Main';
import Footer from './footer/Footer';
import PopupWithForm from './PopupWithForm/PopupWithForm.js';
import EditProfilePopup from './EditProfilePopup/EditProfilePopup.js';
import ImagePopup from './ImagePopup/ImagePopup.js';
import api from '../utils/Api.js';
import { UserContext} from '../contexts/CurrentUserContext.js';
import EditAvatarPopup from './EditAvatarPopup/EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup/AddPlacePopup.js';

function App() {
    const [currentUser, setCurrentUser] = useState(null);
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setisAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setisEditAvatarPopupOpen] = useState(false);
    const [isImagePopupOpen, setisImagePopupOpen] = useState(false);
    const [selectedCard, setselectedCard] = useState(null);

    const ESCClose = useCallback((evt) => {
      if (evt.key === 'Escape') {
          closeAllPopups()
      };
  }, [])

function closeAllPopups(){
    setIsEditProfilePopupOpen(false);
    setisEditAvatarPopupOpen(false);
    setisAddPlacePopupOpen(false);
    setisImagePopupOpen(false);
    setselectedCard(null);
    document.removeEventListener('keyup', ESCClose);
}
function handleUpdateUser(newUser){
  api.setUserInfo(newUser).then((data) =>{
    setCurrentUser(data)
    closeAllPopups()
  })
  .catch((err) => {
      console.log(err)
  });
}

function handleUpdateAvatar(newAvatar){
  api.setUserAvatar(newAvatar).then((data) =>{
    setCurrentUser(data)
    closeAllPopups()
  })
  .catch((err) => {
      console.log(err)
  });
}

React.useEffect(() => {
  api.getUserInfo().then((user) => {
    setCurrentUser(user)
  })
  .catch((err) => {
      console.log(err)
  });
},[])




function handleEditAvatarClick(){
    setisEditAvatarPopupOpen(true);
    document.addEventListener('keyup', ESCClose);
}
function handleEditProfileClick(){
    setIsEditProfilePopupOpen(true)
    document.addEventListener('keyup', ESCClose);
}

function handleAddPlaceClick(){
    setisAddPlacePopupOpen(true)
    document.addEventListener('keyup', ESCClose);
}

///card
const [cards, setCards] = useState([])


   function getCards(){
    api.getCards().then((data) => {

        setCards(data)
    }).catch((err) => {
        console.log(err)
    })
  }

function handleCardLike(card) {
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  api.changeLikeCardStatus(card._id, !isLiked).then((data) => {
      setCards((state) => state.map((c) => c._id === card._id ? data : c));
  }).catch((err) => {
    console.log(err)
});
}

function handleDeleteCard(card) {
api.deleteCard(card._id).then((data) =>
{
  setCards((state) => state.filter((c) => c._id !== card._id ));

}).catch((err) => {
  console.log(err)
})

}

function addCard(newCard){
  api.addCard(newCard).then((data)=>{
    setCards([data, ...cards]);
    closeAllPopups()
  })
  .catch((err) => {
      console.log(err)
  });

}

React.useEffect(() =>{
  getCards()
},[])

function handleCardClick(name, link){
    setisImagePopupOpen(true)
    setselectedCard({name, link})
}



    return (
       <UserContext.Provider value={currentUser}>
    <div className="body">
    <div className="page">
        <Header />
        <Main   onCardLike={handleCardLike} onCardDelete={handleDeleteCard} onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick} cards={cards}  onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick}/>
        <Footer/>

        <ImagePopup card={selectedCard} isOpen={isImagePopupOpen} onClose={closeAllPopups}/>
        <PopupWithForm name="delete" onClose={closeAllPopups}   namePopup="Вы уверены?" btn="delete-card" nameBtn="Да"  />
        <EditAvatarPopup  onUpdateAvatar={handleUpdateAvatar} isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} />
        <EditProfilePopup onUpdateUser={handleUpdateUser} isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} />
        <AddPlacePopup handleSubmit={addCard} isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} />
    </div>

    </div>
    </UserContext.Provider>
    );
}

export default App;