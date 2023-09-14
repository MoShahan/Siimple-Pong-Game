const INITIAL_VELOCITY = 0.025
const VELOCITY_INCREASE = 0.00001

export default class Ball {
  constructor(ballElem) {
    this.ballElem = ballElem
    this.reset()
  }

  set x(val) {
    this.ballElem.style.setProperty("--x", val)
  }

  get x() {
    return parseFloat(getComputedStyle(this.ballElem).getPropertyValue("--x"))
  }

  set y(val) {
    this.ballElem.style.setProperty("--y", val)
  }

  get y() {
    return parseFloat(getComputedStyle(this.ballElem).getPropertyValue("--y"))
  }

  // gets position of the ball relative to the viewport
  rect() {
    return this.ballElem.getBoundingClientRect()
  }

  // updating the ball position
  update(delta, paddleRects) {
    this.x += this.direction.x * delta * this.velocity
    this.y += this.direction.y * delta * this.velocity
    this.velocity += delta * VELOCITY_INCREASE

    const rect = this.rect()
    if (rect.bottom >= window.innerHeight || rect.top <= 0) {
      this.direction.y *= -1
    }
    // if (rect.right >= window.innerWidth || rect.left <= 0) {
    //   this.direction.x *= -1
    // }

    if (paddleRects.some(r => isCollision(r, rect))) {
      this.direction.x *= -1
    }
  }

  reset() {
    this.x = 50
    this.y = 50
    this.direction = { x: 0 }
    while (Math.abs(this.direction.x) <= 0.2 || Math.abs(this.direction.x) >= 0.9) {
      const heading = randomNum(0, 2 * Math.PI)
      this.direction = { y: Math.sin(heading), x: Math.cos(heading) }
    }
    this.velocity = INITIAL_VELOCITY
  }
}

function randomNum(min, max) {
  return Math.random() * (max - min) + min
}

function isCollision(paddle, ball) {
  return paddle.left <= ball.right && paddle.right >= ball.left && paddle.top <= ball.bottom && paddle.bottom >= ball.top
}
