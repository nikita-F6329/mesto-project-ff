const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-18",
  headers: {
    authorization: "9558371d-0d46-403c-907b-cdda7f07198a",
    "Content-Type": "application/json",
  },
};

function handleResponse(response) {
  if (response.ok) {
    return response.json();
  }
  return Promise.reject(`Ошибка: ${response.status}`);
}

// @todo: Загрузка информации о пользователе с сервера
export function requestServer() {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "GET",
    headers: {
      authorization: config.headers.authorization,
    },
  }).then(handleResponse);
}

// @todo: Вывести карточки на страницу
export function uploadingCards() {
  return fetch(`${config.baseUrl}/cards`, {
    method: "GET",
    headers: {
      authorization: config.headers.authorization,
    },
  }).then(handleResponse);
}

// @todo: Редактирование профиля
export function editingProfile(nameInput, jobInput) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: nameInput.value,
      about: jobInput.value,
    }),
  }).then(handleResponse);
}

// @todo: Добавление новой карточки
export function addingNewCard(title, link) {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: title,
      link: link,
    }),
  }).then(handleResponse);
}

// @todo: Удаление карточки
export function deletingCardServer(idCard) {
  return fetch(`${config.baseUrl}/cards/${idCard}`, {
    method: "DELETE",
    headers: {
      authorization: config.headers.authorization,
    },
  }).then(handleResponse);
}

// @todo: Лайк карточки
export function likeRequest(idCard) {
  return fetch(`${config.baseUrl}/cards/likes/${idCard}`, {
    method: "PUT",
    headers: {
      authorization: config.headers.authorization,
    },
  }).then(handleResponse);
}

// @todo: Снятие лайка карточки
export function deleteLikeRequest(idCard) {
  return fetch(`${config.baseUrl}/cards/likes/${idCard}`, {
    method: "DELETE",
    headers: {
      authorization: config.headers.authorization,
    },
  }).then(handleResponse);
}

// @todo: Обновить аватар
export function editingAvatar(avatarInput) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarInput,
    }),
  }).then(handleResponse);
}