let selectedBoardSection = null;

function addTaskOverlay(boardSection) {
    let overlay = document.getElementById('addTaskOverlay');
    let dynamicContent = document.getElementById('overlayDynamicContent');

    let addTaskHtml = addTaskHtmlTemplate();
    dynamicContent.innerHTML = addTaskHtml;

   
    selectedBoardSection = boardSection;

    overlay.classList.remove('hidden');

      setTimeout(() => {
        document.querySelector('.overlayTaskContent').classList.add('animate');
    }, 50);
}

function closeTaskOverlay() {
    const overlay = document.getElementById('addTaskOverlay');
    const content = document.querySelector('.overlayTaskContent');

    if (overlay && content) {
        content.classList.remove('animate'); 
        content.style.animation = "slideOut 0.3s ease-in forwards"; 

        setTimeout(() => {
            overlay.classList.add('hidden');
            content.style.animation = ""; 
        }, 300); 
    } else {
        window.location.href = "/html/board.html";
    }
}


