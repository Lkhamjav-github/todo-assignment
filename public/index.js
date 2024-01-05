// add task buttons
const AddTaskContainerRef = document.getElementsByClassName("AddTaskContainer");

// windows big containers
const AddTaskSectionRef = document.getElementById("modal");
const GrayAreaRef = document.getElementById("grayarea");
const ExceptOfAddTaskSectionRef = document.getElementById("main");

//add task section inputs and elements
const AddTaskButtonRef = document.getElementById("AddTaskButton");
const TitleRef = document.getElementById("Title");
const DescriptionRef = document.getElementById("Description");
const StatusRef = document.getElementById("Status");
const PriorityRef = document.getElementById("Priority");
const AddTaskButtonArray = [TitleRef, DescriptionRef, StatusRef, PriorityRef];
// add supporting texts when adding task info

const HelperTextArray = document.getElementsByClassName("red_p");

// Open add task section when click on add task button
const AddTaskVisible = () => {
    AddTaskSectionRef.style.visibility = "visible";
    GrayAreaRef.style.backgroundColor = "rgba(0,0,0,0.8)";

    for (let g = 0; g < AddTaskButtonArray.length; g++) {
        AddTaskButtonArray[g].value = "";
        AddTaskButtonArray[g].style.borderColor = "gray";
        HelperTextArray[g].style.visibility = "hidden";
    }
};

for (let i = 0; i < AddTaskContainerRef.length; i++) {
    AddTaskContainerRef[i].addEventListener("click", AddTaskVisible);
}

//close add tack section when click on window excep of add task section
const AddTaskHidden = () => {
    AddTaskSectionRef.style.visibility = "hidden";
    GrayAreaRef.style.backgroundColor = "rgba(0,0,0,0)";

    for (let f = 0; f < HelperTextArray.length; f++) {
        HelperTextArray[f].style.visibility = "hidden";
    }
};

window.onclick = function (event) {
    if (event.target == ExceptOfAddTaskSectionRef) {
        AddTaskHidden();
    }
};
// main array of tasks
const state = {
    tasks: [],
};

//each object has status/4/, title/text/, description/text/, priority/3/ keys and ID
//require all inputs
const RequireInfo = () => {
    for (let k = 0; k < AddTaskButtonArray.length; k++) {
        if (AddTaskButtonArray[k].value.trim() == "") {
            AddTaskButtonArray[k].style.borderColor = "red";
            HelperTextArray[k].style.visibility = "visible";
        } else {
            AddTaskButtonArray[k].style.borderColor = "gray";
            HelperTextArray[k].style.visibility = "hidden";
        }
    }
};

var i = 0;
const GetTaskInfo = () => {
    // get task information section
    const newTaskTitleText = TitleRef.value.trim();
    const newTaskDesText = DescriptionRef.value.trim();
    const newTaskPriorityValue = PriorityRef.value;
    const newTaskStatusValue = StatusRef.value;
    const idNum = i++;
    // supporting object to sorting tasks based on priority
    const StatusSortValue = { low: 1, medium: 2, high: 3 };
    // add task info to tasks array
    if (
        newTaskDesText !== "" &&
        newTaskTitleText !== "" &&
        newTaskPriorityValue !== "" &&
        newTaskStatusValue !== ""
    ) {
        state.tasks.push({
            title: newTaskTitleText,
            description: newTaskDesText,
            status: newTaskStatusValue,
            priority: newTaskPriorityValue,
            delete: false,
            id: idNum,
        });
        //sorting hesgiig chatGDP-s huulav
        state.tasks.sort(
            (a, b) => StatusSortValue[b.priority] - StatusSortValue[a.priority]
        );
        render();

        AddTaskHidden();
    } else {
        RequireInfo();
    }
};
//push info and appendchild
const render = () => {
    //task holders
    const Todo_tasks = document.getElementById("Todo_tasks");
    const Inprogress_tasks = document.getElementById("Inprogress_tasks");
    const Stuck_tasks = document.getElementById("Stuck_tasks");
    const Done_tasks = document.getElementById("Done_tasks");
    //update regularly
    Todo_tasks.innerHTML = "";
    Inprogress_tasks.innerHTML = "";
    Stuck_tasks.innerHTML = "";
    Done_tasks.innerHTML = "";
    // supporting object for counting tasks based on taks status
    const CountByStatus = {
        todo: 0,
        inprogress: 0,
        stuck: 0,
        done: 0,
    };

    var j = 0; //for task container - id number
    state.tasks.forEach((task) => {
        const containerId = j++;
        const task_container = document.createElement("div");
        const task_justify = document.createElement("div");
        const done_icon = document.createElement("div");
        const task_info_holder = document.createElement("div");
        const task_title = document.createElement("h2");
        const task_desc = document.createElement("p");
        const task_priority = document.createElement("div");
        const task_edit_close_holder = document.createElement("div");
        const task_edit = document.createElement("div");
        const task_close = document.createElement("div");

        // add css styles
        task_container.classList.add("task_container");
        task_justify.classList.add("task_justify");
        done_icon.classList.add("done_icon");
        task_info_holder.classList.add("task_info_holder");
        task_title.classList.add("task_title");
        task_desc.classList.add("task_desc");
        task_priority.classList.add("task_priority");
        task_edit_close_holder.classList.add("task_edit_close_holder");
        task_edit.classList.add("task_edit");
        task_close.classList.add("task_close");

        // add textcontent for created elements
        task_title.textContent = task.title;
        task_desc.textContent = task.description;
        task_priority.textContent = task.priority;

        // apenchild
        task_justify.appendChild(done_icon);

        task_info_holder.appendChild(task_title);
        task_info_holder.appendChild(task_desc);
        task_info_holder.appendChild(task_priority);
        task_justify.appendChild(task_info_holder);

        task_edit_close_holder.appendChild(task_close);
        task_edit_close_holder.appendChild(task_edit);

        task_container.appendChild(task_justify);
        task_container.appendChild(task_edit_close_holder);
        task_container.setAttribute("draggable", "true");

        // add id for created elements
        task_container.id = `${task.status}` + "_" + "taskContainer " + containerId;
        task_justify.id = `${task.status}` + "_" + "taskJustify " + containerId;
        done_icon.id = `${task.status}` + "_" + "doneIcon " + containerId;
        task_info_holder.id =
            `${task.status}` + "_" + "taskInfoHolder " + containerId;
        task_title.id = `${task.status}` + "_" + "taskTitle " + containerId;
        task_desc.id = `${task.status}` + "_" + "taskDesc " + containerId;
        task_priority.id = `${task.status}` + "_" + "taskPriority " + containerId;
        task_edit_close_holder.id =
            `${task.status}` + "_" + "taskEditCloseHolder " + containerId;
        task_edit.id = `${task.status}` + "_" + "taskEdit " + containerId;
        task_close.id = `${task.status}` + "_" + "taskClose " + containerId;

        //  appenchild to task holder based on status
        if (task.delete == false) {
            if (task.status === "todo") {
                Todo_tasks.appendChild(task_container);
            }
            if (task.status === "inprogress") {
                Inprogress_tasks.appendChild(task_container);
            }
            if (task.status === "stuck") {
                Stuck_tasks.appendChild(task_container);
            }
            if (task.status === "done") {
                Done_tasks.appendChild(task_container);

                //done button function
                done_icon.style.backgroundColor = "rgb(100, 223, 223)";
            }
        }

        done_icon.addEventListener("click", () => {
            task.status = "done";
            console.log(task.status);
            render();
        });

        //close button function
        task_close.addEventListener("click", () => {
            task.delete = true;
            render();
        });

        //edit button function
        task_edit.addEventListener("click", () => {
            AddTaskVisible();
            TitleRef.value = task.title;
            DescriptionRef.value = task.description;
            StatusRef.value = task.status;
            PriorityRef.value = task.priority;
            render();
            task.delete = true;
        });

        //Counting tasks by status
        const Status = task.status;
        if (task.delete == false) {
            //sorting hesgiig chatGDP-s huulav
            CountByStatus[Status] = (CountByStatus[Status] || 0) + 1;
            console.log(CountByStatus);
        }
        //drag and drop section
        task_container.addEventListener("dragstart", dragStart);
    });

    // add drag and drop function
    const containers = document.getElementsByClassName("container");

    for (let n = 0; n < containers.length; n++) {
        containers[n].addEventListener("dragover", dragOver);
        containers[n].addEventListener("drop", dropItem);
        console.log(containers[n].id);
    }

    //Presenting number of tasks based on status value
    const TaskNumbers = document.getElementsByClassName("TaskNumbers");
    const valueStatusArray = Object.values(CountByStatus);

    for (let i = 0; i < TaskNumbers.length; i++) {
        TaskNumbers[i].textContent = valueStatusArray[i];
    }
};

//drag and drop functions
const dragStart = (e) => {
    console.log("dragging", e.target.id);
    e.dataTransfer.setData("text/plain", e.target.id);
};

const dragOver = (e) => {
    e.preventDefault();
    console.log("dragged over");
};

const dropItem = (e) => {
    e.preventDefault();
    const dropId = e.dataTransfer.getData("text/plain");
    console.log("dropId", dropId);
    const draggable = document.getElementById(dropId);

    const idOfTaskHolder = e.target.id;
    const findIndexOfID = idOfTaskHolder.indexOf("_");
    const ReStatusValue = idOfTaskHolder.slice(0, findIndexOfID).toLowerCase();

    const idOfTaskIndex = dropId.split(" ").pop();
    console.log(idOfTaskIndex);
    console.log(ReStatusValue);

    state.tasks[idOfTaskIndex].status = ReStatusValue;

    render();
};

AddTaskButtonRef.addEventListener("click", GetTaskInfo);
