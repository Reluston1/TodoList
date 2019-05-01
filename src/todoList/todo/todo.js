import React, { useState } from 'react'
import './todo.css'
import Draggable from 'react-draggable';
import { EditExtension } from './edit-extension';
import menuIcon from './icon.png'
import Resizable from 're-resizable'
//clean up css
//position  sticky
//fix your css
//once you drag the flag that holds boolean shifts up list  should be false
// once you drag the div holding the todo in the css is still held in the list. 
//if two todos are on the same row then they still are restricted by the list 
//if todo goes to high then u lose trac, since if i press done it shifts up off the page
//when slicked done, then taken out off list div.
//on click its still one drag behind
//get rid of react strap people fint them selves 
// 3 visibility filters for completed all and undeone, and in all completed should be stratched through.

//finsih due dates fueature

export const Todo = ({ todo, TodoAppStruct, actions }) => {
  const { title,id, dueDate, color, completed, urgency,position } = todo


  const [reRender, setReRender] = useState(0)


  function updateTodo({ completed, title, dueDate, priority, infoModal, color, urgency, position }) {
    debugger;
    TodoAppStruct.updateTodo({ id, completed, title, dueDate, priority, infoModal, color, urgency, position })
    setReRender(reRender + 1)
  }
  const todoUpdater = ({ completed, title, dueDate, priority, infoModal, color, urgency, position }) => updateTodo({ completed, title, dueDate, priority, infoModal, color, urgency, position })
  return (
      <Draggable
        handle="strong"
        onStop={(e, location) => {
          const { x, y } = location;
          debugger;
          todoUpdater({position: { x, y, relative:false }})
        }}
        position={{ x: todo.position.x, y: todo.position.y }}
      >
        <div className={`todo-completed-${completed}`} style={{position: position}}>
          <strong><div className='drag-handler'>Drag Here</div></strong>
          <div className="todo">
            <Resizable
              className="left-side"
              defaultSize={{
                width: '100px',
                height: '118px'
              }}
               style={{ backgroundColor: `${color}` }}
            >
              <div className="circle-color" onClick={_ => todoUpdater({ completed: true })} style={urgency===null ? { backgroundColor: `${color}` }  : urgency === "HIGH" ? { backgroundColor: "red" } : urgency === "MED" ? { backgroundColor: "yellow" } : urgency === "LOW" ? { backgroundColor: "green" } : null}>
                <div className="done-text"> DONE? </div>
              </div>   
              <div className="line"></div>
            </Resizable> 
            
            
            <div className="dateColumn" onClick={_ => actions.goInside(id)}>
              <div className="date">
                {dueDate}
              </div>
                <Resizable
                  className='text'
                  defaultSize={{
                    width:'320px',
                    height:'200px',
                  }}
                >
                  {title}
                </Resizable>
            </div> 
            <div className="menu-extension" onClick={_ => todoUpdater({ infoModal: true })}>
                  <img src={menuIcon} alt="" className="menu"/>
            </div>
          </div>
          <EditExtension todoUpdater={todoUpdater} TodoAppStruct={TodoAppStruct} actions={actions} todo={todo} />
        </div>
      </Draggable>
      
  )
}
