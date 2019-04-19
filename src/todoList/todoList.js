import React, { useState } from 'react'
import { Todo } from './todo'
import './todoList.css'
import { TodoListDataStructure } from '../dataStuctures/todos'
import { AddTodoInput } from './addTodoInput'
import backIcon from './back.png'

const TodoAppStruct = new TodoListDataStructure()

export const TodoList = () => {

  const [reRender, reRenderSet] = useState(0)

  function addTodo(title) {
    TodoAppStruct.addTodo(title)
    reRenderSet(reRender + 1)
  }
  function goInside(id) {
    TodoAppStruct.goInside(id)
    reRenderSet(reRender + 1)
  }
  function goOutside() {
    TodoAppStruct.goOutside()
    reRenderSet(reRender + 1)
  }
  debugger

  let actions = {
    addTodo: title => addTodo(title),
    goInside: id => goInside(id),
    goOutside: _ => goOutside()
  }
  return (
    <div className='todo-list'>
      <div className='list-container'>
        {
          Object.values(TodoAppStruct.focusRef !== null ? TodoAppStruct.focusRef : TodoAppStruct.todos).map(todo => todo ?
            <Todo todo={todo} TodoAppStruct={TodoAppStruct} actions={actions} /> : null)
        }
      </div>
      <AddTodoInput actions={actions} />
      {
        TodoAppStruct.cDL().length > 0 ?
          <img src={backIcon} onClick={() => { actions.goOutside() }} />
          : null
      }
      <div className='dl-shower'>
        {TodoAppStruct.directoryNamesToString()}
      </div>
    </div>
  )
}



