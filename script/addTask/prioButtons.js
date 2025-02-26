let selectedPriority = null;

/**
 * Sets the priority by updating button styles and images.
 *
 * @param {string} priority - The priority level ("urgent", "medium", "low").
 */
function setPriority(priority) {
  resetButtons();
  resetButtonsOverlay();

  const activeButton = document.getElementById(`${priority}Button`);
  const activeImg = activeButton.querySelector(`img`);

  activeButton.classList.add(priority);
  activeImg.src = `/assets/icon/addTask/${priority}_white.png`;
  selectedPriority = priority;
}

/**
 * Resets the styles and images of all priority buttons.
 *
 */
function resetButtons() {
  const buttons = document.querySelectorAll(".priorityButton button");
  buttons.forEach((button) => {
    button.classList.remove("urgent", "medium", "low");
    const img = button.querySelector("img");

    if (button.id === "urgentButton") {
      img.src = "/assets/img/prioHigh.png";
    } else if (button.id === "mediumButton") {
      img.src = "/assets/img/prioMedium.png";
    } else if (button.id === "lowButton") {
      img.src = "/assets/img/prioLow.png";
    }
  });
}

/**
 * Resets the styles and images of all priority buttons in the overlay.
 *
 */
function resetButtonsOverlay() {
  const buttons = document.querySelectorAll(".priorityButtonOverlay button, .editPriorityButtonOverlay button");
  buttons.forEach((button) => {
    button.classList.remove("urgent", "medium", "low");
    const img = button.querySelector("img");

    if (button.id === "urgentButton") {
      img.src = "/assets/img/prioHigh.png";
    } else if (button.id === "mediumButton") {
      img.src = "/assets/img/prioMedium.png";
    } else if (button.id === "lowButton") {
      img.src = "/assets/img/prioLow.png";
    }
  });
}
