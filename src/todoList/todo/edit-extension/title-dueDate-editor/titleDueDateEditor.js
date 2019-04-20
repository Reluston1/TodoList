import React from 'react'
import { Input } from 'reactstrap'
//own component just for simplicity of edit extension

export const TitleDueDateEditor = ({setTitle, savedTitle,savedDueDate}) =>{
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
          placeholder={savedDueDate}
          type="text"
          onChange={e => {
            setTitle(e.target.value)
          }}
        />
        <label style={{ textAlign: 'center' }}>dueDate</label>
      </div>
    </div>
  ) 
}