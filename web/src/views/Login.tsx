import { Button } from '@mantine/core'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useDecksterStore from 'stores'
import styled from 'styled-components'
import Flex from '../components/Flex'

const Login = () => {
  const { userInfo } = useDecksterStore()
  let navigate = useNavigate()

  const loginHandler = () => {
    window.open('/oauth/login', '_self')
  }

  useEffect(() => {
    if (userInfo) {
      navigate('/editor', { replace: true })
    }
  }, [userInfo])

  return (
    <Wrap justify="center" align="center">
      <Content column justify="center" align="center">
        <Button size="md" onClick={loginHandler}>
          Sign in with Google
        </Button>
      </Content>
    </Wrap>
  )
}

const Content = styled(Flex)`
  max-width: 600px;
  h1 {
    margin: 0;
  }
  p {
    margin: 0;
    font-size: 1.618rem;
  }
`

const Wrap = styled(Flex)`
  width: 100vw;
  height: 100vh;
`
export default Login
