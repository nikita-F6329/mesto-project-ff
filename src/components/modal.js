// @todo: Функция открытия popup
function openModal(popup) {
  popup.classList.add("popup_is-opened");
  document.body.style.overflow = "hidden";
  document.addEventListener("keydown", closeModalEsc);
  popup.addEventListener("mousedown", closeModalOverlay);
}

function closeModal(popup) {
  popup.classList.remove("popup_is-opened");
  document.body.style.overflow = "";
  document.removeEventListener("keydown", closeModalEsc);
  popup.removeEventListener("mousedown", closeModalOverlay);
}

// @todo: Функция закрытия popup кликом на esc
function closeModalEsc(event) {
  if (event.key === "Escape") {
    const openPopup = document.querySelector(".popup_is-opened");
    closeModal(openPopup);
  }
}

// @todo: Функция закрытия popup кликом на оверлей
function closeModalOverlay(event) {
  if (event.currentTarget === event.target) {
    closeModal(event.target);
  }
}

export { openModal, closeModal };