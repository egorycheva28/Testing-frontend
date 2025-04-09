import Modal from 'react-modal';
import React, { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import { incompleteTaskThunkCreator, completeTaskThunkCreator, deleteTaskThunkCreator, getTasksThunkCreator, editTaskThunkCreator, getTaskThunkCreator, changeStatusThunkCreator } from '../reducers/toDoListReducer';
import "./toDoList.css";

Modal.setAppElement('#root');

function ToDoListItem(props) {
    const formatDate = (date) => {
        if (!date) return null;
        return new Date(date).toLocaleDateString("ru-RU");
    };

    const priorityTranslate = {
        0: "Low",
        1: "Medium",
        2: "High",
        3: "Critical"
    };

    const priorityReturnTranslate = {
        "Low": 0,
        "Medium": 1,
        "High": 2,
        "Critical": 3
    };

    const statusTranslate = {
        0: "Active",
        1: "Completed",
        2: "Overdue",
        3: "Late"
    };

    const dispatch = useDispatch()
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [name, setName] = useState(props.name);
    const [description, setDescription] = useState(props.description);
    const [deadline, setDeadline] = useState(props.deadline);
    const [priority, setPriority] = useState(priorityTranslate[props.priority]);
    const [backgroundTask, setBackgroundTask] = useState({});

    const date = new Date;
    const deadlineDate = new Date(deadline);

    useEffect(() => {
        if (deadline != null && statusTranslate[props.status] == "Active" && (((deadlineDate >= date) && (deadlineDate - date) < 2 * 24 * 60 * 60 * 1000) || (deadlineDate - date < 0))) {
            setBackgroundTask({ backgroundColor: "rgb(253, 197, 147)", borderRadius: "10px" });
        }
        else if (statusTranslate[props.status] == "Overdue") {
            setBackgroundTask({ backgroundColor: "rgb(251, 134, 130)", borderRadius: "10px" });
        }
        else {
            setBackgroundTask({});
        }

        const interval = setInterval(() => {
            dispatch(changeStatusThunkCreator(props.id));
        }, 3600000);

        return () => clearInterval(interval);

    }, [props.status, deadline, dispatch]);


    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const deleteTask = async () => {
        await dispatch(deleteTaskThunkCreator(props.id));
        await dispatch(getTasksThunkCreator(props.sort));

    };

    const completeTask = async () => {
        await dispatch(completeTaskThunkCreator(props.id));
        await dispatch(getTasksThunkCreator(props.sort));
    };

    const incompleteTask = async () => {
        await dispatch(incompleteTaskThunkCreator(props.id));
        await dispatch(getTasksThunkCreator(props.sort));
    };

    const save = async () => {
        await dispatch(editTaskThunkCreator(name, description, deadline, priorityReturnTranslate[priority], props.id));
        await dispatch(getTaskThunkCreator(props.id));
        await dispatch(getTasksThunkCreator(props.sort));
    };

    return (
        <div className='card' style={backgroundTask}>
            {(statusTranslate[props.status] == "Active" || statusTranslate[props.status] == "Overdue") ? (
                <img src="/point.jpeg" className='complete' onClick={completeTask} />
            ) : (
                <img src="/galka.png" className='complete' onClick={incompleteTask} />

            )}
            {deadline != null ? (
                <div style={{ display: 'flex', flexDirection: 'column' }} onClick={openModal}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <span style={{ margin: '0 5px', fontWeight: '700' }} >{props.name}</span>
                        <span> ({statusTranslate[props.status]})</span>
                    </div>
                    <div style={{display: 'flex', alignItems: 'center' , marginLeft: '5px' }}>
                        <span style={{ textDecoration: 'underline', marginRight:"5px" }}>Дедлайн: </span>
                        <span> { formatDate(props.deadline)}</span>
                    </div>
                </div>) : (
                <div onClick={openModal}>
                    <span style={{ margin: '0 5px', fontWeight: '700' }} >{props.name}</span>
                    <span> ({statusTranslate[props.status]})</span>
                </div>
            )}

            <div className='actions'>
                <img src="/edit.png" onClick={openModal} style={{ width: '50px' }} />
                <button onClick={deleteTask} style={{ background: 'none', border: 'none', fontSize: '44px', cursor: 'pointer' }}>&times;{ }</button>
            </div>
            <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={{ content: { width: '800px', height: '650px', margin: 'auto', borderRadius: '15px' } }}>
                <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <button onClick={closeModal} style={{ position: 'absolute', top: '10px', right: '15px', background: 'none', border: 'none', fontSize: '44px', cursor: 'pointer' }}>&times;{ }</button>
                    <div className='data'>
                        <label>Название:</label>
                        <input type='text' value={name} onChange={(e) => setName(e.target.value)} />

                        <label>Описание:</label>
                        <input type='text' value={description} onChange={(e) => setDescription(e.target.value)} />

                        <label>Дедлайн:</label>
                        <input type='date' value={deadline} onChange={(e) => setDeadline(e.target.value)} />

                        <label>Статус:</label>
                        <input value={statusTranslate[props.status]} disabled />

                        <label>Приоритет:</label>
                        <input type='text' value={priority} onChange={(e) => setPriority(e.target.value)} />

                        <label>Дата создания:</label>
                        <input value={formatDate(props.createDate)} disabled />

                        <label>Дата редактирования:</label>
                        <input value={formatDate(props.editDate)} disabled />
                    </div>
                    <div className="newTask">
                        <button className='save' onClick={save}>Сохранить</button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default ToDoListItem;