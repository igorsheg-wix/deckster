import { Button } from '@mantine/core'
import React from 'react'
import styled from 'styled-components'
import Flex from '../components/Flex'
import Padder from '../components/Padder'

const Login = () => {
  const loginHandler = () => {
    window.open('/auth/google/login', '_self')
  }

  return (
    <>
      <Wrap justify="center" align="center">
        <Content column justify="center" align="center">
          <h1>Deckster</h1>
          <p>Create a great presentation deck - story first.</p>
          <Padder y={36} />
          <Button size="md" onClick={loginHandler}>
            Sign in with Google
          </Button>
        </Content>
      </Wrap>
    </>
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
