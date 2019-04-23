import React from 'react'
import { Input } from 'reactstrap'
//own component just for simplicity of edit extension

//new Date('03/10/00') make sure valide date and is a duedate in the future.

export const TitleDueDateEditor = ({setTitle,setDate, savedTitle,savedDueDate}) =>{
  return(
    <div className="title-due-date-editor-container">
      <div className="title-editor">
        <Input
          id='message'
          className='input'
          placeholder={savedTitle}
          type="text"
          onChange={e => {
            setTitle(e.target.value)
          }}
        />
        <label style={{ textAlign: 'center' }}>title</label>
      </div>
      <div className="due-date-editor">
        <Input
          id='message'
          className='input'
          placeholder='DD/MM/YYYY'
          type="text"
          onChange={e => {
            setDate(e.target.value)
          }}
        />
        <label style={{ textAlign: 'center' }}>dueDate</label>
      </div>
    </div>
  ) 
}