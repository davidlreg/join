let selectedBoardSection = null;

function addTaskOverlay(boardSection) {
    let overlay = document.getElementById('addTaskOverlay');
    let dynamicContent = document.getElementById('overlayDynamicContent');

    let addTaskHtml = addTaskHtmlTemplate();

    dynamicContent.innerHTML = addTaskHtml;

    overlay.classList.remove('hidden');

    selectedBoardSection = boardSection;
}

function closeTaskOverlay() {
    const overlay = document.getElementById('addTaskOverlay');

    if (overlay) {
        if (!overlay.classList.contains('hidden')) {
            overlay.classList.add('hidden');
        }
    } else {
        window.location.href = "/html/board.html";
    }
}


