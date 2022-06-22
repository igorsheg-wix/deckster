import { Button } from '@mantine/core'
import React, { FC } from 'react'
import { getCookie } from 'utils/cookie'

const Feed: FC = () => {
  const loginHandler = () => {
    console.log(getCookie('access_token'))
    fetch('/api/me').then((x) => x.json().then((res) => console.log(res)))
  }

  return (
    <div>
      <Button size="md" onClick={loginHandler}>
        Click me
      </Button>
    </div>
  )
}

export default Feed
