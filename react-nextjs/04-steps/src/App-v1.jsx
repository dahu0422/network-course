import { useState } from "react";

const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];

export default function App() {
  const [isOpen, setIsOpen] = useState(true)

  const [step, setStep] = useState(1)
  const handlePrevios = () => { if (step > 1) setStep((s) => step - 1) }
  const handleNext = () => { if (step < 3) setStep((s) => step + 1) }

  return (
    <>
      <button className="close" onClick={() => setIsOpen((is) => !is)}>
        &times;
      </button>

      {isOpen && <div className="steps">
        <div className="numbers">
          <div className={step >= 1 ? "active" : ""}>1</div>
          <div className={step >= 2 ? "active" : ""}>2</div>
          <div className={step >= 3 ? "active" : ""}>3</div>
        </div>

        <p className="message">Step: {step}: {messages[step - 1]}</p>

        <div className="buttons">
          <button style={{ background: "#7950f2", color: "#fff" }} onClick={handlePrevios}>Previous</button>
          <button style={{ background: "#7950f2", color: "#fff" }} onClick={handleNext}>Next</button>
        </div>
      </div>}

    </>
  )
}

