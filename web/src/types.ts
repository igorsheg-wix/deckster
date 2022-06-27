import { marked } from 'marked'
import { BaseElement, Descendant } from 'slate'
import { RenderElementProps } from 'slate-react'

export enum Temaplte {
  cover = 'cover',
  titleWithP = 'titleWithP',
}

export interface Slide {
  id: string
  title: string
  template: Temaplte
  width: number
  backgroundImage: string
  elements: SlideElement[] | null
  tokens: marked.TokensList | marked.Token[]
  html: HTMLElement[] | null
}

export interface SlideElement {
  nodeName: string
  text: any
  coords: {
    top: any
    left: any
    width: any
    height: any
    bottom: any
    right: any
  }
  style?: {
    fontSize: number
    lineSpacing: number
    bold: any
    alignment: any
  }
}

// interface EditorDecendant extends BaseElement {
//   type: string
// }

// export enum EditorElementTypes {
//   '-' = 'list-item',
//   '#' = 'heading',
//   '##' = 'heading',
//   '###' = 'heading',
//   '####' = 'heading',
//   '#####' = 'heading',
//   '######' = 'heading',
// }

// export enum EditorKeys {
//   '-',
//   '#',
//   '##',
//   '###',
//   '####',
//   '#####',
//   '######',
// }

// export interface DecksterEditorElement extends BaseElement {
//   type?: EditorElementTypes
//   level?: number
// }
// export interface DecksterEditorElementProps extends RenderElementProps {
//   element: DecksterEditorElement
// }

// export type BulletedListElement = {
//   type: 'bulleted-list'
//   align?: string
//   children: Descendant[]
// }
