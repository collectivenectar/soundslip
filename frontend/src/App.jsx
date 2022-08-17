import { BrowserRouter, Routes, Route} from 'react-router-dom'

// Pages & Components
import Navbar from './components/Navbar'
import Library from './pages/Library'
import Login from './pages/Login'
import Profile from './pages/Profile'


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar />
        <div className="pages">
          <Routes>
            <Route path="/" element={<Profile/>}></Route>
            <Route path="/library" element={<Library/>}></Route>
            <Route path="/login" element={<Login/>}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App
