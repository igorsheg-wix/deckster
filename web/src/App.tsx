import React, { FC, useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { getCookie } from 'utils/cookie'
import useDecksterStore from './stores'
import Deckster from './views/Deckster'
import Login from './views/Login'

const App: FC = () => {
  const { set } = useDecksterStore()
  const navigate = useNavigate()
  const accessToken = getCookie('access_token')

  useEffect(() => {
    set((d) => {
      d.accessToken = accessToken
    })
  }, [document.cookie])

  useEffect(() => {
    if (accessToken && accessToken.length) {
      navigate('/feed')
    } else {
      navigate('/login')
    }
  }, [accessToken])

  return (
    <Wrap>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/feed" element={<Deckster />} />
      </Routes>
    </Wrap>
  )
}

const Wrap = styled.div`
  width: 100vw;
  height: 100vh;
`
export default App
