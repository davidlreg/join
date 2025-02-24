function addTaskHtmlTemplate() {
  const template = `
       <form id="taskFormOverlay" class="addTaskWrapper">
  <h1>Add task</h1>
  <!-- Task Input Container -->
  <div class="taskInputContainerOverlay">
    <!-- Left Column -->
    <div class="taskInputLeft">
      <div class="taskInputOverlay">
        <p>Title<span>*</span></p>
        <input type="text" id="addTaskTitle" placeholder="Enter a title" class="addTaskInput addTaskInputOverlay" />
      </div>
      <div class="taskInputOverlay">
        <p>Description</p>
        <textarea placeholder="Enter a Description" class="addDescriptionInputOverlay" id="addTaskDescription"></textarea>
      </div>
      <div class="taskInputOverlay">
        <p>Assigned to</p>
        <div onclick="toggleContact()" id="dropdown" class="dropdown dropdownOverlay">
          <div class="selectContainer selectContainerOverlay">Select contacts to assign</div>
          <div class="dropdownIcon">
            <img id="dropdownIconDown" src="/assets/img/arrowDropDown.png" alt="" />
          </div>
        </div>
        <div id="selectContact" class="selectContact selectContactOverlay"></div>
        <div id="selectedContacts" class="selectedContacts"></div>
      </div>
    </div>
    <hr class="taskSeparator" />
    <!-- Right Column -->
    <div class="taskInputRight">
      <div class="taskInputOverlay">
        <p>Due Date <span>*</span></p>
        <input type="text" class="addTaskInput dateInput" id="addTaskDate" placeholder="TT/MM/YYYY" readonly onclick="openDatePicker()">
      </div>
      <div class="taskInputOverlay">
        <p>Prio</p>
        <div class="priorityButtonOverlay">
          <button id="urgentButton" type="button" onclick="setPriority('urgent')">
            Urgent
            <img src="/assets/img/prioHigh.png" alt="Urgent" />
          </button>
          <button id="mediumButton" type="button" onclick="setPriority('medium')">
            Medium
            <img src="/assets/img/prioMedium.png" alt="Medium" />
          </button>
          <button id="lowButton" type="button" onclick="setPriority('low')">
            Low
            <img src="/assets/img/prioLow.png" alt="Low" />
          </button>
        </div>
      </div>
      <div class="taskInputOverlay">
        <p>Category <span>*</span></p>
        <div class="dropdownCategory">
          <select required id="selectTask" class="selectContainer" placeholder="Select task category">
            <option class="dNone" value="" disabled selected>Select task category</option>
            <option value="Technical Task">Technical Task</option>
            <option value="User Story">User Story</option>
          </select>
        </div>
        <div class="selectCategory selectCategoryOverlay">
          <div class="selectCategoryItem" onclick="selectCategoryOverlay('Technical Task')">Technical Task</div>
          <div class="selectCategoryItem" onclick="selectCategoryOverlay('User Story')">User Story</div>
        </div>
      </div>
      <div class="taskInputOverlay">
        <p>Subtasks</p>
        <div class="subtaskWrapper">
          <input type="text" placeholder="Add new subtask" class="addTaskInput addTaskInputOverlay" id="addTaskSubTasks" oninput="toggleSubtaskIcons()" />
          <div class="iconWrapper iconWrapperOverlay">
            <div class="addSubtask">
              <img src="/assets/img/subtaskPlusIcon.png" id="subtaskPlusIcon" alt="Add subtask" onclick="subtaskEmpty()" />
            </div>

            <div id="subtaskIcons" style="display: none">
              <img src="/assets/icon/addTask/discard.png" id="discardSubtask" class="subtaskIcon" onclick="clearSubtaskInput()" alt="Discard subtask" />
              <img src="/assets/icon/addTask/vector.png" id="vectorIcon" alt="Vector separator" />
              <img src="/assets/icon/addTask/done.png" id="confirmSubtask" class="subtaskIcon" onclick="addSubtask()" alt="Confirm subtask" />
            </div>
          </div>
        </div>
        <ul id="subtaskList" class="subtaskListOverlay"></ul>
      </div>
    </div>
  </div>

  <!-- Footer Actions -->
  <div class="requiredActionOverlay">
    <div class="requiredText">
      <span>*</span>
      This field is required
    </div>
    <div class="actions">
      <button type="button" class="clearButton clearButtonOverlay" onclick="clearButton()">
        Clear
        <img src="/assets/img/clearIcon.png" alt="" />
      </button>
      <button type="button" class="createButton createButtonOverlay" onclick="createTasksForBoard()">
        Create Task
        <img src="/assets/img/check.png" alt="" />
      </button>
    </div>
  </div>
</form>
    `;

  setTimeout(() => {
    initTask();
  }, 100);

  return template;
}

function getSubtasks(subtaskValue) {
  return `
    <div class="subtaskContent">
        <div class="subtaskTextWrapper">
          <li class="bulletPoint">&#8226;</li>
          <li class="subtaskText">${subtaskValue}</li>
        </div>
        <div class="subtaskIcons">
          <img src="/assets/icon/addTask/edit.png" class="subtaskIcon editSubtask">
          <img src="/assets/icon/addTask/vector.png">
          <img src="/assets/icon/addTask/delete.png" class="subtaskIcon removeSubtask">
        </div>
    </div>
    `;
}

function getSubtaskIcons() {
  return `
    <img src="/assets/icon/addTask/delete.png" class="subtaskIcon removeSubtask">
    <img src="/assets/icon/addTask/vector.png">
    <img src="/assets/icon/addTask/done.png" class="subtaskIcon confirmEditSubtask">
    `;
}
