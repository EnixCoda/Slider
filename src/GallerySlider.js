import getSliderWithStyle from './getSliderWithStyle'

const getSliderStyle = ({ containerStyle: { height }, animationDuration }) => ({
  position: 'absolute',
  lineHeight: `${height}px`,
  fontSize: `${height / 3}px`,
  textAlign: 'center',
  transition: `all ${animationDuration}ms`,
  background: `#ddd`,
  border: `1px solid #666`,
  top: `50%`,
  width: `100%`,
  height: `100%`,
})
const getSlideStyleInWindow = ({ containerStyle: { width, height } }) => {
  const keys = [ 'left-gone', 'left', 'mid-left', 'center', 'mid-right', 'right', 'right-gone' ]
  const zIndexes = [0, 0, 0, 1, 0, 0, 0]
  // scale size
  const sizes = [60, 60, 60, 80, 60, 60, 60] // %
  // distance between slide's center and slider viewport center
  const offsets = [ -200, -100, 0, 50, 100, 200, 300] // %

  return keys.map((key, i) => ({
    style: {
      left: `${offsets[i]}%`,
      transform: `translate(-50%, -50%) scale(${sizes[i] / 100})`,
      zIndex: zIndexes[i],
    },
  }))
}

export default getSliderWithStyle(getSliderStyle, getSlideStyleInWindow)
