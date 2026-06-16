import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

const renderApp = () => {
  const root = document.getElementById('root')
  const skeleton = document.getElementById('page-skeleton')
  if (skeleton) skeleton.style.display = 'none'
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )
}

const start = performance.now()
window.addEventListener('load', () => {
  const elapsed = performance.now() - start
  const delay = Math.max(0, 1000 - elapsed)
  setTimeout(renderApp, delay)
})
