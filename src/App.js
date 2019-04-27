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

export const App = _ => <TodoList/>

export default App;
