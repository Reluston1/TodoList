import React, {useState} from 'react'
import { Input, InputGroup, InputGroupAddon } from 'reactstrap'

// input is its own component to reRender itself
export const AddTodoInput = ({actions}) =>{
  let [ inputValue, setInputValue ] = useState('')

  return (
    <div>
      <InputGroup className='input-group'>
        <Input
          id='message'
          className='input'
          value={inputValue}
          placeholder="what is there todo?"
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
