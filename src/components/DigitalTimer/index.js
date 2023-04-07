import {Component} from 'react'

import './index.css'

const pauseImgUrl =
  'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
const startImgUrl = 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
const resetImgUrl =
  'https://assets.ccbp.in/frontend/react-js/reset-icon-img.png'

class DigitalTimer extends Component {
  state = {
    isTimeRunning: false,
    ttbcd: 25,
    minutes: 25,
    seconds: 0,
    displayTime: '25:00',
    isInSession: false,
  }

  componentDidMount() {
    const {isTimeRunning} = this.state
    if (isTimeRunning === true) {
      this.timerId = setInterval(this.countDown, 1000)
    }
  }

  countDown = () => {
    const {minutes, seconds} = this.state
    let count = minutes * 60 + seconds // 25 minutes in seconds
    count -= 1
    const minute = Math.floor(count / 60)
    const second = count % 60
    // const display = minute + ':' + (second < 10 ? '0' : '') + second
    const display = `${minute}:${second < 10 ? '0' : ''}${second}`
    this.setState({minutes: minute, seconds: second, displayTime: display})
    console.log(display)

    //   if (count === 0) {
    //     clearInterval(timer)
    //   }
  }

  onClickPause = () => {
    clearInterval(this.timerId)
    this.setState({isTimeRunning: false})
  }

  onResetClick = () => {
    if (this.timerId) {
      clearInterval(this.timerId)
    }
    this.setState({
      minutes: 25,
      seconds: 0,
      displayTime: '25:00',
      ttbcd: 25,
      isTimeRunning: false,
      isInSession: false,
    })
  }

  onIncrement = () => {
    const {ttbcd} = this.state
    this.setState(preState => ({
      ttbcd: preState.ttbcd + 1,
      minutes: preState.minutes + 1,
      displayTime: `${ttbcd + 1}:00`,
    }))
  }

  onDecrement = () => {
    const {ttbcd} = this.state
    if (ttbcd > 0) {
      this.setState(preState => ({
        ttbcd: preState.ttbcd - 1,
        minutes: preState.minutes - 1,
        displayTime: `${ttbcd - 1}:00`,
      }))
    }
  }

  onToggleStartOrPause = () => {
    const {isTimeRunning} = this.state
    if (isTimeRunning) {
      clearInterval(this.timerId)
      this.setState(preState => ({
        isTimeRunning: false,
      }))
    } else {
      this.setState(preState => ({
        isTimeRunning: true,
        isInSession: true,
      }))
      this.timerId = setInterval(this.countDown, 1000)
    }
  }

  render() {
    const {isTimeRunning, ttbcd, displayTime, isInSession} = this.state
    return (
      <div className="app_container">
        <h1 className="heading">Digital Timer</h1>
        <div className="content_Container">
          <div className="timerAndImage">
            <div className="timer">
              <h1 className="countdown">{displayTime}</h1>
              <p> {isTimeRunning ? 'Running' : 'Paused'}</p>
            </div>
          </div>
          <div className="timeSetting_container">
            <div className="startAndReset_Set">
              <div className="startORPause">
                <button type="button" onClick={this.onToggleStartOrPause}>
                  <img
                    src={isTimeRunning ? pauseImgUrl : startImgUrl}
                    alt={isTimeRunning ? 'pause icon' : 'play icon'}
                    className="images"
                  />
                  <p>{isTimeRunning ? 'Pause' : 'Start'}</p>
                </button>
              </div>

              <div className="reset">
                <button type="button" onClick={this.onResetClick}>
                  <img src={resetImgUrl} alt="reset icon" className="images" />

                  <p>Reset</p>
                </button>
              </div>
            </div>
            <p className="para">Set Timer limit</p>
            <div className="setTime">
              {isTimeRunning || isInSession ? (
                <button type="button" disabled>
                  <p className="countdown">-</p>
                </button>
              ) : (
                <button type="button" onClick={this.onDecrement}>
                  <p className="countdown">-</p>
                </button>
              )}

              <p className="time"> {ttbcd} </p>

              {isTimeRunning || isInSession ? (
                <button type="button" disabled>
                  <p className="countdown">+</p>
                </button>
              ) : (
                <button type="button" onClick={this.onIncrement}>
                  <p className="countdown">+</p>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
