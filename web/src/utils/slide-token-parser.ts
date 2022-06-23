import { marked } from 'marked'
import DOMPurify from 'dompurify'

const markedRenderer = {
  heading(text: string, level: number) {
    return `
            <h${level} data-deckster="true">
              ${text}
            </h${level}>`
  },
  paragraph(text: string) {
    return `
            <p data-deckster="true">
              ${text}
            </p>`
  },
}

marked.setOptions({
  breaks: true,
  gfm: true,
  sanitizer: DOMPurify.sanitize,
})
marked.use({ renderer: markedRenderer })

export { marked }
