const firebase = require('firebase')

export class TodoListDataStructure {
  constructor(){
    this.todos = {}
    this.focusRef = null;
    this.currentDirectoryLevels = []
    this.nextTodoId = 1;
  }
  // donot store infor modal in database, databse should not know that it is editing.
  addTodo(title){
    debugger
    if (!title){ return }
    const newTodo = {
      title,
      completed: false,
      priority: null,
      score:null,
      dueDate: null,
      infoModal: false,
      id : this.nextTodoId,
      color: 'white',
      urgency: null,
      position: {x: 0, y: 0, relative: true}
    }
    debugger
    this.focusReferencePromise().then(refString => {
      debugger
      firebase.database().ref(refString)
      .push(newTodo)
        .then(
          snap => {
            firebase.database().ref(refString + snap.key).update({id: snap.key})
          }
        )
    },
    e=>console.log(e)
    )
    
  }
  
  updateTodo({ id, completed, title, dueDate, priority, infoModal, color,urgency,position }) {
    const newTodo = {}
    if (id) {
      newTodo.id = id
    } 
    if(position){
      newTodo.position = position
    }
    if (title) {
      newTodo.title = title
    }
    if (dueDate !== undefined) {
      newTodo.dueDate = dueDate
    }
    if (urgency) {
      newTodo.urgency = urgency
    }
    if (urgency === "reset") {
      newTodo.urgency = null
    }
    if (priority) {
      newTodo.priority = priority
    }
   if (infoModal === false) {
      newTodo.infoModal = false
    }
    if (infoModal === true) {
      newTodo.infoModal = true
    }
    if (completed === false) {
      newTodo.completed = false
    }
    if (completed === true) {
      newTodo.completed = true
    }
    if (color) {
      newTodo.color = color
    }

    this.focusReferencePromise().then(refString=>{
      debugger;
      firebase.database().ref(refString + id).update(newTodo)
    })

  }
  goInside(id){
    firebase.database().ref(`users/${firebase.auth().currentUser.uid}/currentDirectoryLevels/`).push(id)
  }
  goOutside(){
    this.currentDirectoryLevels.pop()
  }
  todosData(){
    return this.todos
  }
  async focusReferencePromise(){
    const snapshot = await firebase.database().ref(`users/${firebase.auth().currentUser.uid}/currentDirectoryLevels/`).once('value')
    const val = snapshot.val()
    debugger
    if(!val){
      return `users/${firebase.auth().currentUser.uid}/todos/`
    }
    
    return Object.values(val).reduce(
      ({focusRefString}, todoId) => {
        focusRefString = focusRefString + `${todoId}/todos/`
        return {focusRefString}
      }
      ,
      { focusRefString: `users/${firebase.auth().currentUser ? firebase.auth().currentUser.uid : null}/todos/` }
    ).focusRefString
  }
  cDL(){
    return this.currentDirectoryLevels
  }
  //merge go inside go outside into one function. for simpler API.
  breadcrumbsClickHandler(id){
    //count how many times to go outside
    //grab lenght and grab index
    // let length = this.currentDirectoryLevels.length
    // let goOutsideCounter
    // if(id === null){
    //   goOutsideCounter = length 
    // }
    // else{
    //   let IdIndex = this.currentDirectoryLevels.reduce((acc,value,index,array)=>{
    //     if (value === id){
    //       acc.indexOfId = index
    //     }
    //     return acc
    //   }
    //   ,{indexOfId:null}).indexOfId
    //   goOutsideCounter = length - IdIndex - 1;  
    // }
    // while(goOutsideCounter > 0){
    //   this.goOutside()
    //   goOutsideCounter -= 1
    // }
  }
  directoryNamesToString(){
    // let x = this.currentDirectoryLevels[0] && this.currentDirectoryLevels[0]
    // let y = this.currentDirectoryLevels[0] !== undefined ? this.currentDirectoryLevels.reduce(({titleToString, focusRef},value,index,array)=>{
    //     titleToString = titleToString + focusRef.title + ' => '
    //     if(index !== array.length-1 && array.length > 1) {focusRef = focusRef.todos[array[index+1]]}
      
    //     return {titleToString, focusRef}
  
    //   },{titleToString: '', focusRef: this.todos[x]}).titleToString : null
    // return y
  }
  directoryNamesArray(){
    // let x = this.currentDirectoryLevels[0] && this.currentDirectoryLevels[0]
    // let y = this.currentDirectoryLevels[0] !== undefined : null
    // return y
  }

  allColours(){
    
  }
  displayData(){
    console.log("todos", this.todos, "focus-todos", this.focusRef, "directory levels", this.currentDirectoryLevels)
  }
}

