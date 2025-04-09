import Modal from 'react-modal';
import React from "react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import "./toDoList.css";
import ToDoListItem from "./toDoListItem";
import { addTaskThunkCreator, getTasksThunkCreator } from '../reducers/toDoListReducer';
import store from '../store/store';
Modal.setAppElement('#root');

const ToDoList = ({ toDoList }) => {
    const priorityReturnTranslate = {
        "Low": 0,
        "Medium": 1,
        "High": 2,
        "Critical": 3
    };

    const dispatch = useDispatch()
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [sort, setSort] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [deadline, setDeadline] = useState(null);
    const [priority, setPriority] = useState("");
    const storess = store.getState();

    const handleSortChange = (event) => {
        setSort(event.target.value);
    };

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const addTask = async () => {
        await dispatch(addTaskThunkCreator(name, description, deadline, priorityReturnTranslate[priority]));
        await dispatch(getTasksThunkCreator(sort));
        window.location.reload();
    };

    useEffect(() => {
        dispatch(getTasksThunkCreator(sort));
    }, [sort]);

    return (
        <div className='container'>
            <div className="to-do">
                <h1>To-Do-List</h1>
                <div>
                    <div className="newTask">
                        <button className='addTask' onClick={openModal}>Добавить задачу</button>
                    </div>
                    <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={{ content: { width: '800px', height: '400px', margin: 'auto', borderRadius: '15px' } }}>
                        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                            <button onClick={closeModal} style={{ position: 'absolute', top: '10px', right: '15px', background: 'none', border: 'none', fontSize: '44px', cursor: 'pointer' }}>&times;{ }</button>
                            <div className='data'>
                                <label>Название:</label>
                                <input type='text' value={name} onChange={(e) => setName(e.target.value)} placeholder='Введите название задачи' />
                                <label>Описание:</label>
                                <input type='text' value={description} onChange={(e) => setDescription(e.target.value)} placeholder='Введите описание задачи' />
                                <label>Дедлайн:</label>
                                <input type='date' value={deadline} onChange={(e) => setDeadline(e.target.value)} placeholder='Введите дедлайн задачи' />
                                <label>Приоритет:</label>
                                <input type='text' value={priority} onChange={(e) => setPriority(e.target.value)} placeholder='Введите приоритет задачи' />
                            </div>
                            <div className="newTask">
                                <button className='addTask' onClick={addTask}>Добавить</button>
                            </div>
                        </div>
                    </Modal>
                    <div className="sorting">
                        <label for="sortFilter" className="form-label">Сортировать</label>
                        <select className="form-select" id="sortFilter" name="sorting" onChange={handleSortChange}>
                            <option value="">—</option>
                            <option value="StatusAsc">По статусу задачи (сначала новые)</option>
                            <option value="StatusDesc">По статусу задачи (сначала старые)</option>
                            <option value="PriorityAsc">По приоритету задачи (сначала низший)</option>
                            <option value="PriorityDesc">По приоритету задачи (сначала наивысший)</option>
                            <option value="DeadlineAsc">По дедлайну задачи (по возрастанию)</option>
                            <option value="DeadlineDesc">По дедлайну задачи (по убыванию)</option>
                            <option value="CreateTimeAsc">По дате создания задачи (сначала старые)</option>
                            <option value="CreateTimeDesc">По по дате создания задачи (сначала новые)</option>
                        </select>
                    </div>
                </div>

                <div className="card-deck">
                    {
                        toDoList.tasks.map((value) => (
                            <ToDoListItem name={value.name} description={value.description} deadline={value.deadline} status={value.status} priority={value.priority} createDate={value.createTime} editDate={value.editTime} sort={sort} id={value.id} key={value.id} />
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default ToDoList;