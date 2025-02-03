let selectedBoardSection = null;

function addTaskOverlay(boardSection) {
    let overlay = document.getElementById('addTaskOverlay');
    let dynamicContent = document.getElementById('overlayDynamicContent');

    let addTaskHtml = addTaskHtmlTemplate();

    dynamicContent.innerHTML = addTaskHtml;

    overlay.classList.remove('hidden');

    selectedBoardSection = boardSection;
}

function closeTaskOverlay(){
    let overlay = document.getElementById('addTaskOverlay');
    overlay.classList.add('hidden');
}