/**
 * Initializes the search functionality.
 * This function calls the initializeSearch() function to set up the search system.
 *
 */
function searchInit() {
  initializeSearch();
}

/**
 * Filters tasks based on the search input.
 * Displays matching tasks and hides non-matching ones.
 * Shows a "No results" message if no tasks match.
 */
function filterTasks() {
  const searchTerm = getSearchTerm();
  const tasks = document.querySelectorAll(".boardTasks");
  let found = filterAndDisplayTasks(tasks, searchTerm);
  showNoResultsMessage(!found);
}

/**
 * Retrieves the search term from the input field.
 * @returns {string} Lowercased search term.
 */
function getSearchTerm() {
  return document.getElementById("findTask").value.toLowerCase();
}

/**
 * Filters tasks based on the search term and updates their visibility.
 * @param {NodeList} tasks - List of task elements.
 * @param {string} searchTerm - The search term to filter tasks.
 * @returns {boolean} True if any task matches, otherwise false.
 */
function filterAndDisplayTasks(tasks, searchTerm) {
  let found = false;
  tasks.forEach((task) => {
    if (taskMatchesSearch(task, searchTerm)) {
      task.style.display = "";
      found = true;
    } else {
      task.style.display = "none";
    }
  });
  return found;
}

/**
 * Checks if a task matches the search term.
 * @param {Element} task - The task element.
 * @param {string} searchTerm - The search term to match.
 * @returns {boolean} True if the task matches, otherwise false.
 */
function taskMatchesSearch(task, searchTerm) {
  const title = task.querySelector(".boardTaskTitle").textContent.toLowerCase();
  const description = task
    .querySelector(".boardTaskDescription")
    .textContent.toLowerCase();
  return title.includes(searchTerm) || description.includes(searchTerm);
}

/**
 * Toggles the "No results found" message.
 *
 * @param {boolean} show - Whether to display the message.
 */
function showNoResultsMessage(show) {
  const message = document.getElementById("noResultsMessage");
  if (show) {
    message.style.display = "block";
  } else {
    message.style.display = "none";
  }
}

/**
 * Initializes the search functionality by adding an event listener to the search input.
 *
 */
function initializeSearch() {
  const searchInput = document.getElementById("findTask");

  if (searchInput) {
    searchInput.addEventListener("input", filterTasks);
  }
}
