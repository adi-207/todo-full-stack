import React from 'react'
import './App.css';
import AddTodo from './components/AddTodo';
import Header from './components/Header';
import Todos from './components/Todos';
import { Provider } from './components/Context'

function App() {
  return (
    <Provider>
      <div className='app-container'>
        <Header></Header>
        <AddTodo></AddTodo>
        <Todos></Todos>
      </div>
    </Provider>
  );
}

export default App;
