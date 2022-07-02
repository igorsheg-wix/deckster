import {
  ELEMENT_H1,
  ELEMENT_H2,
  ELEMENT_H3,
  ELEMENT_H4,
  ELEMENT_H5,
  ELEMENT_H6,
  ELEMENT_HR,
  PlatePluginComponent,
} from '@udecode/plate'
import { DashMenuElement } from '../components/DashMenu/EditorElement'
import { HeadingElement } from '../components/Heading/Heading'
import { HorizontalLineElement } from '../components/HorizontalLine/HorizontalLine'
import { ELEMENT_DASHMENU_INPUT } from '../Editor.types'

export const components: Record<string, PlatePluginComponent<any>> = {
  [ELEMENT_H1]: (props) => HeadingElement({ as: 'h1', ...props }),
  [ELEMENT_H2]: (props) => HeadingElement({ as: 'h2', ...props }),
  [ELEMENT_H3]: (props) => HeadingElement({ as: 'h3', ...props }),
  [ELEMENT_H4]: (props) => HeadingElement({ as: 'h4', ...props }),
  [ELEMENT_H5]: (props) => HeadingElement({ as: 'h5', ...props }),
  [ELEMENT_H6]: (props) => HeadingElement({ as: 'h6', ...props }),
  [ELEMENT_HR]: HorizontalLineElement,
  [ELEMENT_DASHMENU_INPUT]: DashMenuElement,
}
