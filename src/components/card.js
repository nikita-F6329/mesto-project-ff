import { cardTemplate } from "../index.js";

// @todo: Функция создания карточки
function addCard(name, link, deleteCard, likeButton) {
  const copyTemplate = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = copyTemplate.querySelector(".card__image");
  cardImage.src = link;
  cardImage.alt = name;
  copyTemplate.querySelector(".card__title").textContent = name;
  copyTemplate
    .querySelector(".card__delete-button")
    .addEventListener("click", deleteCard);

  return copyTemplate;
}

// @todo: Функция удаления карточки
function deleteCard(event) {
  const listItem = event.target.closest(".card");
  listItem.remove();
}

// @todo: Лайк карточки
function likeButton(event) {
  const cardLikeButton = document.querySelectorAll(".card__like-button");
  if (event.target.classList.contains("card__like-button")) {
    event.target.classList.toggle("card__like-button_is-active");
  }
}

export { addCard, deleteCard, likeButton };