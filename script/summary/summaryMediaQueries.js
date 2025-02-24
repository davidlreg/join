/**
 * Starts the summary page animation. If the animation has already been played,
 * skips to the post-animation state.
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
   */
  function setupRightContainerAnimation() {
    const { rightContainer, leftContainer, mainContent, headline } = getSummaryElements();
  
    if (window.innerWidth <= 1000) {
      showRightContainer(rightContainer, mainContent);
      hideHeadlineAndLeftContainer(leftContainer, headline);
      setTimeForRightContent(leftContainer, headline);
    }
  }
  
  function disableRightContainer() {
    const { rightContainer, leftContainer, headline } = getSummaryElements();
  
    if (window.innerWidth <= 1000) {
      hideRightContainer(rightContainer);
      showLeftContainer(leftContainer, headline);
    } else {
      setContentToNormal(rightContainer, leftContainer);
    }
  }
  
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
  function hideRightContainer(rightContainer = document.querySelector(".summaryRightContainer")) {
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
   * Disables the full height of the main content container.
   *
   * @param {HTMLElement} mainContent - The main content container element.
   */
  
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
   * If the user clicks on the areas, he will be linked to the board page
   */
  function fromSummaryToBoard() {
    window.location.href = "/html/board.html?active=board";
  }
  
  /**
   * Adds an event listener to initialize the animation and handle window resizing dynamically.
   */
  document.addEventListener("DOMContentLoaded", () => {
  
    // Add a resize event listener to dynamically handle layout changes
    window.addEventListener("resize", () => {
      disableRightContainer();
    });
  });