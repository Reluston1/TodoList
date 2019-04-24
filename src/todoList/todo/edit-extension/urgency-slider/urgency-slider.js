import React, {useState} from 'react'
import Slider from 'react-input-slider';
import './urgency-slider.css'

export const UrgencySlider = ({todoUpdater})=>{
  const [sliderPosition, setSliderPosition] = useState(0)
  let styles = {
    lowSlider:{
      track: {
        backgroundColor: 'green'
      },
      active: {
        backgroundColor: 'green',
      },
      thumb: {
        width: 50,
        height: 50,
        backgroundColor: 'lightgrey'
      }
    },
    medSlider: {
      track: {
        backgroundColor: 'yellow'
      },
      active: {
        backgroundColor: 'yellow',
      },
      thumb: {
        width: 50,
        height: 50,
        backgroundColor: 'lightgrey'
      }
    },
    highSlider: {
      track: {
        backgroundColor: 'red'
      },
      active: {
        backgroundColor: 'red',
            },
      thumb: {
        width: 50,
        height: 50,
        backgroundColor: 'lightgrey'
      }
    },
  }
  return(
    <div className="urgency-editor">
      <div className="urgency-status">
        <Slider
          styles={sliderPosition <= 33 ? styles.lowSlider : sliderPosition <= 66 ? styles.medSlider : styles.highSlider }
          axis="x"
          x={sliderPosition}
          onChange={ ( { x } ) => { setSliderPosition(x) } }
          onMouseUp={ ()=>todoUpdater( { urgency: sliderPosition <= 33 ? "LOW" : sliderPosition <= 66 ? "MED" : "HIGH" } ) } 
        />
        <button className="reset-urgency" onClick={()=>todoUpdater({urgency:"reset"})}>
            reset urgency
        </button>
      </div>
      <label style={{ textAlign: 'center' }}>{sliderPosition <= 33 ? "LOW" : sliderPosition <= 66 ? "MED" : "HIGH"  } urgency</label>
    </div>
  )
}