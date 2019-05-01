import React from 'react';
import { TodoList } from './todoList'
import './App.css';
import firebase from 'firebase'

var config = {
  apiKey: "AIzaSyCEr_MG14_9stvkMEipXA1_1g0wDQrEZuM",
  authDomain: "todo-list-4d698.firebaseapp.com",
  databaseURL: "https://todo-list-4d698.firebaseio.com",
  projectId: "todo-list-4d698",
  storageBucket: "todo-list-4d698.appspot.com",
  messagingSenderId: "698780991541"
};

firebase.initializeApp(config);



export class App extends React.PureComponent{
  state={
    currentUser: null,
    authStateChanged: false
  }
    

  componentDidMount(){
    firebase.auth().onAuthStateChanged(auth => { 
        this.setState({
          currentUser: auth,
          authStateChanged: true
        }) 
      }
    )
  }
    
  
  render(){
    const { authStateChanged, currentUser } = this.state
    return (
      <React.Fragment>
        {
          !authStateChanged 
          ? 
            <div>loading</div>
          :
            currentUser ? <TodoList user={currentUser} />
            :
            <div>please sign up</div>
        }
      </React.Fragment>
    )
  }
}

export default App;


