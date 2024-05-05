// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы
const mainContent = document.querySelector(".content");
const cardList = mainContent.querySelector(".places__list");

// @todo: Функция создания карточки
function addCard(name, link, deleteCard) {
  const copyTemplate = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = copyTemplate.querySelector('.card__image');
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

// @todo: Вывести карточки на страницу
initialCards.forEach(function (element) {
  cardList.append(addCard(element.name, element.link, deleteCard));
});
