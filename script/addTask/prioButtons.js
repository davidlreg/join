let selectedPriority = null;

function setPriority(priority) {
  resetButtons();
  resetButtonsOverlay();

  const activeButton = document.getElementById(`${priority}Button`);
  const activeImg = activeButton.querySelector(`img`);

  activeButton.classList.add(priority);
  activeImg.src = `/assets/icon/addTask/${priority}_white.png`;
  selectedPriority = priority;
}

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

function resetButtonsOverlay() {
  const buttons = document.querySelectorAll(".priorityButtonOverlay button");
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
