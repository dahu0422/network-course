import { useQuiz } from "../contexts/QuizContext";

function StartScreen() {
  const { numQuestions, dispatch } = useQuiz()
  return (
    <div className="start">
      <h2>Welcome to The React Quiz!</h2>
      <h3>{numQuestions} question to test your React mastery</h3>
      <button onClick={() => dispatch({ type: "start" })} className="btn btn-ui">
        Let's start
      </button>
    </div>
  );
}

export default StartScreen;
