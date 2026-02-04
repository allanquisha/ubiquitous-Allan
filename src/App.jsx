import { useState, useEffect } from 'react'
import './App.css'

// 🎁 CUSTOMIZE YOUR GIF HERE! 🎁
// Just paste any GIF URL you want below:
const CELEBRATION_GIF = "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExOXl5MnJ5aHcxZjN5Y2JiYzl1bzNzMDZ2aWhqbTR0Y2o1eWpqdXdhYiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/vPzbDN4rBxuvtpSpzF/giphy.gif"

// 💌 CUSTOMIZE YOUR MESSAGE HERE! 💌
const SUCCESS_MESSAGE = "I can't wait for you to be my Valentine! <3 You've just made me the happiest papoi ever! 💖✨-Allan"

function App() {
  const [accepted, setAccepted] = useState(false)
  const [noPosition, setNoPosition] = useState({ left: '55%', top: '50%' })
  const [escapeCount, setEscapeCount] = useState(0)
  const [noButtonText, setNoButtonText] = useState('No 🙈')
  const [hearts, setHearts] = useState([])

  useEffect(() => {
    const interval = setInterval(() => {
      createHeart()
    }, 380)
    return () => clearInterval(interval)
  }, [])

  const createHeart = () => {
    const id = Date.now() + Math.random()
    const newHeart = {
      id,
      left: Math.random() * 100,
      emoji: Math.random() > 0.5 ? "❤️" : "💗",
      fontSize: Math.random() * 22 + 14,
      opacity: Math.random() * 0.5 + 0.4,
      duration: Math.random() * 3 + 4
    }
    setHearts(prev => [...prev, newHeart])
    setTimeout(() => {
      setHearts(prev => prev.filter(h => h.id !== id))
    }, 8000)
  }

  const handleNoHover = (e) => {
    if (escapeCount >= 5) {
      // After 5 escapes, turn it into Yes
      setNoButtonText('Yes! 💖')
      return
    }

    const card = e.currentTarget.closest('.card')
    const cardRect = card.getBoundingClientRect()
    const btnRect = e.currentTarget.getBoundingClientRect()

    const maxX = cardRect.width - btnRect.width - 20
    const maxY = cardRect.height - btnRect.height - 20

    const newLeft = Math.random() * maxX
    const newTop = Math.random() * maxY

    setNoPosition({ 
      left: `${newLeft}px`, 
      top: `${newTop}px` 
    })
    setEscapeCount(prev => prev + 1)
  }

  const handleNoClick = () => {
    if (escapeCount >= 5) {
      handleYesClick()
    }
  }

  const handleYesClick = () => {
    // Create confetti effect
    const count = 200
    const defaults = {
      origin: { y: 0.7 }
    }

    function fire(particleRatio, opts) {
      const particles = Math.floor(count * particleRatio)
      if (window.confetti) {
        window.confetti({
          ...defaults,
          ...opts,
          particleCount: particles,
        })
      }
    }

    fire(0.25, { spread: 26, startVelocity: 55 })
    fire(0.2, { spread: 60 })
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 })
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 })
    fire(0.1, { spread: 120, startVelocity: 45 })

    setAccepted(true)
  }

  if (accepted) {
    return (
      <div className="card success-card">
        <div className="success-content">
          <div className="emoji celebration-emoji">🎉💕🎉</div>
          <h2>Yay! You said Yes!</h2>
          <div className="gif-container">
            <img 
              src={CELEBRATION_GIF} 
              alt="Celebration"
              className="celebration-gif"
              crossOrigin="anonymous"
              loading="eager"
            />
          </div>
          <p className="success-message">
            {SUCCESS_MESSAGE}
          </p>
        </div>
        {hearts.map(heart => (
          <div
            key={heart.id}
            className="heart"
            style={{
              left: `${heart.left}vw`,
              fontSize: `${heart.fontSize}px`,
              opacity: heart.opacity,
              animationDuration: `${heart.duration}s`
            }}
          >
            {heart.emoji}
          </div>
        ))}
      </div>
    )
  }

  return (
    <>
      <div className="card">
        <div className="emoji">🐱❤️</div>
        <h2>Will you be my Valentine?</h2>

        <div className="buttons">
          <button 
            id="yes" 
            onClick={handleYesClick}
          >
            Yes 💖
          </button>
          <button 
            id="no"
            style={{
              left: noPosition.left,
              top: noPosition.top
            }}
            onMouseEnter={handleNoHover}
            onClick={handleNoClick}
          >
            {noButtonText}
          </button>
        </div>

        <div className="hint">
          {escapeCount >= 5 ? "Okay, okay... the button agrees! 😊" : "Some love stories don't allow 'no' ✨"}
        </div>
      </div>

      {hearts.map(heart => (
        <div
          key={heart.id}
          className="heart"
          style={{
            left: `${heart.left}vw`,
            fontSize: `${heart.fontSize}px`,
            opacity: heart.opacity,
            animationDuration: `${heart.duration}s`
          }}
        >
          {heart.emoji}
        </div>
      ))}
    </>
  )
}

export default App
