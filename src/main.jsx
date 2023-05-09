import React from "react";
import { createRoot } from 'react-dom/client'

const App = () => {
    return <h1>Hello from App</h1>
}

createRoot(document.querySelector('#root').render(<App />))