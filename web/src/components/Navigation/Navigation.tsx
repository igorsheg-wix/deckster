import { Button } from '@mantine/core'
import Flex from 'components/Flex'
import Padder from 'components/Padder'
import React from 'react'
import styled from 'styled-components'

const Navigation = () => {
  const publishHandler = () => {
    fetch('/api/slide').then((x) => x.json().then((data) => console.log(data)))
  }
  return (
    <Wrap align="center" justify="space-between">
      <Padder />
      <Flex align="center">
        <Button onClick={publishHandler}>Publish</Button>
      </Flex>
    </Wrap>
  )
}

export default Navigation

const Wrap = styled(Flex)`
  width: 100%;
  height: 96px;
  min-height: 96px;
  display: flex;
  padding: 60px;
  background: white;
  box-sizing: border-box;
  box-shadow: 0 1px 0 #ebebeb;
`
