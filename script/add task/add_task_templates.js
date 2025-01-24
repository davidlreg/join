function addTaskHtmlTemplate(){
    return `<form id="taskFormOverlay">
                <h1> Add task</h1>

                <!-- Left Column -->

                <div class="taskInputContainer">
                    <div class="taskInputLeft">
                        <div class="taskInputOverlay">
                            <p>Title<span>*</span></p>
                            <input required type="text" placeholder="Enter a title" class="addTaskInput">
                        </div>
                        <div class="taskInputOverlay">
                            <p>Description</p>
                            <textarea required type="text" placeholder="Enter a Description" class="addDescriptionInputOverlay"></textarea>
                        </div>
                        <div class="taskInputOverlay">
                            <p>Assigned to</p>
                            <div onclick="" id="dropdown" class="dropdown">
                                <div class="selectContainer">Select contacts to assign</div>
                                <div class="dropdownIcon">
                                    <img id="dropdownIconDown" src="/assets/img/arrow_drop_down.png" alt="">
                                </div>
                            </div>
                        </div>
                    </div>

                    <hr class="taskSeparator">

                    <!-- Right Column -->
                    <div class="taskInputRight">
                        <div class="taskInputOverlay">
                            <p>Due Date <span>*</span></p>
                            <input required type="date" placeholder="dd/mm/yyyy" class="addTaskInput">
                        </div>
                        <div class="taskInputOverlay">
                            <p>Prio</p>
                            <div class="priorityButtonOverlay">
                                <button id="urgentButton" type="button" onclick="setPriority('urgent')"> Urgent
                                    <img src="/assets/img/Prio alta.png" alt="Urgent">
                                </button>
                                <button id="mediumButton" type="button" onclick="setPriority('medium')"> Medium
                                    <img src="/assets/img/Prio medium.png" alt="Medium">
                                </button>
                                <button id="lowButton" type="button" onclick="setPriority('low')"> Low
                                    <img src="/assets/img/Prio baja.png" alt="Low">
                                </button>
                            </div>
                        </div>
                        <div class="taskInputOverlay">
                            <p>Category <span>*</span></p>
                            <div onclick="" class="dropdown">
                                <div class="selectContainer">Select task category</div>
                                <div class="dropdownIcon">
                                    <img id="dropdownIconDown" src="/assets/img/arrow_drop_down.png" alt="">
                                </div>
                            </div>
                        </div>
                        <div class="taskInputOverlay">
                            <p>Subtasks</p>
                            <div class="subtaskWrapper">
                                <input required type="text" placeholder="Add new subtask" class="addTaskInput">
                                <div class="iconWrapper">
                                    <div class="addSubtask">
                                        <img src="/assets/img/Subtasks icons11.png">
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <!-- Footer Actions -->
                <div class="requiredActionOverlay">
                    <div class="requiredText">
                        <span>*</span>
                        This field is require
                        
                    </div>

                    <div class="actions">
                        <button class="clearButton" onclick="closeTaskOverlay()">Clear
                            <img src="/assets/img/iconoir_cancel.png">
                        </button>
                        <button class="createButton" onclick="">Create Task
                            <img src="/assets/img/check.png">
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </form>
    `;
}