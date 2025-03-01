let backendData = {};

/**
 * Fetches data from the backend and updates the global backendData variable.
 *
 * @returns {Promise<void>} A promise that resolves when data is fetched.
 */
async function fetchDataJSON() {
  const response = await fetch("https://joinbackend-9bd67-default-rtdb.europe-west1.firebasedatabase.app/.json");
  backendData = await response.json();
}

/**
 * Initializes the application by setting up links and loading data.
 *
 * @returns {Promise<void>} A promise that resolves when initialization is complete.
 */
async function init() {
  setActiveLinkFromURL();
  showSummaryStartAnimation();
  await loadData();
  await processData();
}

/**
 * Loads data from the backend.
 *
 * @returns {Promise<void>} A promise that resolves when data is loaded.
 */
async function loadData() {
  await fetchDataJSON();
}

/**
 * Processes user data and updates the UI.
 *
 * @returns {Promise<void>} A promise that resolves when processing is complete.
 */
async function processData() {
  updateGreeting();
  headerUserName();
  await updatedBoardCount();
}

/**
 * Retrieves the user's name based on the stored email.
 *
 * @returns {string} The user's name or an empty string if not found.
 */
function getUserName() {
  const users = backendData.Data.Users;
  const userKeys = Object.keys(users);
  const localEmail = getUserByEmail();

  for (let userId of userKeys) {
    if (localEmail === users[userId].email) {
      localStorage.setItem("headerName", users[userId].name);
      return users[userId].name;
    }
  }
  return "";
}

/**
 * Retrieves the user's email from local storage.
 *
 * @returns {string} The user's email.
 */
function getUserByEmail() {
  return localStorage.getItem("email");
}

/**
 * Retrieves the user type from the URL parameters.
 *
 * @returns {string|null} The user type or null if not found.
 */
function getUserType() {
  const params = new URLSearchParams(window.location.search);
  return params.get("user");
}

/**
 * Updates the greeting message based on the current time and user status.
 * 
 */
function updateGreeting() {
  const userType = getUserType();
  const userName = getUserName();
  const summaryUserName = document.getElementById("userName");
  const startTime = document.getElementById("startTime");

  if (summaryUserName) {
    summaryUserName.textContent = userType === "loggedIn" ? userName : "";
  }

  const hour = new Date().getHours();
  const greeting = getGreetingMessage(hour);
  startTime.textContent = userType === "loggedIn" ? `${greeting},` : `${greeting}!`;
}

/**
 * Returns a greeting message based on the hour of the day.
 *
 * @param {number} hour - The current hour.
 * @returns {string} The appropriate greeting message.
 */
function getGreetingMessage(hour) {
  if (hour >= 5 && hour < 12) return "Good Morning";
  if (hour >= 12 && hour < 17) return "Good Afternoon";
  if (hour >= 17 && hour < 21) return "Good Evening";
  return "Good Night";
}

/**
 * Updates the task counts and displays the upcoming deadline.
 *
 * @returns {Promise<void>} A promise that resolves when the update is complete.
 */
async function updatedBoardCount() {
  await fetchDataJSON();
  const tasks = backendData.Data.Tasks;
  const dates = [];

  Object.keys(tasks).forEach((taskId) => {
    const task = tasks[taskId];
    countTaskStatus(task);
    setUpcomingDeadlineDate(task, dates);
  });

  setCountTaskInBoard(tasks);
  displayUpcomingDeadline(dates);
}

/**
 * Counts the status of the given task.
 *
 * @param {Object} task - The task object.
 */
function countTaskStatus(task) {
  setCountToDo(task);
  setCountDone(task);
  setCountUrgent(task);
  setCountAwaiting(task);
  setCountInProgress(task);
}

/**
 * Updates the count of tasks marked as "To do".
 *
 * @param {Object} task - The task object.
 */
function setCountToDo(task) {
  if (task.status === "To do") {
    updateCountDisplay("countToDo");
  }
}

/**
 * Updates the count of tasks marked as "Done".
 *
 * @param {Object} task - The task object.
 */
function setCountDone(task) {
  if (task.status === "Done") {
    updateCountDisplay("countDone");
  }
}

/**
 * Updates the count of tasks marked as "Urgent".
 *
 * @param {Object} task - The task object.
 */
function setCountUrgent(task) {
  if (task.priority === "Urgent") {
    updateCountDisplay("countUrgent");
  }
}

/**
 * Updates the count of tasks marked as "Await Feedback".
 *
 * @param {Object} task - The task object.
 */
function setCountAwaiting(task) {
  if (task.status === "Await Feedback") {
    updateCountDisplay("countAwaitingFeedBack");
  }
}

/**
 * Updates the count of tasks marked as "In Progress".
 *
 * @param {Object} task - The task object.
 */
function setCountInProgress(task) {
  if (task.status === "In Progress") {
    updateCountDisplay("countTaskInProgress");
  }
}

/**
 * Updates the count of tasks displayed in the board.
 *
 * @param {Object} tasks - The tasks object.
 */
function setCountTaskInBoard(tasks) {
  document.getElementById("countTasksInBoard").textContent = Object.keys(tasks).length;
}

/**
 * Updates the upcoming deadline date from a task.
 *
 * @param {Object} task - The task object containing dueDate and status.
 * @param {Array<number>} dates - The array to store valid deadline timestamps.
 */
function setUpcomingDeadlineDate(task, dates) {
  if (!task.dueDate || task.status === "Done") return;

  const deadlineDate = task.dueDate instanceof Date ? task.dueDate : parseCustomDate(task.dueDate);

  if (!isNaN(deadlineDate.getTime())) {
    dates.push(deadlineDate.getTime());
  } else {
    console.warn("Invalid date found:", task.dueDate);
  }
}

/**
 * Converts a date string from DD/MM/YYYY to a valid Date object.
 *
 * @param {string} dateStr - The date string in the format DD/MM/YYYY.
 * @returns {Date} A Date object representing the given date, or an invalid Date if the format is incorrect.
 */
function parseCustomDate(dateStr) {
  const parts = dateStr.split("/");
  if (parts.length !== 3) return new Date(NaN);

  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1;
  const year = parseInt(parts[2], 10);

  return new Date(year, month, day);
}

/**
 * Updates the displayed upcoming deadline.
 *
 * @param {Array<number>} dates - The array of deadline timestamps.
 */
function displayUpcomingDeadline(dates) {
  const summaryUpcomingDeadline = document.getElementById("upcomingDeadline");
  if (dates.length > 0) {
    dates.sort((a, b) => a - b);
    summaryUpcomingDeadline.textContent = formatTimestampCustom(dates[0]);
  }
}

/**
 * Updates the count display of a specific element.
 *
 * @param {string} elementId - The ID of the element to update.
 */
function updateCountDisplay(elementId) {
  const countElement = document.getElementById(elementId);
  countElement.textContent = parseInt(countElement.textContent) + 1;
}

/**
 * Formats a timestamp into a readable date string.
 *
 * @param {number} timestamp - The timestamp to format.
 * @returns {string} The formatted date string.
 */
function formatTimestampCustom(timestamp) {
  const date = new Date(timestamp);
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${month} ${day}, ${year}`;
}
