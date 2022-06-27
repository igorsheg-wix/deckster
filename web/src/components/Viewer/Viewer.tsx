import React, { useEffect } from 'react'
import styled from 'styled-components'
import { marked } from 'marked'
import { pxToVw, indices } from 'utils/calcs'
// import { slide, templates, templateEngine } from 'public/slides'
import { getSlideChildsWithMeasurement } from 'utils/measure'
import useDecksterStore, { DecksterStore } from 'stores'
import { templates } from 'templates'
import { templateEngine } from 'utils/template-engine'
import SlideUtils from 'utils/slide-utils'

const Viewer = () => {
  const ref = React.createRef<HTMLDivElement>()
  const editorNodes = useDecksterStore((s) => s.editorNodes)
  const setDecksterStore = useDecksterStore((s) => s.set)
  const cursorOnSlide = useDecksterStore((s) => s.cursorOnSlide)
  const slides = useDecksterStore((s) => s.slides)

  // React.useEffect(() => {
  //   if (data && data.length) {
  //     const tokens = marked.lexer(data)
  //     const hrTokens = indices(
  //       tokens.map((t) => t.type),
  //       'hr'
  //     )

  //     const withFirstSlide = [0, ...hrTokens]

  //     const createSlides = withFirstSlide.map((hrt, index) => {
  //       const ctxTokens = tokens.slice(hrt, hrTokens[index])

  //       return SlideUtils().create({
  //         title: `slide${index}`,
  //         id: `slide${index}`,
  //         tokens: ctxTokens,
  //       })
  //     })

  //     setDecksterStore((s) => {
  //       s.slides = createSlides
  //     })
  //   } else {
  //     setDecksterStore((s) => {
  //       s.slides = []
  //     })
  //   }
  // }, [data])

  useEffect(() => {
    console.log(editorNodes)
  }, [editorNodes])

  return (
    <Wrap ref={ref}>
      {!slides.length ? (
        <Empty />
      ) : (
        slides.map((slide, index) => (
          <Slide
            key={slide.id}
            index={index}
            setDecksterStore={setDecksterStore}
            cursorOnSlide={cursorOnSlide}
            {...slide}
          />
        ))
      )}
    </Wrap>
  )
}

interface SlideProps {
  tokens: marked.TokensList | marked.Token[]
  id: string
  setDecksterStore: (fn: (draft: DecksterStore, args: any) => void) => void
  cursorOnSlide: number
  index: number
}

const Slide = ({
  tokens,
  id,
  setDecksterStore,
  cursorOnSlide,
  index,
}: SlideProps) => {
  const ref = React.createRef<HTMLDivElement>()

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

  //   const width = React.useCallback(() => ref.current?.offsetWidth, [ref])

  //   TODO: resize observer
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
    <StyledSlide
      data-deckster-template={templateEngine(tokens)}
      data-deckster-slide="true"
      id={`slide${index}`}
      ref={ref}
    >
      <SlideContent>
        <Template slideBackgroundImage={slideBackgroundImage} tokens={tokens} />
      </SlideContent>
    </StyledSlide>
  )
}

const Empty = () => {
  return (
    <StyledEmpty>
      <span>Every legendary deck starts with a story...</span>
    </StyledEmpty>
  )
}

const StyledEmpty = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  span {
    font-size: ${pxToVw(30)}vw;
    line-height: ${pxToVw(36)}vw;
    color: grey;
    text-align: center;
  }
`

const Wrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  padding: 60px;
  background: #ebebeb;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  overflow: scroll;
  scroll-behaviour: smooth;
  max-height: calc(100vh - 96px);
  flex-direction: column;
  justify-content: flex-start;
`
const StyledSlide = styled.div`
  position: relative;
  width: 100%;
  padding-top: 56.263%;
  display: flex;
  margin: 0 0 30px 0;
`

const SlideContent = styled.div`
  position: absolute;
  background: white;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`

export { Viewer }
// define({ "x-viewer": Viewer });
