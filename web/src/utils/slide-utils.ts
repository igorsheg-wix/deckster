import { marked } from 'marked'
import { Slide, Temaplte } from 'types'

export default () => {
  return { create }
}

interface NewSlide {
  id: string
  title: string
  tokens: marked.TokensList | marked.Token[]
}

const create = (props: NewSlide): Slide => {
  return {
    title: props.title,
    id: props.id,
    tokens: props.tokens,
    template: Temaplte.cover,
    html: null,
    width: 0,
    backgroundImage: '',
    elements: null,
  }
}
