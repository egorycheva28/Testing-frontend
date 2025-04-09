import './App.css';
import ToDoList from './components/toDoList';
import ToDoListContainer from './components/toDoListContainer';

function App() {
  return (
    <div className="App">
      <div className='container'>
        <ToDoListContainer/>
      </div>
    </div>
  );
}

export default App;
