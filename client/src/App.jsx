import './App.css'
import {Route, Routes} from 'react-router-dom'
import IndexPage from './pages/indexPage'
import LoginPage from './pages/LoginPage'
function App() {
  return (
    <Routes>
      <Route index element={<IndexPage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>

  )
}

export default App

//left off at 26:50.
