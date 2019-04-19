import React, {useState} from 'react'
import './todo.css'
import Draggable from 'react-draggable';
import { EditExtension } from './edit-extension';

export const Todo = ({ todo, TodoAppStruct, actions }) => {
  const { title, id, dueDate, color, completed,urgency } = todo
  const [reRender,setReRender] = useState(0)

  function updateTodo({ id, completed, title, dueDate, priority, infoModal, color, urgency, x, y }) {
    TodoAppStruct.updateTodo({ id, completed, title, dueDate, priority, infoModal, color, urgency, x, y })
    setReRender(reRender + 1)
  }
  const todoUpdater = ({ completed, title, dueDate, priority, infoModal, color, urgency, x, y }) => updateTodo({ id, completed, title, dueDate, priority, infoModal, color, urgency, x, y })

  debugger;
  return (
    <div className={`node${completed}`} >
      <Draggable 
        handle="strong"
        onDrag={(e,position)=>{

          const {x, y} = position;
          todoUpdater({ x, y })
        }}
        position={{x: todo.x, y: todo.y}}      
      >
        <div>
          <strong className="cursor"><div className='drag-handler'>Drag Here</div></strong>
          <div className='todo'>
            {
              dueDate&& dueDate.length > 0 ? 
              <label className='status-label'>{ dueDate && dueDate }</label>
              :
              <div className='status-icon' style={urgency === "HIGH" ? {backgroundColor:"red"} : urgency === "MED" ? {backgroundColor:"yellow"} : urgency === "LOW" ? {backgroundColor:"green"} : null}></div>
            }
            <div className='edit-button' 
                  onClick={_ => {
                    todoUpdater({ infoModal: true })
                  }}> edit </div>
            <div className='todo-title' 
                onClick={_ => {
                  actions.goInside(id)
                  }}> {title} </div>
            <div className='remove-button' onClick={_ => {
              todoUpdater({ completed: true })
                }}> done </div>
            <div className='status-icon' style={{ backgroundColor: `${color}` }}></div>
            </div>
            <EditExtension todoUpdater={todoUpdater}TodoAppStruct={TodoAppStruct} actions={actions} todo={todo} />
          </div>
      </Draggable> 
    </div>    
  )
}
