import React from 'react'
import './titleDueDateEditor.css'
//own component just for simplicity of edit extension

//new Date('03/10/00') make sure valide date and is a duedate in the future.

export const TitleDueDateEditor = ({setTitle,setDate, savedTitle,savedDueDate}) =>{
  return(
    <div className="title-due-date-editor-container">
      <div className="title-editor">
        <input
          id='message'
          className='input-title'
          placeholder={savedTitle}
          type="text"
          onChange={e => {
            setTitle(e.target.value)
          }}
        />
      </div>
      <div className="due-date-editor">
        <input
          id='message'
          className='input-date'
          placeholder='DD/MM/YYYY'
          type="text"
          onChange={e => {
            setDate(e.target.value)
          }}
        />
      </div>
    </div>
  ) 
}