// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: Функция создания карточки
function addCard(
  cardData,
  openPopupData,
  deleteCard,
  addLikeCard,
  userId,
  deletingCardServer,
  likeRequest,
  deleteLikeRequest
) {
  const copyTemplate = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = copyTemplate.querySelector(".card__image");
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  copyTemplate.querySelector(".card__title").textContent = cardData.name;
  const cardLike = copyTemplate.querySelector(".card__like-button");
  const likeCounter = copyTemplate.querySelector(".like-counter");

  const deleteButton = copyTemplate.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", function (event) {
    deletingCardServer(cardData._id).then(() => {
      deleteCard(event);
    })
    .catch((error) => console.log(error));
  });

  likeCounter.textContent = cardData.likes.length;
  if (userId !== cardData.owner._id) {
    deleteButton.style.display = "none";
  }

  cardLike.addEventListener("click", function () {
    addLikeCard(
      cardData,
      cardLike,
      likeCounter,
      userId,
      likeRequest,
      deleteLikeRequest
    );
  });

  if (checkLike(cardData, userId)) {
    cardLike.classList.add("card__like-button_is-active");
  }

  cardImage.addEventListener("click", function () {
    openPopupData(cardData.link, cardData.name);
  });

  return copyTemplate;
}

// @todo: Функция удаления карточки
function deleteCard(event) {
  const listItem = event.target.closest(".card");
  listItem.remove();
}

// Функция лайка карточки
function addLikeCard(
  cardData,
  cardLike,
  likeCounter,
  userId,
  likeRequest,
  deleteLikeRequest
) {
  if (!checkLike(cardData, userId)) {
    likeRequest(cardData._id)
      .then((data) => {
        cardLike.classList.add("card__like-button_is-active");
        likeCounter.textContent = data.likes.length;
        cardData.likes = data.likes;
      })
      .catch((error) => console.log(error));
  } else {
    deleteLikeRequest(cardData._id)
      .then((data) => {
        cardLike.classList.remove("card__like-button_is-active");
        likeCounter.textContent = data.likes.length;
        cardData.likes = data.likes;
      })
      .catch((error) => console.log(error));
  }
}

// Функция проверки лайка на карточке
function checkLike(cardData, userId) {
  return cardData.likes.some((like) => like._id === userId);
}

export { addCard, deleteCard, addLikeCard };