import React, { useState } from 'react'
import './addTodoInput.css'
import firebase from 'firebase'

export const AddTodoInput = ({ actions, TodoAppStruct }) => {

  let [inputValue, setInputValue] = useState('')

  function addTodo(){
    actions.addTodo(inputValue)
    setInputValue('')
  }

  window.f = firebase

  return (
    <div className='add-todo-container'>
        <input
          id='message'
          className='input'
          value={inputValue}
          placeholder={` What is there todo in ${TodoAppStruct.directoryNamesArray() ? TodoAppStruct.directoryNamesArray()[TodoAppStruct.directoryNamesArray().length - 1] : 'Life'}?`}
          onChange={e => setInputValue(e.target.value)}
          onKeyPress={e => {
            if (e.key === 'Enter') {
              actions.addTodo(inputValue)
              setInputValue('')
            }
          }}
        />
        <div addonType="append" className='submit' onClick={_ => addTodo()}>
          Add Todo
        </div>
    </div>
  )
}
