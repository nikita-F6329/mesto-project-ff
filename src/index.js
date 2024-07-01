import "./pages/index.css";

import { initialCards } from "./components/cards.js";
import { addCard, deleteCard, likeButton } from "./components/card.js";
import {
  openModal,
  openModalImg,
  closeModal,
  addNewCard,
  handleFormSubmit,
} from "./components/modal.js";

export {
  cardTemplate,
  cardList,
  popupTypeEdit,
  popupTypeNewCard,
  popupTypeImage,
  nameInput,
  jobInput,
  profileTitle,
  profileDescription,
  titleInput,
  linkInput,
};

// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы
const mainContent = document.querySelector(".content");
const cardList = mainContent.querySelector(".places__list");

// @todo: DOM узлы открытия и закрытия popup
const popupTypeEdit = document.querySelector(".popup_type_edit");
const popupTypeNewCard = document.querySelector(".popup_type_new-card");
const popupTypeImage = document.querySelector(".popup_type_image");

const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");
const popupClose = document.querySelectorAll(".popup__close");
const cardImage = document.querySelector(".card__image");

// @todo: DOM узлы форм
const editProfileForm = document.forms.editProfile;
const nameInput = editProfileForm.elements.name;
const jobInput = editProfileForm.elements.description;
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const newPlaceForm = document.forms.newPlace;
const titleInput = newPlaceForm.placeName;
const linkInput = newPlaceForm.link;

// @todo: Вывести карточки на страницу
initialCards.forEach(function (element) {
  cardList.append(addCard(element.name, element.link, deleteCard));
});

// @todo: События
profileEditButton.addEventListener("click", function (event) {
  openModal(popupTypeEdit);
});

profileAddButton.addEventListener("click", function (event) {
  openModal(popupTypeNewCard);
});

cardList.addEventListener("click", openModalImg);

popupClose[0].addEventListener("click", function (event) {
  closeModal(popupTypeEdit);
});

popupClose[1].addEventListener("click", function (event) {
  closeModal(popupTypeNewCard);
});

popupClose[2].addEventListener("click", function (event) {
  closeModal(popupTypeImage);
});

editProfileForm.addEventListener("submit", handleFormSubmit);

newPlaceForm.addEventListener("submit", addNewCard);

cardList.addEventListener("click", likeButton);
