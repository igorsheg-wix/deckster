import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import App from './App'
import GlobalStyles from './consts/globalStyles'
import { createRoot } from 'react-dom/client'

const container = document.getElementById('root')
const root = createRoot(container!) // createRoot(container!) if you use TypeScript
root.render(
  <BrowserRouter>
    <GlobalStyles />
    <Routes>
      <Route path="/*" element={<App />} />
    </Routes>
  </BrowserRouter>
)
