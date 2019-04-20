import React, {useState} from 'react'
import { Input, InputGroup, InputGroupAddon } from 'reactstrap'
// input is its own component to reRender itself
export const AddTodoInput = ({actions, TodoAppStruct}) =>{
  let [ inputValue, setInputValue ] = useState('')
  
  console.log(TodoAppStruct.directoryNamesArray())
  return (
    <div>
      <InputGroup className='input-group'>
        <Input
          id='message'
          className='input'
          value={inputValue}
          placeholder={`what is there todo in ${TodoAppStruct.directoryNamesArray() ? TodoAppStruct.directoryNamesArray()[TodoAppStruct.directoryNamesArray().length-1] : 'Life'}`}
          onChange={e=>setInputValue(e.target.value)}
          onKeyPress={e=>{
            if(e.key === 'Enter'){
              actions.addTodo(inputValue)
              setInputValue('')
            }}
          }
        />
        <InputGroupAddon addonType="append" onClick={_ => {
          actions.addTodo(inputValue)
          setInputValue('')
        }}>
          add Todo
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}
