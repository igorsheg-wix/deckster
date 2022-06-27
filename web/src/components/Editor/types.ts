import { BaseEditor, Descendant } from 'slate'
import { HistoryEditor } from 'slate-history'
import { ReactEditor } from 'slate-react'

export type SlateEditor = BaseEditor & ReactEditor & HistoryEditor

declare module 'slate' {
  interface CustomTypes {
    Editor: SlateEditor
    Element: SlateElements
    Text: Text
  }
}

export enum EditorElementType {
  p = 'paragraph',
  li = 'list-item',
  h = 'heading',
  hr = 'divider',
}

// export enum ElementType {
//   Paragraph = 'paragraph',
//   H1 = 'heading-one',
//   H2 = 'heading-two',
//   H3 = 'heading-three',
//   Blockquote = 'blockquote',
//   ListItem = 'list-item',
//   BulletedList = 'bulleted-list',
//   NumberedList = 'numbered-list',
//   CheckListItem = 'check-list-item',
//   Link = 'link',
//   HorizontalLine = 'horizontal-line',
// }

export enum EditorKeys {
  '-' = '-',
  '#' = '#',
  '##' = '##',
  '###' = '###',
  '---' = '---',
}

export interface Text {
  text: string
  type?: EditorElementType
  bold?: boolean
  underline?: boolean
  strikethrough?: boolean
  italic?: boolean
  'inline-code'?: boolean
}

export interface ParagraphElement {
  type: EditorElementType.p
  align?: TextAlignment
  children: Descendant[]
}

export interface HeadingElement {
  type: EditorElementType.h
  level: number
  align?: TextAlignment
  children: Text[]
}

export interface ListItemElement {
  type: EditorElementType.li
  align?: TextAlignment
  children: Text[]
}

export interface DividerElement {
  type: EditorElementType.hr
  level: number
  align?: TextAlignment
  children: Text[]
}

export type SlateElements =
  | ParagraphElement
  | HeadingElement
  | ListItemElement
  | DividerElement

export type TextAlignment = 'text-left' | 'text-right' | 'text-center'
export type SlateFormat = SlateElements['type'] | TextAlignment
