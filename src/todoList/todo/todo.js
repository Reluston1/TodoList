import React, {useState} from 'react'
import './todo.css'
import { EditExtension } from './edit-extension';

export const Todo = ({ todo, TodoAppStruct, actions }) => {
  const { title, id, dueDate, color, completed,urgency } = todo
  const [urgencyEditor,setUrgency] = useState("LOW")
  
debugger;
  return (
    <div className={`node${completed}`} >
      <div className='todo'>
        {
          dueDate&& dueDate.length > 0 ? 
          <label className='status-label'>{ dueDate && dueDate }</label>
          :
          <div className='status-icon' style={urgencyEditor === "HIGH" ? {backgroundColor:"red"} : urgencyEditor === "MED" ? {backgroundColor:"yellow"} : urgencyEditor === "LOW" ? {backgroundColor:"green"} : null}></div>
        }
        <div className='edit-button' 
            onClick={_ => {
              actions.updateTodo({ id, infoModal: true })
            }}> edit </div>
        <div className='todo-title' 
          onClick={_ => {
            actions.goInside(id)
            }}> {title} </div>
        <div className='remove-button' onClick={_ => {
          actions.updateTodo({ id, completed: true })
          }}> done </div>
        <div className='status-icon' style={{ backgroundColor: `${color}` }}></div>
      </div>
      <EditExtension TodoAppStruct={TodoAppStruct} actions={actions} todo={todo} setUrgency={(a)=>{setUrgency(a)}} />
    </div>
  )
}
