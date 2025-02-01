function init() {
  setActiveLinkFromURL();
  headerUserName();
}

function getBoardElements() {
  return {
    boardOverlay: document.getElementById('addBoardOverlay'),
    overlayBoardContent: document.getElementById('overlayBoardContent'),
  };
}

function addBoardOverlay() {
  const { boardOverlay, overlayBoardContent } = getBoardElements();
  let addBoardHtml = templateBoardOverlay();
  overlayBoardContent.innerHTML = addBoardHtml;
  boardOverlay.classList.remove('hideOverlay');
}

function closeBoardOverlay(){
  let boardOverlay = document.getElementById('addBoardOverlay');
  boardOverlay.classList.add('hideOverlay');
}

function updateSubtaskProgress(completed, total) {
  const progressBar = document.querySelector('.subtask-progress-bar');
  const percentage = (completed / total) * 100;
  progressBar.style.width = percentage + '%';
}