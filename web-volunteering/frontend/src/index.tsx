import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './styles/index.css'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <Router>
  <Routes>
    <Route path="*" element={<App />} />
  </Routes>
</Router>
)
