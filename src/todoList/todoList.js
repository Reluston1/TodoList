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
let TodoAppStruct = new TodoListDataStructure()
export class TodoList extends React.PureComponent {
  state = {
    currentUser: null,
    reRender: 0,
    authModalOpen: false,
    arrayOfTodos: null
  }
  user = this.props.user
  componentDidMount(){
      //focus ref just for setting the listner
      firebase.database().ref(`users/${this.user.uid}/todos/`).on('value', _=>{
        //listener is triggered every time i add todo or update todo
        //rebuild array of focus todos
        TodoAppStruct.focusReferencePromise().then(focusRef=>{
          //find focus
          firebase.database().ref(focusRef).once('value', dataSnapshot=>{
            //build focus todos
            const todos = dataSnapshot.val()
            debugger
            if(todos){
              let reactTodos = 
                Object.keys(todos)
                .map(
                  todoId  => (
                    <Todo
                      style={{
                        x: todos[todoId].position.x,
                        y: todos[todoId].position.y,
                        position: todos[todoId].position.relative ? 'relative' : 'absolute'  
                      }} 
                      todo={todos[todoId]}
                      TodoAppStruct={TodoAppStruct}
                      actions={this.actions}
                    />
                  )
                )
              this.setState({arrayOfTodos: reactTodos})
            }
          })
        })
      })
      firebase.database().ref(`users/${this.user.uid}/currentDirectoryLevels`).on('value', _=>{
        TodoAppStruct.focusReferencePromise().then(focusRef=>{
          firebase.database().ref(focusRef).once('value').then(
            (snapshot)=>{
              const todos = snapshot.val()
              debugger
              if(todos){
                let reactTodos = 
                  Object.keys(todos)
                  .map(
                    todoId  => (
                      <Todo
                        style={{
                          x: todos[todoId].position.x,
                          y: todos[todoId].position.y,
                          position: todos[todoId].position.relative ? 'relative' : 'absolute'  
                        }} 
                        todo={todos[todoId]}
                        TodoAppStruct={TodoAppStruct}
                        actions={this.actions}
                      />
                    )
                  )
                this.setState({arrayOfTodos: reactTodos})
              }
              else{
                this.setState({arrayOfTodos: null})
              }
            }
          )
        })
      }
    )
  }
  
 
  reRender(){
    this.setState({reRender:  this.state.reRender + 1})
  }

  focusUpdater(id) {
    TodoAppStruct.updateFocus(id)
    this.setState({reRender: this.state.reRender + 1})
  }
  addTodo(title) {
    TodoAppStruct.addTodo(title)
  }
  goInside(id) {
    TodoAppStruct.goInside(id)
  }

  goOutside() {
    TodoAppStruct.goOutside()
    this.setState({reRender:  this.state.reRender + 1}) 
  }

  breadcrumbsClickHandler(id){
    TodoAppStruct.breadcrumbsClickHandler(id)
    this.setState({reRender:  this.state.reRender + 1})
  }

  actions = {
    addTodo: title => this.addTodo(title),
    goInside: id => this.goInside(id),
    focusUpdater: id => this.focusUpdater(id),
    goOutside: _ => this.goOutside(),
    breadcrumbsClickHandler: id => this.breadcrumbsClickHandler(id)
  }
  //click todo steps: 
  /*
    set up a listener on CDL in db, when changed, grab the appropriate data from that many levels deep in the actual todo
    on click of a breadcrumb, update CDL in firebase,
    listener fired, grabing the approprate list of todos from db
    updating the state of `TodoList` to hold the new data causing a re-render and showing the correct todos
  */

  render(){
    debugger;
    return (
      <div className="todo-list-app">
      <button style={{width:'300px', height: '300px'}} onClick={_=>this.setState({authModalOpen: !this.state.authModalOpen})}> sign in </button>
      <AuthModal isOpen={this.state.authModalOpen} close={() => this.setState({authModalOpen: !this.state.authModalOpen})}/>
        <h1 className="helloMsg">Hello,{firebase.auth().currentUser && firebase.auth().currentUser.displayName}</h1>
        <div className="list-container">{this.state.arrayOfTodos}</div> 
        <Resizable className='bottom-drag-up'>
          <div className="separator"/>
          <div className="input-container">
            <AddTodoInput className='input' TodoAppStruct={TodoAppStruct} actions={this.actions} />
          </div>
          <div className="breadcrumbs">
            <BreadCrumbs className='breadcrumb' TodoAppStruct={TodoAppStruct} actions={this.actions} />
          </div>
        </Resizable>
      </div>
    )
  }
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