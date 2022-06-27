import React from 'react'
import { RenderElementProps } from 'slate-react'
import { HeadingElement } from '../types'

const Heading = (props: RenderElementProps) => {
  const { element, attributes, children } = props
  const el = React.createElement(`h${(element as HeadingElement).level}`, {
    attributes,
    children,
  })

  return el
}

export default Heading
