import React, {useState} from 'react'
import { Button, Input, InputGroup } from 'reactstrap'
import './edit-extension.css'
import {TitleDueDateEditor} from './title-dueDate-editor'
import {UrgencySlider} from './urgency-slider'

//back button shouldn't save colours.
//scrolling problem that hides input.

export const EditExtension = ({ todo, todoUpdater}) => {
  const { infoModal, title,dueDate } = todo
  const [title2, setTitle] = useState("");
  const [date, setDate] = useState("");
  return (
    <div>
      {
        infoModal && (
          <div className='edit-extension'>
            <div className="editors">
              <TitleDueDateEditor setTitle={title=>setTitle(title)} setDate={date=>setDate(date)} savedDueDate={dueDate} savedTitle={title}/>
              <div className="right-side">
                <div className="circles">
                  <div className="red-circle" onClick={_ => todoUpdater({ color: 'red' })}/>
                  <div className="yellow-circle" onClick={_ => todoUpdater({ color: 'yellow' })}/>
                  <div className="green-circle" onClick={_ => todoUpdater({ color: 'green' })}/>
                  <div className="blue-circle" onClick={_ => todoUpdater({ color: 'blue' })} />  
                  <div className="purple-circle" onClick={_ => todoUpdater({ color: 'purple' })} />
                  <div className="brown-circle" onClick={_ => todoUpdater({ color: 'brown' })} />
                </div>
                <div className="status-editor-container">
                  <UrgencySlider todoUpdater={todoUpdater}/>
                  </div>
              </div>
            </div>
            
            <Button color="secondary" onClick={_ => todoUpdater({ infoModal: false})}>
              Back
            </Button>
            <Button color="secondary" onClick={_ => todoUpdater({ infoModal: false, title: title2, dueDate: date })}>
              Save
            </Button>
          </div>
        )
      }
    </div>
  )
}