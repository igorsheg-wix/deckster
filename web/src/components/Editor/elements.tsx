import React from 'react'
import { DecksterEditorElementProps, EditorElementTypes } from 'types'

const Element = (props: DecksterEditorElementProps) => {
  const { attributes, children, element } = props
  switch (element.type) {
    case EditorElementTypes['-']:
      return <ul {...attributes}>{children}</ul>
    case EditorElementTypes['#']:
    case EditorElementTypes['##']:
    case EditorElementTypes['###']:
    case EditorElementTypes['####']:
    case EditorElementTypes['#####']:
    case EditorElementTypes['######']:
      return React.createElement(`h${element.level}`, { attributes, children })
    default:
      return <p {...attributes}>{children}</p>
  }
}

export default Element
