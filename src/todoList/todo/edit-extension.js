import React, {useState} from 'react'
import { Button, Input, InputGroup } from 'reactstrap'
import './edit-extension.css'
import {TitleEditor} from './titleEditor'
import {UrgencySlider} from './urgency-slider'

export const EditExtension = ({ todo, todoUpdater}) => {
  const { infoModal, title } = todo
  const [title2, setTitle] = useState("");
  debugger;
  return (
    <div>
      {
        infoModal && (
          <div className='edit-extension'>
            <InputGroup className='input-group'>
              <TitleEditor setTitle={_=>{setTitle(_)}} savedTitle={title}/>
              <div className="status-editor-container">
                <div className="circles">
                  <div className="red-circle" onClick={_ => todoUpdater({ color: 'red' })}/>
                  <div className="yellow-circle" onClick={_ => todoUpdater({ color: 'yellow' })}/>
                  <div className="green-circle" onClick={_ => todoUpdater({ color: 'green' })}/>
                  <div className="blue-circle" onClick={_ => todoUpdater({ color: 'blue' })} />  
                  <div className="purple-circle" onClick={_ => todoUpdater({ color: 'purple' })} />
                  <div className="brown-circle" onClick={_ => todoUpdater({ color: 'brown' })} />
                </div>
                <label style={{ textAlign: 'center' }}>color</label>
                <UrgencySlider todoUpdater={todoUpdater}/>
              </div>

            </InputGroup>
            <Button color="secondary" onClick={_ => todoUpdater({ infoModal: false})}>
              Back
            </Button>
            <Button color="secondary" onClick={_ => todoUpdater({ infoModal: false, title: title2 })}>
              Save
            </Button>
          </div>
        )
      }
    </div>
  )
}