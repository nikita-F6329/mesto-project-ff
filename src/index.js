import "./pages/index.css";

import { initialCards } from "./components/cards.js";
import { addCard, deleteCard, likeButton } from "./components/card.js";
import { openModal, closeModal } from "./components/modal.js";

// @todo: DOM узлы
const mainContent = document.querySelector(".content");
const cardList = mainContent.querySelector(".places__list");

// @todo: DOM узлы открытия и закрытия popup
const popupTypeEdit = document.querySelector(".popup_type_edit");
const popupTypeNewCard = document.querySelector(".popup_type_new-card");
const popupTypeImage = document.querySelector(".popup_type_image");

const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");
const popupCloseAll = document.querySelectorAll(".popup__close");
const popupImage = document.querySelector(".popup__image");
const popupCaption = document.querySelector(".popup__caption");

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
  cardList.append(
    addCard(element.name, element.link, deleteCard, openPopupData, likeButton)
  );
});

// @todo: Открытие popup
profileEditButton.addEventListener("click", function (event) {
  openModal(popupTypeEdit);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
});

profileAddButton.addEventListener("click", function (event) {
  openModal(popupTypeNewCard);
});

function openPopupData(link, name) {
  popupImage.src = link;
  popupImage.alt = name;
  popupCaption.textContent = name;
  openModal(popupTypeImage);
}

// @todo: Закрытие popup
popupCloseAll.forEach(function (element) {
  element.addEventListener("click", function () {
    const popup = element.closest(".popup");
    closeModal(popup);
  });
});

// Обработка форм
editProfileForm.addEventListener("submit", function (event) {
  event.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal(popupTypeEdit);
});

newPlaceForm.addEventListener("submit", function (event) {
  event.preventDefault();
  cardList.prepend(
    addCard(
      titleInput.value,
      linkInput.value,
      deleteCard,
      openPopupData,
      likeButton
    )
  );
  titleInput.value = "";
  linkInput.value = "";
  closeModal(popupTypeNewCard);
});