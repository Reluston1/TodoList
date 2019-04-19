import React, {useState} from 'react'
import Slider from 'react-input-slider';

export const UrgencySlider = (todoUpdater)=>{
  const [sliderPosition, setSliderPosition] = useState(0)
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
  return(
    <div>
      <div className="urgency-status">
        <Slider
          styles={sliderPosition <= 33 ? styles.lowSlider : sliderPosition <= 66 ? styles.medSlider : styles.highSlider }
          axis="x"
          x={50}
          onChange={({ x }) => { 
            debugger
            setSliderPosition(x)
            todoUpdater({urgency: x <= 33 ? "LOW" : x <= 66 ? "MED" : "HIGH"})
            }}
        />
      </div>
      <label style={{ textAlign: 'center' }}>{sliderPosition <= 33 ? "LOW" : sliderPosition <= 66 ? "MED" : "HIGH"  } urgency</label>
    </div>
  )
}