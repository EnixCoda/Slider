import React from 'react'
import PropTypes from 'prop-types'
import getSingleSlider from './SingleSlider'
import getGallerySlider from './GallerySlider'

function getTouchCenter(touches) {
  return Array.from(touches)
    .map(({ clientX, clientY }) => ({
      clientX: clientX / touches.length,
      clientY: clientY / touches.length,
    }))
    .reduce((a, b) => ({
      clientX: a.clientX + b.clientX,
      clientY: a.clientY + b.clientY,
    }))
}

export default class Sliders extends React.Component {
  static propTypes = {
    options: PropTypes.shape({
      containerStyle: PropTypes.shape({
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired,
      }),
      animationDuration: PropTypes.number,
      mode: PropTypes.oneOf(['full', 'gallery'])
    })
  }

  static defaultProps = {
    animationDuration: 300,
    mode: 'full',
  }

  // the component supports sliding to left/right
  static directions = {
    left: 'LEFT',
    right: 'RIGHT',
  }

  static slidersStyle = {
    width: '100%',
    height: '100%',
    position: 'relative',
    overflow: 'hidden',
    border: '1px solid #999',
  }

  constructor() {
    super()
    this.state = {
      focusIndex: 0,
      direction: null,
    }
    this.touches = {
      start: null,
      end: null,
    }
  }

  componentWillMount() {
    const { mode, options } = this.props
    this.updateSliderComponent(mode, options)
  }

  componentWillReceiveProps({ mode, options }) {
    if (options !== this.props.options || mode !== this.props.mode) {
      this.updateSliderComponent(mode, options)
    }
  }

  updateSliderComponent(mode, options) {
    switch (mode) {
      case 'full':
      this.SliderComponent = getSingleSlider(options)
      break
      case 'gallery':
      this.SliderComponent = getGallerySlider(options)
      break
      default:
      throw Error('unexpected mode', mode)
    }
  }

  shift(direction) {
    const { slides, animationDuration } = this.props
    const { focusIndex } = this.state
    let shiftDelta = 0
    if (direction === Sliders.directions.right) shiftDelta = 1
    else if (direction === Sliders.directions.left) shiftDelta = -1
    const nextFocusIndex = (focusIndex + slides.length + shiftDelta) % slides.length
    this.setState({ direction })
    setTimeout(() => {
      this.setState({
        focusIndex: nextFocusIndex,
        direction: null,
      })
    }, animationDuration)
  }

  getSlidesInViewAmount() {
    const { mode = 'full' } = this.props
    switch (mode) {
      case 'full': return 1
      case 'gallery': return 3
      default: throw Error('unexpected mode', mode)
    }
  }

  onTouchStart = ({ touches }) => (this.touches.start = touches)
  onTouchMove = ({ touches }) => (this.touches.end = touches)
  onTouchEnd = () => {
    const { start, end } = this.touches
    // if not moved, do nothing
    if (!end) return
    const touchStart = getTouchCenter(start)
    const touchEnd = getTouchCenter(end)
    const direction =
      touchStart.clientX < touchEnd.clientX ? Sliders.directions.left : Sliders.directions.right
    this.shift(direction)
    this.touches.start = null
    this.touches.end = null
  }

  render() {
    const { slides } = this.props
    const { direction, focusIndex } = this.state
    const slidesInViewAmount = this.getSlidesInViewAmount()
    const renderWindowLength = slidesInViewAmount + Object.keys(Sliders.directions).length
    let slidesInViewStart = (focusIndex + slides.length - Math.floor((renderWindowLength - 1) / 2)) % slides.length
    const slidesForRender = slides.slice(slidesInViewStart, slidesInViewStart + renderWindowLength)
    if (slidesForRender.length < renderWindowLength) {
      slidesForRender.push(...slides.slice(0, renderWindowLength - slidesForRender.length))
    }

    let renderIndexShift = -Math.floor(renderWindowLength / 2)
    if (direction === Sliders.directions.left) renderIndexShift += 1
    else if (direction === Sliders.directions.right) renderIndexShift += -1

    return (
      <div
        style={Sliders.slidersStyle}
        onTouchStart={this.onTouchStart}
        onTouchMove={this.onTouchMove}
        onTouchEnd={this.onTouchEnd}
      >
        {slidesForRender.map((slide, i) => (
          <this.SliderComponent key={slide} shiftDelta={i + renderIndexShift} slide={slide} />
        ))}
      </div>
    )
  }
}
