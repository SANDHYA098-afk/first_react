import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ViewStory from './ViewStory.jsx'
import Profile from './Profile.jsx'
import Messages from './Messages.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ThemeProvider } from './ThemeContext.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/story/:id/:tot',
    element: <ViewStory />
  },
  {
    path: '/profile',
    element: <Profile />
  },
  {
    path: '/messages',
    element: <Messages />
  }
])

createRoot(document.getElementById('root')).render(
  <ThemeProvider>
    <RouterProvider router={router} />
  </ThemeProvider>
)