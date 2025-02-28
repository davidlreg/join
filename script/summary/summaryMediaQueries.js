/**
 * Initializes the summary functionality.
 * Listens for DOMContentLoaded and window resize events.
 */
function initSummary() {
  document.addEventListener("DOMContentLoaded", handleDOMContentLoaded);
}

/**
 * Handles the DOMContentLoaded event by adding a resize listener.
 */
function handleDOMContentLoaded() {
  window.addEventListener("resize", disableRightContainer);
}

/**
 * Starts the summary page animation. If the animation has already been played,
 * skips to the post-animation state.
 *
 */
function showSummaryStartAnimation() {
  if (sessionStorage.getItem("animationPlayed")) {
    return disableRightContainer();
  }
  setupRightContainerAnimation();
}

/**
 * Sets up and plays the right container animation for the summary page.
 * This animation is displayed only on smaller screens (≤ 1350px).
 *
 */
function setupRightContainerAnimation() {
  const { rightContainer, leftContainer, mainContent, headline } =
    getSummaryElements();

  if (window.innerWidth <= 1000) {
    showRightContainer(rightContainer, mainContent);
    hideHeadlineAndLeftContainer(leftContainer, headline);
    setTimeForRightContent(leftContainer, headline);
  }
}

/**
 * Disables the right container based on the window width.
 * If the window width is 1000 pixels or less, the right container is hidden
 * and the left container is shown. Otherwise, content is set to normal.
 *
 */
function disableRightContainer() {
  const { rightContainer, leftContainer, headline } = getSummaryElements();

  if (window.innerWidth <= 1000) {
    hideRightContainer(rightContainer);
    showLeftContainer(leftContainer, headline);
  } else {
    setContentToNormal(rightContainer, leftContainer);
  }
}

/**
 * Resets the layout of the right and left containers to normal.
 *
 */
function setContentToNormal() {
  const { rightContainer, leftContainer } = getSummaryElements();
  rightContainer.style.width = "40%";
  rightContainer.style.display = "flex";
  leftContainer.style.width = "60%";
}

/**
 * Schedules the right container to be hidden after a delay, then shows the left container.
 * Also marks the animation as played in sessionStorage.
 *
 * @param {HTMLElement} leftContainer - The left container element from the mainContent.
 * @param {HTMLElement} headline - The headline element above the mainContent.
 */
function setTimeForRightContent(leftContainer, headline) {
  setTimeout(() => {
    hideRightContainer();
    showLeftContainer(leftContainer, headline);
    sessionStorage.setItem("animationPlayed", "true");
  }, 3000);
}

/**
 * Hides the right container.
 *
 * @param {HTMLElement} [rightContainer=document.querySelector('.summaryRightContainer')] - The right container element to hide.
 */
function hideRightContainer(
  rightContainer = document.querySelector(".summaryRightContainer")
) {
  if (rightContainer) {
    rightContainer.style.display = "none";
  }
}

/**
 * Shows the right container and sets its size to occupy the full width.
 *
 * @param {HTMLElement} rightContainer - The right container element from the mainContent.
 */
function showRightContainer(rightContainer) {
  rightContainer.style.display = "flex";
  rightContainer.style.width = "100%";
}

/**
 * Hides the left container and the headline.
 *
 * @param {HTMLElement} leftContainer - The left container element to hide.
 * @param {HTMLElement} headline - The headline element to hide.
 */
function hideHeadlineAndLeftContainer(leftContainer, headline) {
  leftContainer.style.display = "none";
  headline.style.display = "none";
}

/**
 * Shows the left container and the headline.
 *
 * @param {HTMLElement} leftContainer - The left container element from the mainContent.
 * @param {HTMLElement} headline - The headline element above the mainContent.
 */
function showLeftContainer(leftContainer, headline) {
  leftContainer.style.display = "flex";
  leftContainer.style.width = "100%";
  headline.style.display = "flex";
}

/**
 * Retrieves and returns all the required DOM elements for the summary animation.
 *
 * @returns {Object} An object containing the rightContainer, leftContainer, mainContent, and headline elements.
 */
function getSummaryElements() {
  return {
    rightContainer: document.querySelector(".summaryRightContainer"),
    leftContainer: document.querySelector(".summaryLeftContainer"),
    mainContent: document.querySelector(".summaryMainContent"),
    headline: document.querySelector(".summaryHeadline"),
  };
}

/**
 * Navigates to the board page when called.
 *
 */
function fromSummaryToBoard() {
  window.location.href = "/html/board.html?active=board";
}
