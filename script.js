import Ball from "./Ball.js"
import Paddle from "./Paddle.js"

const ball = new Ball(document.getElementById("ball"))
const playerPaddle = new Paddle(document.getElementById("player-paddle"))
const computerPaddle = new Paddle(document.getElementById("computer-paddle"))
const playerScore = document.getElementById("player-score")
const computerScore = document.getElementById("computer-score")

let lastTime
const update = time => {
  if (lastTime != null) {
    const delta = time - lastTime
    ball.update(delta, [playerPaddle.rect(), computerPaddle.rect()])
    computerPaddle.update(delta, ball.y)
    const hue = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--hue"))
    document.documentElement.style.setProperty("--hue", hue + delta * 0.01)
    if (isLose()) handleLose()
  }

  lastTime = time
  window.requestAnimationFrame(update)
}

document.addEventListener("mousemove", e => {
  playerPaddle.position = getVH(e.y)
  if (playerPaddle.rect().top < 0) {
    playerPaddle.position = getVH(playerPaddle.rect().bottom - playerPaddle.rect().top) / 2
  }
  if (playerPaddle.rect().bottom > window.innerHeight) {
    playerPaddle.position = 100 - getVH(playerPaddle.rect().bottom - playerPaddle.rect().top) / 2
  }
})

window.requestAnimationFrame(update)

const isLose = () => {
  const rect = ball.rect()
  if (rect.right >= window.innerWidth || rect.left <= 0) {
    return true
  }
  return false
}

const handleLose = () => {
  const rect = ball.rect()
  if (rect.right >= window.innerWidth) {
    playerScore.textContent = parseInt(playerScore.textContent) + 1
  } else {
    computerScore.textContent = parseInt(computerScore.textContent) + 1
  }
  ball.reset()
  computerPaddle.reset()
}

const getVH = val => {
  return (val / window.innerHeight) * 100
}
