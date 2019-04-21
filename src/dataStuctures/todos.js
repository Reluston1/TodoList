export class TodoListDataStructure {
  constructor(){
    this.todos = {}
    this.focusRef = null;
    this.currentDirectoryLevels = []
    this.nextTodoId = 1;
  }
  addTodo(title){
    if (!title){ return }
    const newTodo = {
      title,
      completed: false,
      todos: {},
      priority: null,
      score:null,
      dueDate: null,
      infoModal: false,
      id : this.nextTodoId,
      color: 'white',
      urgency: "LOW",
      x: 0,
      y: 0,
    }
    let referenceToNewFocus = this.todos
    if( this.currentDirectoryLevels.length ){
      this.currentDirectoryLevels.forEach((value,index,array)=>{
        referenceToNewFocus = referenceToNewFocus[value].todos
      })
    }
    !this.currentDirectoryLevels.length ? this.todos[this.nextTodoId] = newTodo : referenceToNewFocus[this.nextTodoId] = newTodo
    this.nextTodoId += 1;
  }
  updateTodo({ id, completed, title, dueDate, priority, infoModal, color,urgency,x,y }) {
    const newTodo = {}
    if (id) {
      newTodo.id = id
    } 
    if(x){
      newTodo.x = x
    }
    if(y){
      newTodo.y = y
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
    this.focusRef = this.todos
    if( this.currentDirectoryLevels.length ){
      this.currentDirectoryLevels.forEach((value,index,array)=>{
        this.focusRef = this.focusRef[value].todos
      })
    }
    Object.assign(this.focusRef[id], newTodo)
  }

  goInside(id){
    this.currentDirectoryLevels.push(id)
    this.focusRef = this.todos
    if( this.currentDirectoryLevels.length ){
      this.currentDirectoryLevels.forEach((value,index,array)=>{
        this.focusRef = this.focusRef[value].todos
      })
    }
  }

  goOutside(){
    this.focusRef = this.todos
    if( this.currentDirectoryLevels.length ){
      this.currentDirectoryLevels.forEach((value,index,array)=>{
        if(index !== array.length-1) {this.focusRef = this.focusRef[value].todos}
      })
    }
    this.currentDirectoryLevels.pop()
  }
  todosData(){
    return this.todos
  }
  focusReference(){
    return this.focusRef
  }
  cDL(){
    return this.currentDirectoryLevels
  }
  updateFocus(id){
    debugger;
    //count how many times to go outside
    //grab lenght and grab index
    let length = this.currentDirectoryLevels.length
    let goOutsideCounter
    if(id === null){
      goOutsideCounter = length 
    }
    else{
      let IdIndex = this.currentDirectoryLevels.reduce((acc,value,index,array)=>{
        if (value === id){
          acc.indexOfId = index
        }
        return acc
      }
      ,{indexOfId:null}).indexOfId
      goOutsideCounter = length - IdIndex - 1;  
    }
    while(goOutsideCounter > 0){
      this.goOutside()
      goOutsideCounter -= 1
    }
  }
  directoryNamesToString(){
    let x = this.currentDirectoryLevels[0] && this.currentDirectoryLevels[0]
    let y = this.currentDirectoryLevels[0] !== undefined ? this.currentDirectoryLevels.reduce(({titleToString, focusRef},value,index,array)=>{
        titleToString = titleToString + focusRef.title + ' => '
        if(index !== array.length-1 && array.length > 1) {focusRef = focusRef.todos[array[index+1]]}
      
        return {titleToString, focusRef}
  
      },{titleToString: '', focusRef: this.todos[x]}).titleToString : null
    return y
  }
  directoryNamesArray(){
    let x = this.currentDirectoryLevels[0] && this.currentDirectoryLevels[0]
    let y = this.currentDirectoryLevels[0] !== undefined ? this.currentDirectoryLevels.reduce(({directoryArray, focusRef},value,index,array)=>{
        directoryArray.push(focusRef.title)
        if(index !== array.length-1 && array.length > 1) {focusRef = focusRef.todos[array[index+1]]}
      
        return {directoryArray, focusRef}
  
      },{directoryArray: [], focusRef: this.todos[x]}).directoryArray : null
    return y
  }

  allColours(){
    
  }
  displayData(){
    console.log("todos", this.todos, "focus-todos", this.focusRef, "directory levels", this.currentDirectoryLevels)
  }
}

