import React from 'react'
import Sliders from './Sliders'

const width = 300 // px
const height = 200 // px
const animationDuration = 500 // ms

const sliderContainerStyle = {
  width: `${width}px`,
  height: `${height}px`,
}

export default function App() {
  return (
    <div style={sliderContainerStyle}>
      <Sliders
        slides={'1234567'.split('')}
        mode={'gallery'}
        options={{
          containerStyle: { width, height },
          animationDuration,
        }}
      />
    </div>
  )
}
