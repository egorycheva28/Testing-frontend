import { connect } from "react-redux";
import React from "react";
import ToDoList from "./toDoList";
import { getTasksThunkCreator } from "../reducers/toDoListReducer";

class MiddleToDoListComponent extends React.Component {
    //componentDidMount() {
      //  this.props.getTasksThunkCreator();
    //}
    render() {
        return (<ToDoList{...this.props} />)
    }
}

function mapStateProps(state) {
    return { toDoList: state.toDoList };
}

const ToDoListContainer = connect(mapStateProps, { getTasksThunkCreator })(MiddleToDoListComponent)

export default ToDoListContainer;