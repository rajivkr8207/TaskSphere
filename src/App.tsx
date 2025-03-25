import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import TodoApp from './Pages/TodoApp/TodoApp'
import Navbar from './Components/Navbar'
import Weather from './Pages/WeatherApp/Weather'
import Main from './Pages/Main/Main'
import Notepad from './Pages/NotepadApp/Notepad'
import CalculatorApp from './Pages/CalculatorApp/CalculatorApp'
import TrackerApp from './Pages/ExpenseTracker/TrackerApp'

const App:React.FC = () => {
  return (
   <>
   <Router>
    <Navbar />
    <Routes>
    <Route path='/' element={<Main />} />
      <Route path='/todo' element={<TodoApp />} />
      <Route path='/weather' element={<Weather />} />
      <Route path='/tracker' element={<TrackerApp />} />
      <Route path='/calculator' element={<CalculatorApp />} />
      <Route path='/notepad' element={<Notepad />} />



    </Routes>
   </Router>
   </>
  )
}

export default App
