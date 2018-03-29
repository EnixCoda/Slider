import React from 'react'

export default function getSliderWithStyle(getSliderStyle, getSlideStyleInWindow) {
  // with container's size(width, height) provided, you can
  // modify here to get whatever animation you want!

  return function sliderWithStyle(options) {
    const slideStyle = getSliderStyle(options)
    const slidingStyleWindow = getSlideStyleInWindow(options)
    const centerIndex = Math.floor(slidingStyleWindow.length / 2)

    return function Slider({ shiftDelta, slide }) {
      const { style } = slidingStyleWindow[centerIndex + shiftDelta]
      return <div style={Object.assign({}, slideStyle, style)}>{slide}</div>
    }
  }
}
