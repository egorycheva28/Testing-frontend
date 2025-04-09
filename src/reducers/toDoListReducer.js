import { toDoListApi } from "../Api/toDoListApi";

const ADD_TASK = "ADD_TASK";
const EDIT_TASK = "EDIT_TASK";
const DELETE_TASK = "DELETE_TASK";
const GET_TASK = "GET_TASK";
const GETTASKS = "GETTASKS";
const COMPLETE_TASK = "COMPLETE_TASK";
const INCOMPLETE_TASK = "INCOMPLETE_TASK";

let initialState = {
    //id: '',
    /*task: {
        id: '',
        name: '',
        description: '',
        deadline: '',
        status: '',
        priority: '',
        createTime: '',
        editTime: ''
    },*/
    tasks: []
}

const toDoListReducer = (state = initialState, action) => {
    let newState = { ...state };

    switch (action.type) {
        case ADD_TASK:
            //newState.id = action.id;
            return newState;
        case EDIT_TASK:
            return newState;
        case DELETE_TASK:
            return newState;
        case GET_TASK:
            // newState.task = action.task;
            return newState;
        case GETTASKS:
            newState.tasks = action.tasks;
            return newState;
        case COMPLETE_TASK:
            return newState;
        case INCOMPLETE_TASK:
            return newState;
        default:
            return newState;
    }
}

export function addTaskActionCreator(data) {
    return { type: ADD_TASK, id: data.id }
}
export function addTaskThunkCreator(name, description, deadline, priority) {
    return async (dispatch) => {
        if (!name) {
            alert("Введите задачу!");
            return;
        }
        if (name.length < 4) {
            alert("Длина задачи минимум 4 символа");
            return;
        }
        try {
            const data = await toDoListApi.addTask(name, description, deadline, priority);
            dispatch(addTaskActionCreator(data));
        }
        catch (error) {
            console.error("Ошибка:", error);
        }
    }
}

export function editTaskActionCreator(data) {
    return { type: EDIT_TASK }
}
export function editTaskThunkCreator(name, description, deadline, priority, id) {
    return async (dispatch) => {
        if (!name) {
            alert("Введите задачу!");
            return;
        }
        if (name.length < 4) {
            alert("Длина задачи минимум 4 символа");
            return;
        }
        try {
            const data = await toDoListApi.editTask(name, description, deadline, priority, id);
            dispatch(editTaskActionCreator(data));
        }
        catch (error) {
            console.error("Ошибка:", error);
        }
    }
}

export function deleteTaskActionCreator(data) {
    return { type: DELETE_TASK }
}
export function deleteTaskThunkCreator(id) {
    return async (dispatch) => {
        try {
            const data = await toDoListApi.deleteTask(id);
            dispatch(deleteTaskActionCreator(data));
        }
        catch (error) {
            console.error("Ошибка:", error);
        }
    }
}

export function getTaskActionCreator(data) {
    return { type: GET_TASK, task: data }
}
export function getTaskThunkCreator(id) {
    return async (dispatch) => {
        try {
            const data = await toDoListApi.getTask(id);
            dispatch(getTaskActionCreator(data));
        }
        catch (error) {
            console.error("Ошибка:", error);
        }
    }
}

export function getTasksActionCreator(data) {
    return { type: GETTASKS, tasks: data }
}
export function getTasksThunkCreator(sort) {
    return async (dispatch) => {
        try {
            const data = await toDoListApi.getTasks(sort);
            dispatch(getTasksActionCreator(data.tasks));
        }
        catch (error) {
            console.error("Ошибка:", error);
        }
    }
}

export function completeTaskActionCreator(data) {
    return { type: COMPLETE_TASK }
}
export function completeTaskThunkCreator(id) {
    return async (dispatch) => {
        try {
            const data = await toDoListApi.completeTask(id);
            dispatch(completeTaskActionCreator(data));
        }
        catch (error) {
            console.error("Ошибка:", error);
        }
    }
}

export function incompleteTaskActionCreator(data) {
    return { type: INCOMPLETE_TASK }
}
export function incompleteTaskThunkCreator(id) {
    return async (dispatch) => {
        try {
            const data = await toDoListApi.incompleteTask(id);
            dispatch(incompleteTaskActionCreator(data));
        }
        catch (error) {
            console.error("Ошибка:", error);
        }
    }
}

export function changeStatusActionCreator(data) {
    return { type: INCOMPLETE_TASK }
}
export function changeStatusThunkCreator(id) {
    return async (dispatch) => {
        try {
            const data = await toDoListApi.changeStatus(id);
            dispatch(changeStatusActionCreator(data));
        }
        catch (error) {
            console.error("Ошибка:", error);
        }
    }
}

export default toDoListReducer;