import React, { useState } from 'react'
import { Todo } from './todo'
import './todoList.css'
import { TodoListDataStructure } from '../dataStuctures'
import { AddTodoInput } from './addTodoInput'
import { BreadCrumbs } from './breadcrumbs'
import Resizable from 're-resizable'
import firebase from 'firebase/app';
import {AuthModal} from './authModal/authModal'

//user change the size
//draggable and resizable
const TodoAppStruct = new TodoListDataStructure()
export const TodoList = () => {


  const [currentUser, setCurrentUser] = useState(null)
  const [reRender, reRenderSet] = useState(0)
  const [ authModalOpen, toggleAuthModal ] = useState(false)
  
 
  //instead of re redner say update history as a little string into an array, for a little bbetter meaning.
  //

  const activateOnAuthStateListener = () => firebase.auth().onAuthStateChanged(auth => {setCurrentUser(auth)}) 
  
  activateOnAuthStateListener()

  function focusUpdater(id) {
    TodoAppStruct.updateFocus(id)
    reRenderSet(reRender + 1)
  }
  function addTodo(title) {
    TodoAppStruct.addTodo(title)
    reRenderSet(reRender + 1)
  }
  function goInside(id) {
    TodoAppStruct.goInside(id)
    reRenderSet(reRender + 1)
  }
  function goOutside() {
    TodoAppStruct.goOutside()
    reRenderSet(reRender + 1)
  }
  function breadcrumbsClickHandler(id){
    TodoAppStruct.breadcrumbsClickHandler(id)
    reRenderSet(reRender + 1)
  }

  let actions = {
    addTodo: title => addTodo(title),
    goInside: id => goInside(id),
    focusUpdater: id => focusUpdater(id),
    goOutside: _ => goOutside(),
    breadcrumbsClickHandler: id => breadcrumbsClickHandler(id)
  }
  return (
    <div className="todo-list-app">
    <button style={{width:'300px', height: '300px'}} onClick={_=>toggleAuthModal(!authModalOpen)}> sign in </button>
     <AuthModal isOpen={authModalOpen} close={() => toggleAuthModal(!authModalOpen)}/>
      <h1 className="helloMsg">Hello,{currentUser && currentUser.email}</h1>
      <div className="list-container">
        {
          Object.values(
            TodoAppStruct.focusRef !== null ?
              TodoAppStruct.focusRef
              :
              TodoAppStruct.todos
          )
          .map(
            todo => todo ?
              <Todo todo={todo} TodoAppStruct={TodoAppStruct} actions={actions}/>
              : null
          )
        }
      </div> 
      <Resizable className='bottom-drag-up'>
        <div className="separator"/>
        <div className="input-container">
          <AddTodoInput className='input' TodoAppStruct={TodoAppStruct} actions={actions} />
        </div>
        <div className="breadcrumbs">
          <BreadCrumbs className='breadcrumb' TodoAppStruct={TodoAppStruct} actions={actions} />
        </div>
      </Resizable>
    </div>
  )
}



/*
<div className='todo-list'>
      <div className='list-container'>
        {
          Object.values(
            TodoAppStruct.focusRef !== null ?
              TodoAppStruct.focusRef
              :
              TodoAppStruct.todos
          )
            .map(
              todo => todo ?
                <Todo todo={todo} TodoAppStruct={TodoAppStruct} actions={actions} />
                : null
            )
        }
      </div>
      <AddTodoInput className='input' TodoAppStruct={TodoAppStruct} actions={actions} />
      <BreadCrumbs className='breadcrumb' TodoAppStruct={TodoAppStruct} actions={actions} />
    </div>
*/