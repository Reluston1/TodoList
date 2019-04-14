import React, {useState} from 'react'
import { Button, Input, InputGroup } from 'reactstrap'
import Slider from 'react-input-slider';
import './edit-extension.css'

export const EditExtension = ({ TodoAppStruct,actions, todo, setUrgency }) => {
  const { infoModal, id, dueDate, title } = todo
  const [state, setState] = useState({ x: 10 });
  let styles = {
    lowSlider:{
      track: {
        backgroundColor: 'green'
      },
      active: {
        backgroundColor: 'blue'
      },
      thumb: {
        width: 50,
        height: 50
      }
    },
    medSlider: {
      track: {
        backgroundColor: 'yellow'
      },
      active: {
        backgroundColor: 'blue'
      },
      thumb: {
        width: 50,
        height: 50
      }
    },
    highSlider: {
      track: {
        backgroundColor: 'blue'
      },
      active: {
        backgroundColor: 'red'
      },
      thumb: {
        width: 50,
        height: 50
      }
    },
  }
  return (
    <div>
      {
        infoModal && (
          <div className='edit-extension'>
            <InputGroup className='input-group'>
              <div className="title-editor-container">
                <Input
                  id='message'
                  className='input'
                  placeholder={title}
                  type="text"
                  onChange={e => actions.updateTodo({ id: id, title: e.target.value })}
                />
                <label style={{ textAlign: 'center' }}>title</label>
              </div>
              <div className="dueDate-editor-container">
                <Input
                  id='message'
                  className='input'
                  placeholder={dueDate}
                  type="text"
                  onChange={e => {
                    debugger
                    actions.updateTodo({ id, dueDate: e.target.value })}
                  }
                  onKeyPress={e=>{
                    debugger
                    if(e.key === 'Enter'){
                      actions.addTodo(e.target.value)
                    }}
                  }
                />
                <label style={{ textAlign: 'center' }}>dueDate</label>
              </div>
              <div className="status-editor-container">
                <div className="circles">
                  <div className="red-circle" onClick={_ => actions.updateTodo({ id, color: 'red' })}/>
                  <div className="yellow-circle" onClick={_ => actions.updateTodo({ id, color: 'yellow' })}/>
                  <div className="green-circle" onClick={_ => actions.updateTodo({ id, color: 'green' })}/>
                  <div className="blue-circle" onClick={_ => actions.updateTodo({ id, color: 'blue' })} />  
                  <div className="purple-circle" onClick={_ => actions.updateTodo({ id, color: 'purple' })} />
                  <div className="brown-circle" onClick={_ => actions.updateTodo({ id, color: 'brown' })} />
                </div>
                <label style={{ textAlign: 'center' }}>color</label>
                <div className="urgency-status">
                  <Slider
                    styles={state.x <= 33 ? styles.lowSlider : state.x <= 66 ? styles.medSlider : styles.highSlider }
                    axis="x"
                    x={state.x}
                    onChange={({ x }) => { 
                      debugger
                      if(x>15)
                      actions.updateTodo({id, urgency: x <= 33 ? "LOW" : x <= 66 ? "MED" : "HIGH"})
                      setState(state => ({ ...state, x }))
                      setUrgency(x <= 33 ? "LOW" : x <= 66 ? "MED" : "HIGH")
                      }}
                    onDragEnd={_=>{
                      actions.updateTodo({id, urgency: state.x <= 33 ? "LOW" : state.x <= 66 ? "MED" : "HIGH"})
                      setUrgency(state.x <= 33 ? "LOW" : state.x <= 66 ? "MED" : "HIGH")
                    }}
                  />
                </div>
                <label style={{ textAlign: 'center' }}>{state.x <= 33 ? "LOW" : state.x <= 66 ? "MED" : "HIGH"  } urgency</label>
                
              </div>

            </InputGroup>
            <Button color="secondary" onClick={_ => actions.updateTodo({ id, infoModal: false })}>
              Back
            </Button>
          </div>
        )
      }
    </div>
  )
}