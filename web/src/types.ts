import { Value } from '@udecode/plate'

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
  tokens: Value

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
