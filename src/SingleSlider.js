import getSliderWithStyle from './getSliderWithStyle'

const getSliderStyle = ({ containerStyle: { width, height }, animationDuration }) => ({
  position: 'absolute',
  width: `${width}px`,
  height: `${height}px`,
  lineHeight: `${height}px`,
  fontSize: `${height / 2}px`,
  textAlign: 'center',
  transition: `all ${animationDuration}ms`,
})
const getSlideStyleInWindow = () => [
  {
    key: 'left-gone',
    style: {
      left: `-200%`,
    },
  },
  {
    key: 'left',
    style: {
      left: `-100%`,
    },
  },
  {
    key: 'center',
    style: {
      left: `0`,
    },
  },
  {
    key: 'right',
    style: {
      left: `100%`,
    },
  },
  {
    key: 'right-gone',
    style: {
      left: `200%`,
    },
  },
]
export default getSliderWithStyle(getSliderStyle, getSlideStyleInWindow)
