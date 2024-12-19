import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
import App from './App.jsx'
import StarRating from './StarRating.jsx'
import { useState } from 'react'

function Test() {
  const [movieRating, setMovieRating] = useState(0)

  return (
    <div>
      <StarRating color="blue" maxRating={10} onSetRating={setMovieRating} />
      <p>This movie was rated {movieRating} stars</p>
    </div>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <StarRating maxRating={5} message={["Terrible", "Bad", "Okay", "Good", "Amazing"]} />
    <StarRating size={24} color="blue" className='' defaultRating={3} />
    <Test />
  </StrictMode>,
)
