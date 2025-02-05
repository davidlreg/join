let selectedPriority = null

function setPriority(priority) {
    resetButtons();
    resetButtonsOverlay();

    const activeButton = document.getElementById(`${priority}Button`);
    const activeImg = activeButton.querySelector(`img`);

    activeButton.classList.add(priority);
    activeImg.src = `/assets/icon/add task/${priority}_white.png`;
    selectedPriority = priority
}

function resetButtons() {
    const buttons = document.querySelectorAll('.priorityButton button');
    buttons.forEach(button => {
        button.classList.remove('urgent', 'medium', 'low');
        const img = button.querySelector('img');

        if (button.id === 'urgentButton') {
            img.src = '/assets/img/Prio alta.png';
        } else if (button.id === 'mediumButton') {
            img.src = '/assets/img/Prio medium.png'
        } else if (button.id === 'lowButton') {
            img.src = '/assets/img/Prio baja.png'
        }
    });

}

function resetButtonsOverlay() {
    const buttons = document.querySelectorAll('.priorityButtonOverlay button');
    buttons.forEach(button => {
        button.classList.remove('urgent', 'medium', 'low');
        const img = button.querySelector('img');

        if (button.id === 'urgentButton') {
            img.src = '/assets/img/Prio alta.png';
        } else if (button.id === 'mediumButton') {
            img.src = '/assets/img/Prio medium.png'
        } else if (button.id === 'lowButton') {
            img.src = '/assets/img/Prio baja.png'
        }
    });

}