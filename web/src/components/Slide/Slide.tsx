import React from 'react'
import { usePlateSelectors } from '@udecode/plate'
import useDecksterStore from 'stores'
import { templates } from 'templates'
import { Slide } from 'types'
import { getSlideChildsWithMeasurement } from 'utils/measure'
import { templateEngine } from 'utils/template-engine'
import styles from './Slide.module.scss'

interface SlideProps {
  id: string
  index: number
  slide: Slide
}

const Slide = React.memo(({ slide, id, index }: SlideProps) => {
  const ref = React.createRef<HTMLDivElement>()
  const editor = usePlateSelectors().editor()
  const setDecksterStore = useDecksterStore((s) => s.set)
  const cursorOnSlide = useDecksterStore((s) => s.cursorOnSlide)
  const { tokens } = slide

  React.useEffect(() => {
    if (ref && ref.current && cursorOnSlide === index) {
      ref.current.scrollIntoView({ block: 'center', behavior: 'smooth' })
    }
  }, [cursorOnSlide])

  React.useEffect(() => {
    setDecksterStore((s) => {
      const ctxSlideIndex = s.slides.findIndex((s) => s.id === id)
      s.slides[ctxSlideIndex] = {
        ...s.slides[ctxSlideIndex],
        template: templateEngine(tokens),
        elements: getSlideChildsWithMeasurement(
          ref.current,
          s.slides[ctxSlideIndex].width
        ),
      }
    })
  }, [tokens])

  React.useLayoutEffect(() => {
    if (ref && ref.current) {
      setDecksterStore((s) => {
        const ctxSlideIndex = s.slides.findIndex((s) => s.id === id)
        s.slides[ctxSlideIndex] = {
          ...s.slides[ctxSlideIndex],
          width: ref.current?.offsetWidth || 0,
          backgroundImage: slideBackgroundImage,
        }
      })
    }
  }, [])

  const ctxTemplate = React.useCallback(() => templateEngine(tokens), [tokens])
  const Template = templates[ctxTemplate()].render()
  const slideBackgroundImage = templates[ctxTemplate()].backgroundImage

  return (
    <div
      className={styles.root}
      data-deckster-template={templateEngine(tokens)}
      data-deckster-slide="true"
      id={`slide${index}`}
      ref={ref}
    >
      <div className={styles.content}>
        {editor && (
          <Template
            slideBackgroundImage={slideBackgroundImage}
            editor={editor}
            tokens={tokens}
          />
        )}
      </div>
    </div>
  )
})

export { Slide }
