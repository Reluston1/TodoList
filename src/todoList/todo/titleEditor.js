import React from 'react'
import { Input } from 'reactstrap'
//own component just for simplicity of edit extension
export const TitleEditor = ({setTitle, savedTitle}) =>{
  return(
    <div className="title-due-date-editor-container">
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
  ) 
}