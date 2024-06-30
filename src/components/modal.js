import {
  popupTypeEdit,
  popupTypeNewCard,
  popupTypeImage,
  nameInput,
  jobInput,
  cardList,
  titleInput,
  linkInput,
  profileTitle,
  profileDescription
} from "../index.js";

import {addCard, deleteCard} from "./card.js"

// @todo: Функция открытия popup
function openModal(popup) {
  popup.classList.add("popup_is-opened");
  document.body.style.overflow = "hidden";
  document.addEventListener("keydown", closeModalEsc);
  popup.addEventListener("click", closeModalOverlay);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
}

// @todo: Функция открытия popup с картинкой
function openModalImg(event) {
  const popupImage = document.querySelector(".popup__image");
  const popupCaption = document.querySelector(".popup__caption");
  if (event.target.classList.contains("card__image")) {
    openModal(popupTypeImage);
    popupImage.src = event.target.src;
    popupCaption.textContent = event.target.alt;
    document.addEventListener("keydown", closeModalEsc);
    popupTypeImage.addEventListener("click", closeModalOverlay);
  }
}

// @todo: Функция закрытия popup
function closeModal(popup) {
  popup.classList.remove("popup_is-opened");
  document.body.style.overflow = "";
  document.removeEventListener("keydown", closeModalEsc);
  popup.removeEventListener("click", closeModalOverlay);
}

// @todo: Функция закрытия popup кликом на esc
function closeModalEsc(event) {
  const key = event.keyCode;
  if (key == 27) {
    closeModal(popupTypeEdit);
    closeModal(popupTypeNewCard);
    closeModal(popupTypeImage);
  }
}

// @todo: Функция закрытия popup кликом на оверлей
function closeModalOverlay(event) {
  if (event.currentTarget === event.target) {
    closeModal(popupTypeEdit);
    closeModal(popupTypeNewCard);
    closeModal(popupTypeImage);
  }
}

// @todo: Форма добавления карточек
function addNewCard(event) {
    event.preventDefault();
    cardList.prepend(addCard(titleInput.value, linkInput.value, deleteCard));
    closeModal(popupTypeNewCard);
  }
  
  // @todo: Редактирование имени и информации о себе
  function handleFormSubmit(event) {
    event.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    closeModal(popupTypeEdit);
  }

export { openModal, openModalImg, closeModal,addNewCard, handleFormSubmit };