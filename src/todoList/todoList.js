import React,{useState} from 'react'
import { Input, InputGroup, InputGroupAddon } from 'reactstrap'
import { Todo } from './todo'
import Draggable from 'react-draggable';
import './todoList.css'
import backIcon from './back.png'


export const TodoList = ({TodoAppStruct, actions}) => {
  let [ inputValue, setInputValue ] = useState('')
  return (
      <div className='todo-list'>
        <div className='list-container'>
          {
            Object.values(TodoAppStruct.focusRef ? TodoAppStruct.focusRef : TodoAppStruct.todos).map(todo => todo ? 
            <Draggable 
            handle="strong"
            onDrag={(e,position)=>{
              debugger;
              const {x, y} = position;
              actions.updateTodo({ id:todo.id, x, y })
            }}
            position={{x: todo.x, y: todo.y}}      
            >
              <div >
                <strong className="cursor"><div className='drag-handler'>Drag Here</div></strong>
                <Todo  TodoAppStruct={TodoAppStruct} actions={actions} todo={todo}/>
              </div>
            </Draggable>  : null)
          }
        </div>
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
       {TodoAppStruct.cDL().length > 0 ?
          <img src={backIcon} onClick={()=>{actions.goOutside()}}/> 
        : null 
       }
       <div className='dl-shower'>
         {TodoAppStruct.directoryNamesToString()}
       </div>
      </div>
  )
}



