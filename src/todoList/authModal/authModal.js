import React, {useState} from 'react'
import firebase from 'firebase'
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'


export const AuthModal = ({ isOpen /* Boolean */, close /* () => {} */}) => {

  const [passwordInput, setPassword] = useState("")
  const [emailInput, setEmail] = useState("")

  function signIn({email,password}){
    try{
      firebase.auth().signInWithEmailAndPassword(email, password)
    }
    catch(error){
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
    }
  }
  function create({email,password}){
    try{
      firebase.auth().createUserWithEmailAndPassword(email, password)
    }
   catch(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
    }
  }

  return ( 
    <div>
      <Modal isOpen={isOpen} toggle={close} className='sign-in-modal'>
        <ModalHeader>Modal title</ModalHeader>
        <ModalBody>
          <input type="text" className='input' onChange={e=>{setEmail(e.target.value)}} placeholder='email'/>
          <input type="text" className='input' onChange={e=>{setPassword(e.target.value)}} placeholder='password'/>        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={
            _=>{
              signIn({email:emailInput, password:passwordInput})
              close()
            }
          }>
            Sign in
          </Button>{' '}
          <Button color="primary" onClick={
            _=>{
              create({email:emailInput, password:passwordInput})
              close()
            }
          }>
            Create
          </Button>{' '}
        </ModalFooter>
      </Modal>
    </div>
  )
}