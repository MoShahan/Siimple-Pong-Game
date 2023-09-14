const SPEED = 0.02

export default class Paddle {
  constructor(paddleElem) {
    this.paddleElem = paddleElem
    this.reset()
  }

  set position(val) {
    this.paddleElem.style.setProperty("--position", val)
  }

  get position() {
    return parseFloat(getComputedStyle(this.paddleElem).getPropertyValue("--position"))
  }

  update(delta, ballHeight) {
    this.position += SPEED * delta * (ballHeight - this.position)

    const rect = this.rect()
    if (rect.top < 0) {
      this.position = getVH(rect.bottom - rect.top) / 2
    }
    if (rect.bottom > window.innerHeight) {
      this.position = 100 - getVH(rect.bottom - rect.top) / 2
    }
  }

  reset() {
    this.position = 50
  }

  rect() {
    return this.paddleElem.getBoundingClientRect()
  }
}

const getVH = val => {
  return (val / window.innerHeight) * 100
}
