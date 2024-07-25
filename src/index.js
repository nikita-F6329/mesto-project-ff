import "./pages/index.css";

import { addCard, deleteCard, addLikeCard } from "./components/card.js";
import { openModal, closeModal } from "./components/modal.js";
import { enableValidation, clearValidation } from "./components/validation.js";
import {
  requestServer,
  uploadingCards,
  editingProfile,
  addingNewCard,
  deletingCardServer,
  likeRequest,
  deleteLikeRequest,
  editingAvatar,
} from "./components/api.js";

// @todo: Мой ID
let userId = null;

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
const popupAvatar = document.querySelector(".popup_type_avatar");

// @todo: DOM узлы форм
const editProfileForm = document.forms.editProfile;
const nameInput = editProfileForm.elements.name;
const jobInput = editProfileForm.elements.description;
const submitButtonProfile = editProfileForm.querySelector(".popup__button");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileImage = document.querySelector(".profile__image");

const newPlaceForm = document.forms.newPlace;
const titleInput = newPlaceForm.placeName;
const linkInput = newPlaceForm.link;
const submitButtonPlaceForm = newPlaceForm.querySelector(".popup__button");

const avatarForm = document.forms.updateAvatar;
const avatarInput = avatarForm.inputAvatar;
const submitButtonAvatar = avatarForm.querySelector(".popup__button");

// @todo: Объект настроек валидации
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "button_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "form__input-error_active",
};

// @todo: Открытие popup
profileEditButton.addEventListener("click", function (event) {
  clearValidation(editProfileForm, validationConfig);
  openModal(popupTypeEdit);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
});

profileAddButton.addEventListener("click", function (event) {
  clearValidation(newPlaceForm, validationConfig);
  openModal(popupTypeNewCard);
});

profileImage.addEventListener("click", function () {
  clearValidation(avatarForm, validationConfig);
  openModal(popupAvatar);
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

function renderLoading(isLoading, button) {
  if (isLoading) {
    button.textContent = "Сохранение...";
  } else {
    button.textContent = "Сохранение";
  }
}

// @todo: Обработка форм
editProfileForm.addEventListener("submit", function (event) {
  event.preventDefault();
  renderLoading(true, submitButtonProfile);
  editingProfile(nameInput, jobInput)
    .then((data) => {
      profileTitle.textContent = data.name;
      profileDescription.textContent = data.about;
      closeModal(popupTypeEdit);
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      renderLoading(false, submitButtonProfile);
    });
});

avatarForm.addEventListener("submit", function (event) {
  event.preventDefault();
  renderLoading(true, submitButtonAvatar);
  editingAvatar(avatarInput.value)
    .then((data) => {
      profileImage.style.backgroundImage = `url(${data.avatar})`;
      closeModal(popupAvatar)
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      renderLoading(false, submitButtonAvatar);                                111111111111111111111
    });
});

function addNewCardFormSubmit(event) {
  event.preventDefault();
  renderLoading(true, submitButtonPlaceForm);
  addingNewCard(titleInput.value, linkInput.value)
    .then((cardData) => {
      cardList.prepend(
        addCard(
          cardData,
          openPopupData,
          deleteCard,
          addLikeCard,
          userId,
          deletingCardServer,
          likeRequest,
          deleteLikeRequest
        )
      );
      closeModal(popupTypeNewCard);
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      renderLoading(false, submitButtonPlaceForm);
    });
  titleInput.value = "";
  linkInput.value = "";
}

newPlaceForm.addEventListener("submit", addNewCardFormSubmit);

enableValidation(validationConfig);

// @todo: Вывести карточки на страницу
Promise.all([requestServer(), uploadingCards()])
  .then(([userData, cardsData]) => {
    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileImage.style.backgroundImage = `url(${userData.avatar})`;
    userId = userData._id;
    cardsData.forEach(function (elementData) {
      cardList.append(
        addCard(
          elementData,
          openPopupData,
          deleteCard,
          addLikeCard,
          userId,
          deletingCardServer,
          likeRequest,
          deleteLikeRequest
        )
      );
    });
  })
  .catch((error) => {
    console.log(error);
  });