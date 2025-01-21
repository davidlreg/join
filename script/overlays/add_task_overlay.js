function addTaskOverlay() {
    let overlay = document.getElementById('addTaskOverlay');
    let overlayContent = overlay.querySelector('.overlayTaskContent');

    let addTaskHtml = addTaskHtmlTemplate();

    overlayContent.innerHTML = addTaskHtml;

    overlay.classList.remove('hidden');
}

function closeTaskOverlay(){
    let overlay = document.getElementById('addTaskOverlay');
    overlay.classList.add('hidden');
}