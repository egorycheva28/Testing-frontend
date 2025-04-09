import axios from "axios";

const instance = axios.create({
    baseURL: 'https://localhost:7235/api/'
});

function addTask(name, description, deadline, priority) {
    const body = {
        name: name,
        description: description,
        deadline: deadline,
        priority: priority
    }
    return instance.post("add", body)
        .then(response => {
            if (response.status === 200) {
                console.log(response);
                return response.data;
            }
        })
        .catch(error => {
            console.log(error.response.data.error)
        });
}

function editTask(name, description, deadline, priority, id) {
    const body = {
        name: name,
        description: description,
        deadline: deadline,
        priority: priority
    }
    return instance.put(`edit/${id}`, body)
        .then(response => {
            if (response.status === 200) {
                console.log(response);
                return response.data;
            }
        })
        .catch(error => {
            console.log(error.response.data.error)
        });
}

function deleteTask(id) {
    return instance.delete(`${id}`)
        .then(response => {
            if (response.status === 200) {
                console.log(response);
                return response.data;
            }
        })
        .catch(error => {
            console.log(error.response.data.error)
        });
}

function getTask(id) {
    return instance.get(`${id}`)
        .then(response => {
            if (response.status === 200) {
                console.log(response);
                return response.data;
            }
        })
        .catch(error => {
            console.log(error.response.data.error)
        });
}

function getTasks(sort) {
    return instance.get(`?sort=${sort}`)
        .then(response => {
            if (response.status === 200) {
                console.log(response);
                return response.data;
            }
        })
        .catch(error => {
            console.log(error.response.data.error)
        });
}

function completeTask(id) {
    return instance.patch(`complete/${id}`)
        .then(response => {
            if (response.status === 200) {
                console.log(response);
                return response.data;
            }
        })
        .catch(error => {
            console.log(error.response.data.error)
        });
}

function incompleteTask(id) {
    return instance.patch(`incomplete/${id}`)
        .then(response => {
            if (response.status === 200) {
                console.log(response);
                return response.data;
            }
        })
        .catch(error => {
            console.log(error.response.data.error)
        });
}

function changeStatus(id) {
    return instance.patch(`changeStatus/${id}`)
        .then(response => {
            if (response.status === 200) {
                //console.log(response);
                return response.data;
            }
        })
        .catch(error => {
            console.log(error.response.data.error)
        });
}

export const toDoListApi = {
    addTask: addTask,
    editTask: editTask,
    deleteTask: deleteTask,
    getTask: getTask,
    getTasks: getTasks,
    completeTask: completeTask,
    incompleteTask: incompleteTask,
    changeStatus: changeStatus
}