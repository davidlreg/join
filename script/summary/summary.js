let backendData = {};

async function fetchDataJSON() {
  let response = await fetch("https://joinbackend-9bd67-default-rtdb.europe-west1.firebasedatabase.app/.json");
  let responseJSON = await response.json();
  backendData = responseJSON;
}

async function init() {
  setActiveLinkFromURL();
  showSummaryStartAnimation();
  await loadData();
  processData();
}

async function loadData() {
  await fetchDataJSON();
}

function processData() {
  updateGreeting();
  headerUserName();
  updatedBoardCount();
}


function getUserName() {
  const users = backendData.Data.Users;
  const userKeys = Object.keys(users);
  const localEmail = getUserByEmail();

  for (let i = 0; i < userKeys.length; i++) {
    const userId = userKeys[i];
    if (localEmail === users[userId].email) {
      headerName = localStorage.setItem('headerName', users[userId].name)
      return users[userId].name;
    }
  }
  return "";
}

function getUserByEmail() {
  const localEmail = localStorage.getItem('email');
  return localEmail;
}

function getUserType() {
  const params = new URLSearchParams(window.location.search);
  return params.get('user');
}

/**
 * The geeting is updated by the date time
 */

function updateGreeting() {
  const userType = getUserType();
  const userName = getUserName();
  const summaryUserName = document.getElementById('userName');
  const startTime = document.getElementById('startTime');

  if (summaryUserName) {
    summaryUserName.textContent = userType === "loggedIn" ? userName : "";
  }

  const hour = new Date().getHours();
  let greeting = "Good Night";

  if (hour >= 5 && hour < 12) {
    greeting = "Good Morning";
  } else if (hour >= 12 && hour < 17) {
    greeting = "Good Afternoon";
  } else if (hour >= 17 && hour < 21) {
    greeting = "Good Evening";
  }

  startTime.textContent = userType === "loggedIn" ? `${greeting},` : `${greeting}!`;
}


/**
 * Update the summary counts from the board
 */
async function updatedBoardCount() {
  await fetchDataJSON();
  let tasks = backendData.Data.Tasks;
  let dates = [];

  Object.keys(tasks).forEach(taskId => {
    let task = tasks[taskId]; 

    setCountToDo(task)
    setCountDone(task)
    setCountUrgent(task)
    setUpcomingDeadlineDate(task, dates)
    setCountAwaiting(task)
    setCountInProgress(task)
    
  });
  setCountTaskInBoard(tasks)
}

/**
 * update the count to do
 * 
 */
function setCountToDo(task) {
  let summaryCountToDo = document.getElementById('countToDo')
  if (task.status === "To do") {
    summaryCountToDo.textContent = parseInt(summaryCountToDo.textContent) + 1;
  }
}

/**
 * update the count done
 * 
 */

function setCountDone(task) {
  let summaryCountDone = document.getElementById('countDone')
  if (task.status === "Done") {
    summaryCountDone.textContent = parseInt(summaryCountDone.textContent) + 1;
  }
}

/**
 * update the count urgent
 * 
 */

function setCountUrgent(task) {
  let summaryCountUrgent = document.getElementById('countUrgent')
  if (task.priority === "Urgent") {
    summaryCountUrgent.textContent = parseInt(summaryCountUrgent.textContent) + 1;
  }
}

/**
 * update the count awaiting feedback
*/

function setCountAwaiting(task) {
  let summaryCountTaskAwaiting = document.getElementById('countTaskAwaiting')
  if (task.status === "Await Feedback") {
    summaryCountTaskAwaiting.textContent = parseInt(summaryCountTaskAwaiting.textContent) + 1;
  }
}

/**
 * update the count in progress
 * 
 */

function setCountInProgress(task) {
  let summaryCountTaskInProgress = document.getElementById('countTaskInProgress')
  if (task.status === "In Progress") {
    summaryCountTaskInProgress.textContent = parseInt(summaryCountTaskInProgress.textContent) + 1;
  }
}

/**
 * update the count of tasks in the board
 * 
 */

function setCountTaskInBoard(task) {
  let summaryCountTaskInBoard = document.getElementById('countTasksInBoard')
  summaryCountTaskInBoard.textContent = Object.keys(task).length;
}

/**
 * Update the upcoming deadline in the database
 */

function setUpcomingDeadlineDate(task, dates) {
  let summaryUpcomingDeadline = document.getElementById('upcomingDeadline');
  if (task.priority == "Urgent") {
    let deadlineDate = new Date(task.duedate);
    dates.push(deadlineDate.getTime())
    dates.sort((a, b) => a - b);
    summaryUpcomingDeadline.textContent = formatTimestampCustom(dates[0])
  }
}

/**
 * Set the right Date in the upcoming deadline
 * 
 * 
 */

function formatTimestampCustom(timestamp) {
  const date = new Date(timestamp);
  const months = [
    "Januar", "Februar", "März", "April", "Mai", "Juni",
    "Juli", "August", "September", "Oktober", "November", "Dezember"
  ];

  let day = date.getDate();
  let month = months[date.getMonth()];
  let year = date.getFullYear();

  return `${month} ${day}, ${year}`;
}