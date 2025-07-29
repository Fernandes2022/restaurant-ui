import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { Provider } from 'react-redux'
import { store } from './connect/state/store.js'
import { BrowserRouter } from 'react-router-dom'
import Mode from './components/Mode.jsx'

// Set default theme to inherit device preference
// if (!localStorage.getItem('theme')) {
//   const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
//   localStorage.setItem('theme', prefersDark ? 'dark' : 'light');
// }

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Mode>
    <Provider store={store}>
      <div className="dark:bg-black dark:text-white">
      <BrowserRouter>
        <App />
      </BrowserRouter>
      </div>
    </Provider>
    </Mode>
  </StrictMode>,
)
