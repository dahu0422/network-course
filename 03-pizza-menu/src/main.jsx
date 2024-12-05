import React from "react"
import ReactDom from "react-dom"

function App() {
    return <h1>Hello React!</h1>
}

const root = ReactDom.createRoot(document.getElementById("root"))
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
)

// React before 18
// React.render(<App />)