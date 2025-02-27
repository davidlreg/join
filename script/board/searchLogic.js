/**
 * Filters tasks based on the search input.
 * Displays matching tasks and hides non-matching ones.
 * Shows a "No results" message if no tasks match.
 *
 */
function filterTasks() {
  const searchTerm = document.getElementById("findTask").value.toLowerCase();
  const tasks = document.querySelectorAll(".boardTasks");

  let found = false;

  tasks.forEach((task) => {
    const title = task.querySelector(".boardTaskTitle").textContent.toLowerCase();
    const description = task.querySelector(".boardTaskDescription").textContent.toLowerCase();

    if (title.includes(searchTerm) || description.includes(searchTerm)) {
      task.style.display = "";
      found = true;
    } else {
      task.style.display = "none";
    }
  });

  showNoResultsMessage(!found);
}

/**
 * Toggles the "No results found" message.
 *
 * @param {boolean} show - Whether to display the message.
 */
function showNoResultsMessage(show) {
  let message = document.getElementById("noResultsMessage");
  message.style.display = show ? "block" : "none";
}

const searchInput = document.getElementById("findTask");

if (searchInput) {
  searchInput.addEventListener("input", filterTasks);
}
