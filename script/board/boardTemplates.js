/**
 * Generates HTML for a task card on the board.
 *
 * @param {Object} task - Task data containing title, category, description, subtasks, etc.
 * @param {string} taskId - Unique identifier for the task.
 * @returns {string} HTML string representing the task card.
 */
function templateBoardTasks(task, taskId) {
  const assignedToArray = Array.isArray(task.assignedTo) ? task.assignedTo : [];
  let completedSubtasks = task.subtask
    ? task.subtask.filter((st) => st.completed).length
    : 0;
  let totalSubtasks = task.subtask ? task.subtask.length : 0;
  let progressPercentage =
    totalSubtasks > 0 ? (completedSubtasks / totalSubtasks) * 100 : 0;
  let progressColor = progressPercentage === 100 ? "#28a745" : "#007bff";

  const maxVisibleContacts = 3;
  const visibleContacts = assignedToArray.slice(0, maxVisibleContacts);
  const hiddenContactsCount = assignedToArray.length - maxVisibleContacts;

  return `
        <div class="boardTasks" draggable="true" ondragstart="drag(event, '${taskId}')" ontouchstart="touchStart(event, '${taskId}')"  
        ontouchmove="touchMove(event)" ontouchend="touchEnd(event)" onclick="addBoardOverlay('${taskId}')" data-task-id="${taskId}" id="${taskId}">
          <span class="boardTaskCategory">${task.category}</span>
          <span class="boardTaskTitle">${task.title}</span>
          <span class="boardTaskDescription">${task.description}</span>
          
          <!-- Fortschrittsanzeige -->
          <div class="boardSubTasks" data-task-id="${taskId}" style="${
    totalSubtasks === 0 ? "display:none;" : "display: block;"
  }">

              <div class="boardSubtaskProgress" 
              onmouseover="showTooltip(event, '${completedSubtasks} of ${totalSubtasks} subtasks done')" 
                   onmouseleave="hideTooltip()">
                  <div class="boardSubtaskProgressBar" data-task-id="${taskId}" 
                       style="width: ${progressPercentage}%; background-color: ${progressColor};"></div>        
              </div>
              <span>${completedSubtasks}/${totalSubtasks} Subtasks</span>
          </div>

          <div class="boardTaskBottom">
              <div class="boardTaskUsers">
                  ${visibleContacts
                    .map(
                      (contact) => `
                            <div class="profilePicture" title="${
                              contact.name
                            }" style="background-color: ${getRandomColorForName(
                        contact.name
                      )};">
                                ${contact.name.charAt(0).toUpperCase()}${
                        contact.name.split(" ")[1]?.charAt(0).toUpperCase() ||
                        ""
                      }
                            </div>
                        `
                    )
                    .join("")}
                  
                  ${
                    hiddenContactsCount > 0
                      ? `<div class="profilePicture moreContactsIndicator" title="${hiddenContactsCount} more contacts">+${hiddenContactsCount}</div>`
                      : ""
                  }
              </div>
              <img src="/assets/icon/board/priority-${
                task.priority
              }.png" alt="Priority Icon">
          </div>
      </div>
    `;
}

/**
 * Generates the HTML for the task overlay, showing detailed information about the task.
 *
 * @param {Object} task - Task data containing title, category, description, due date, etc.
 * @returns {string} HTML string representing the task overlay.
 */
function templateBoardOverlay(task, taskId) {
  return `
      <div class="boardOverlayContent">
        <div class="boardOverlayHeader">
            <p is="boardOverlayTaskCategory" class="boardOverlayTaskCategory">${
              task.category
            }</p>
            <div class="closeBoardOverlay" onclick="closeBoardOverlay()">
            <!-- SVG für Schließen-Button -->
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <mask id="mask0_274405_5666" style="mask-type: alpha" maskUnits="userSpaceOnUse" x="0"
                        y="0" width="24" height="24">
                        <rect width="24" height="24" fill="#D9D9D9" />
                    </mask>
                    <g mask="url(#mask0_274405_5666)">
                        <path
                            d="M12 13.4L7.09999 18.3C6.91665 18.4834 6.68332 18.575 6.39999 18.575C6.11665 18.575 5.88332 18.4834 5.69999 18.3C5.51665 18.1167 5.42499 17.8834 5.42499 17.6C5.42499 17.3167 5.51665 17.0834 5.69999 16.9L10.6 12L5.69999 7.10005C5.51665 6.91672 5.42499 6.68338 5.42499 6.40005C5.42499 6.11672 5.51665 5.88338 5.69999 5.70005C5.88332 5.51672 6.11665 5.42505 6.39999 5.42505C6.68332 5.42505 6.91665 5.51672 7.09999 5.70005L12 10.6L16.9 5.70005C17.0833 5.51672 17.3167 5.42505 17.6 5.42505C17.8833 5.42505 18.1167 5.51672 18.3 5.70005C18.4833 5.88338 18.575 6.11672 18.575 6.40005C18.575 6.68338 18.4833 6.91672 18.3 7.10005L13.4 12L18.3 16.9C18.4833 17.0834 18.575 17.3167 18.575 17.6C18.575 17.8834 18.4833 18.1167 18.3 18.3C18.1167 18.4834 17.8833 18.575 17.6 18.575C17.3167 18.575 17.0833 18.4834 16.9 18.3L12 13.4Z"
                            fill="#2A3647" />
                    </g>
                </svg>
            </div>
        </div>
        <p class="boardOverlayTaskTitle">${task.title}</p>
        <p class="boardOverlayTaskDescription">${task.description}</p>
        
        <div class="boardOverlayTaskInfo">
            <p class="boardOverlayTaskDate">
                <span class="label">Due Date:</span>
                <span id="dueDate">${task.dueDate}</span>
            </p>
            
            <div class="boardOverlayTaskPriority">
                <span class="label">Priority:</span>
                <span>${task.priority}</span>
                <img src="/assets/icon/board/priority-${
                  task.priority
                }.png" alt="Priority Icon">
            </div>
        </div>
        <div class="boardOverlayAssignedTo">
            <p>Assigned To:</p>
            <ul>
                ${(task.assignedTo || [])
                  .map(
                    (contact) => `
                    <li>
                         <div class="boardOverlayUser" style="background-color: ${getRandomColorForName(
                           contact.name
                         )};">
                            ${contact.name.charAt(0).toUpperCase()}${
                      contact.name.split(" ")[1]?.charAt(0).toUpperCase() || ""
                    }
                        </div>
                        <span class="boardOverlayUsername">${
                          contact.name
                        }</span>
                    </li>
                `
                  )
                  .join("")}
            </ul>
        </div>
        <div class="boardOverlaySubtasks">
                <p>Subtasks</p>
                <ul class="checkboxList">
                    ${(Array.isArray(task.subtask) ? task.subtask : [])
                      .map(
                        (subtask, index) => `
                        <li>
                            <input type="checkbox" id="subtask-${
                              task.id
                            }-${index}" 
                                ${subtask.completed ? "checked" : ""} 
                                onchange="toggleSubtask('${
                                  task.id
                                }', ${index})">
                             <label for="subtask-${task.id}-${index}"></label>
                            <span>${subtask.text}</span>
                        </li>
                    `
                      )
                      .join("")}
                </ul>
            </div>
        <div class="boardOverlayActionButtons">
            <button class="boardOverlayActionButtonsDelete" onclick="deleteTask()">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <mask id="mask0_278437_2492" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                <rect width="24" height="24" fill="#D9D9D9"/>
                </mask>
                <g mask="url(#mask0_278437_2492)">
                <path d="M7 21C6.45 21 5.97917 20.8042 5.5875 20.4125C5.19583 20.0208 5 19.55 5 19V6C4.71667 6 4.47917 5.90417 4.2875 5.7125C4.09583 5.52083 4 5.28333 4 5C4 4.71667 4.09583 4.47917 4.2875 4.2875C4.47917 4.09583 4.71667 4 5 4H9C9 3.71667 9.09583 3.47917 9.2875 3.2875C9.47917 3.09583 9.71667 3 10 3H14C14.2833 3 14.5208 3.09583 14.7125 3.2875C14.9042 3.47917 15 3.71667 15 4H19C19.2833 4 19.5208 4.09583 19.7125 4.2875C19.9042 4.47917 20 4.71667 20 5C20 5.28333 19.9042 5.52083 19.7125 5.7125C19.5208 5.90417 19.2833 6 19 6V19C19 19.55 18.8042 20.0208 18.4125 20.4125C18.0208 20.8042 17.55 21 17 21H7ZM7 6V19H17V6H7ZM9 16C9 16.2833 9.09583 16.5208 9.2875 16.7125C9.47917 16.9042 9.71667 17 10 17C10.2833 17 10.5208 16.9042 10.7125 16.7125C10.9042 16.5208 11 16.2833 11 16V9C11 8.71667 10.9042 8.47917 10.7125 8.2875C10.5208 8.09583 10.2833 8 10 8C9.71667 8 9.47917 8.09583 9.2875 8.2875C9.09583 8.47917 9 8.71667 9 9V16ZM13 16C13 16.2833 13.0958 16.5208 13.2875 16.7125C13.4792 16.9042 13.7167 17 14 17C14.2833 17 14.5208 16.9042 14.7125 16.7125C14.9042 16.5208 15 16.2833 15 16V9C15 8.71667 14.9042 8.47917 14.7125 8.2875C14.5208 8.09583 14.2833 8 14 8C13.7167 8 13.4792 8.09583 13.2875 8.2875C13.0958 8.47917 13 8.71667 13 9V16Z" fill="#2A3647"/>
                </g>
              </svg>
              Delete
            </button>
            <div class="overlaySeparator">|</div>
            <button class="boardOverlayActionButtonsEdit" onclick="editTask('${taskId}')">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <mask id="mask0_278437_2498" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                <rect width="24" height="24" fill="#D9D9D9"/>
                </mask>
                <g mask="url(#mask0_278437_2498)">
                <path d="M5 19H6.4L15.025 10.375L13.625 8.975L5 17.6V19ZM19.3 8.925L15.05 4.725L16.45 3.325C16.8333 2.94167 17.3042 2.75 17.8625 2.75C18.4208 2.75 18.8917 2.94167 19.275 3.325L20.675 4.725C21.0583 5.10833 21.2583 5.57083 21.275 6.1125C21.2917 6.65417 21.1083 7.11667 20.725 7.5L19.3 8.925ZM17.85 10.4L7.25 21H3V16.75L13.6 6.15L17.85 10.4Z" fill="#2A3647"/>
                </g>
              </svg>
              Edit
            </button>
        </div>
  `;
}

/**
 * Generates the HTML for the task edit form, allowing the user to edit task details.
 *
 * @param {Object} task - Task data to be used to pre-fill the edit form.
 * @returns {string} HTML string representing the task edit form.
 */
function templateEditTask(task, taskId) {
  const assignedToArray = Array.isArray(task.assignedTo) ? task.assignedTo : [];
  const maxVisibleContacts = 4;
  const visibleContacts = assignedToArray.slice(0, maxVisibleContacts);
  const hiddenContactsCount = assignedToArray.length - maxVisibleContacts;

  return `
  <div class="editBoardHeader">
    <div class="closeBoardOverlay" onclick="closeBoardOverlay()">
      <!-- SVG für Schließen-Button -->
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <mask id="mask0_274405_5666" style="mask-type: alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
          <rect width="24" height="24" fill="#D9D9D9" />
        </mask>
        <g mask="url(#mask0_274405_5666)">
          <path
            d="M12 13.4L7.09999 18.3C6.91665 18.4834 6.68332 18.575 6.39999 18.575C6.11665 18.575 5.88332 18.4834 5.69999 18.3C5.51665 18.1167 5.42499 17.8834 5.42499 17.6C5.42499 17.3167 5.51665 17.0834 5.69999 16.9L10.6 12L5.69999 7.10005C5.51665 6.91672 5.42499 6.68338 5.42499 6.40005C5.42499 6.11672 5.51665 5.88338 5.69999 5.70005C5.88332 5.51672 6.11665 5.42505 6.39999 5.42505C6.68332 5.42505 6.91665 5.51672 7.09999 5.70005L12 10.6L16.9 5.70005C17.0833 5.51672 17.3167 5.42505 17.6 5.42505C17.8833 5.42505 18.1167 5.51672 18.3 5.70005C18.4833 5.88338 18.575 6.11672 18.575 6.40005C18.575 6.68338 18.4833 6.91672 18.3 7.10005L13.4 12L18.3 16.9C18.4833 17.0834 18.575 17.3167 18.575 17.6C18.575 17.8834 18.4833 18.1167 18.3 18.3C18.1167 18.4834 17.8833 18.575 17.6 18.575C17.3167 18.575 17.0833 18.4834 16.9 18.3L12 13.4Z"
            fill="#2A3647"
          />
        </g>
      </svg>
    </div>
  </div>
  <div class="editOverlayContent">
    <form id="taskFormOverlay" class="editTaskFormOverlay">
      <div class="editTaskWrapper">
        <!-- Left Column -->

        <div class="editTaksTopPartWrapper">
          <div class="editTaskInputLeft">
            <div class="editTaskInputOverlay">
              <p>Title<span></span></p>
              <input required type="text" placeholder="Enter a title" class="editTaskInput" id="addTaskTitle" value="${
                task.title
              }" />
            </div>
            <div class="editTaskInputOverlay">
              <p>Description</p>
              <textarea placeholder="Enter a Description" class="editDescriptionInputOverlay textareaStyling" id="addTaskDescription">${
                task.description
              }</textarea>
            </div>

            <div class="editTaskInputOverlay">
              <p>Due Date</p>
              <input required type="text" class="editTaskInput dateInput" id="addTaskDate" placeholder="TT/MM/YYYY" readonly value="${
                task.dueDate
              }" onclick="openDatePicker()">
              </div>
          </div>
        </div>

        <div class="editTaskInputOverlay">
          <p class="prioBold">Priority</p>
          <div class="editPriorityButtonOverlay">
            <button class="editButtonWidth" id="urgentButton" type="button" onclick="setPriority('urgent')">
              Urgent
              <img class="editPriorityImages" src="/assets/icon/board/priority-Urgent.png" alt="Urgent" />
            </button>
            <button class="editButtonWidth" id="mediumButton" type="button" onclick="setPriority('medium')">
              Medium
              <img class="editPriorityImages" src="/assets/icon/board/priority-Medium.png" alt="Medium" />
            </button>
            <button class="editButtonWidth" id="lowButton" type="button" onclick="setPriority('low')">
              Low
              <img class="editPriorityImages" src="/assets/icon/board/priority-Low.png" alt="Low" />
            </button>
          </div>
        </div>

        <div class="editTaskInputOverlay">
          <p>Assigned to</p>
          <div onclick="toggleContact()" id="dropdown" class="editDropdown">
            <div class="editSelectContainerOverlay">Select contacts to assign</div>
            <div class="editDropdownIcon">
              <img id="dropdownIconDown" src="/assets/img/arrowDropDown.png" alt="" />
            </div>
          </div>
          <div id="selectContact" class="editSelectContact"></div>
          <div id="selectedContacts" class="editSelectedContacts">
            ${visibleContacts
              .map(
                (contact) => `
            <div class="profilePicture" title="${
              contact.name
            }" style="background-color: ${getRandomColorForName(
                  contact.name
                )};">
              <p class="profilePictureLetters">${contact.name
                .charAt(0)
                .toUpperCase()}${
                  contact.name.split(" ")[1]?.charAt(0).toUpperCase() || ""
                }</p>
            </div>
            `
              )
              .join("")} ${
    hiddenContactsCount > 0
      ? `
            <div class="profilePicture moreContactsIndicator" title="${hiddenContactsCount} more contacts">+${hiddenContactsCount}</div>
            `
      : ""
  }
          </div>
        </div>

    <!-- Right Column -->
    <div class="editTaskInputRight">
      <div class="editTaskInputOverlay">
        <p>Subtasks</p>
        <div class="editSubtaskWrapper">
          <input type="text" placeholder="Add new subtask" class="editTaskInput" id="addTaskSubTasks" oninput="toggleSubtaskIcons()" />
          <div class="editIconWrapperOverlay">
            <div class="editSubtask">
              <img id="subtaskPlusIcon" src="/assets/img/subtaskPlusIcon.png" onclick="subtaskEmpty()"/>
            </div>

            <div id="subtaskIcons" style="display: none">
              <img src="/assets/icon/addTask/discard.png" id="discardSubtask" class="editSubtaskIcon" onclick="clearSubtaskInput()" alt="Discard subtask" />
              <img src="/assets/icon/addTask/vector.png" id="vectorIcon" alt="Vector separator" />
              <img src="/assets/icon/addTask/done.png" id="confirmSubtask" class="editSubtaskIcon" onclick="addSubtask()" alt="Confirm subtask" />
            </div>
          </div>
        </div>
        <ul class="editCheckboxList" id="subtaskList">
          ${(Array.isArray(task.subtask) ? task.subtask : [])
            .map(
              (subtask, index) => `
              <div id="subtask${index + 1}" class="editSubtaskContent">
                <div class="editSubtaskTextWrapper">
                  <li class="subtaskText">${subtask.text}</li>
                </div>
                <div class="editSubtaskIcons editSubtaskItem">
                   <img src="/assets/icon/addTask/edit.png" class="editSubtaskIcon" onclick="editOldSubtask(${index})" />
                  <img src="/assets/icon/addTask/vector.png">
                 <img src="/assets/icon/addTask/delete.png" class="editSubtaskIcon removeSubtask" onclick="removeOldSubtask(${index})" />

                </div>
              </div>
            `
            )
            .join("")}
          </ul>
        </div>
      </div>
    </div>
  </form>
</div>
<!-- Footer Actions -->
<div class="okayBtnContainer">
  <button type="button" class="okayBtn" onclick="editTasksForBoard('${taskId}')">
    <p>Ok</p>
    <img src="/assets/img/check.png" alt="" />
  </button>
</div>
    `;
}

/**
 * Generates the HTML structure for a success message when a task is added.
 *
 * @returns {string} The HTML markup for the success message.
 */
function insertTaskCreatedMessage() {
  const svgMarkup = getSvgMarkup();
  return `
    <div class="taskSuccessfullyCreated">
      <p>Task added to board</p>
      ${svgMarkup}
    </div>
  `;
}

/**
 * Returns the SVG markup for the success icon.
 *
 * @returns {string} The SVG markup.
 */
function getSvgMarkup() {
  return `
    <svg width="26" height="22" viewBox="0 0 26 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 1.99979L20 19.9998C19.9995 20.5301..." fill="white"/>
      <path d="M26 2.00001L26 20C25.9995 20.5303..." fill="white"/>
    </svg>
  `;
}
