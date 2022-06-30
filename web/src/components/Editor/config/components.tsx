import { PlatePluginComponent, ELEMENT_H1, ELEMENT_HR } from '@udecode/plate'
import React from 'react'
import { DashMenuElement } from '../components/DashMenu/DashMenu'
import { HeadingElement } from '../components/Heading/Heading'
import { HorizontalLineElement } from '../components/HorizontalLine/HorizontalLine'
import { ELEMENT_DASHMENU } from '../Editor.types'

export const components: Record<string, PlatePluginComponent<any>> = {
  [ELEMENT_H1]: (props) => HeadingElement({ as: 'h1', ...props }),
  [ELEMENT_HR]: HorizontalLineElement,
  [ELEMENT_DASHMENU]: DashMenuElement,
}
