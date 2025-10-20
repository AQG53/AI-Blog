import React from 'react'
import { Route, Routes } from 'react-router'
import { Toaster } from 'react-hot-toast'
import Prompt from './pages/Prompt'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Prompt />} />
      </Routes>
      <Toaster />
    </div>
  )
}

export default App