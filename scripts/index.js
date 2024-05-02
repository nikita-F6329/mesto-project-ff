// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const mainContent = document.querySelector('.content');
const cardList = mainContent.querySelector('.places__list');
const deleteButton = cardTemplate.querySelector('.card__delete-button');

// @todo: Функция создания карточки
function cardItem(name, link, delBtn) {
  const copyTemplate = cardTemplate.querySelector('.card').cloneNode(true);
  copyTemplate.querySelector('.card__image').src = link;
  copyTemplate.querySelector('.card__title').textContent = name;
  copyTemplate.querySelector('.card__image').alt = name;
  copyTemplate.querySelector('.card__delete-button').addEventListener('click', delBtn);

  return copyTemplate;
}

// @todo: Функция удаления карточки
function delBtn(event) {
    const listItem = event.target.closest('.card');
    listItem.remove();
};

// @todo: Вывести карточки на страницу
initialCards.forEach(function(element){
cardList.append(cardItem(element.name, element.link, delBtn));
})