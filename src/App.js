import React, {useState} from 'react';
import { TodoList } from './todoList'
import {TodoListDataStructure} from './dataStuctures/todos'
import './App.css';


const todoAppStruct = new TodoListDataStructure()

export const App = _ => {
  const [reRender, reRenderSet] = useState(0)

  function addTodo(title){
    todoAppStruct.addTodo(title)
    reRenderSet(reRender +1)
  }
  function updateTodo({ id, completed, title, dueDate, priority, infoModal, color, urgency,x,y }){
      todoAppStruct.updateTodo({ id, completed, title, dueDate, priority, infoModal, color,urgency,x,y })
      reRenderSet(reRender +1)
  }
  function goInside(id){
    todoAppStruct.goInside(id)
    reRenderSet(reRender + 1)
  }
  function goOutside(){
    todoAppStruct.goOutside()
    reRenderSet(reRender + 1)
  }
  
  let actions = {
    addTodo: title=>addTodo(title),
    updateTodo: ({ id, completed, title, dueDate, priority, infoModal, color, urgency,x,y })=>updateTodo({ id, completed, title, dueDate, priority, infoModal, color, urgency,x,y }),
    goInside: id=>goInside(id),
    goOutside: _=>goOutside()
  }
  return<TodoList TodoAppStruct={todoAppStruct} actions={actions}/>
}

export default App;
