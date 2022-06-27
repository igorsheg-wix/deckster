import React from 'react'
import { RenderElementProps } from 'slate-react'
import { Element as SlateElements } from 'slate'
import { EditorElementType, HeadingElement } from '../types'
import Heading from './Heading'
import Divider from './Divider'

type ComponentItem = (
  props: RenderElementProps & {
    element: SlateElements
  }
) => JSX.Element

const components: Record<string, ComponentItem> = {
  [EditorElementType.h]: (props) => <Heading {...props} />,
  [EditorElementType.hr]: (props) => <Divider {...props} />,
}

export function EditorElement(props: RenderElementProps) {
  const { attributes, children, element } = props

  console.log('Render Element ---->', element)

  const component = components[element.type] as ComponentItem | undefined

  if (component) {
    return component({ children, attributes, element })
  }

  return <p {...attributes}>{children}</p>
}
