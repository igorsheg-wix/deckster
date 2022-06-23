import React from 'react'
import styled from 'styled-components'
import { Slide } from 'types'
import { pxToVw } from 'utils/calcs'
import { marked as slideParser } from 'utils/slide-token-parser'

const getHeadingObject = (
  tokens: slideParser.TokensList | slideParser.Token[]
) => {
  return tokens.find((t) => t.type === 'heading' && t.depth === 1) as
    | slideParser.Tokens.Heading
    | undefined
}

interface SlideTemplate {
  tokens: slideParser.TokensList | slideParser.Token[]
  slideBackgroundImage: Slide['backgroundImage']
}
const CoverTemplate = ({ tokens, slideBackgroundImage }: SlideTemplate) => {
  const headingText = getHeadingObject(tokens)?.text || ''

  return (
    <Wrap slideBackgroundImage={slideBackgroundImage}>
      <StyledHeader data-deckster="true">
        {slideParser.parseInline(headingText)}
      </StyledHeader>
    </Wrap>
  )
}

const Wrap = styled.div<{ slideBackgroundImage: string }>`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(${(p) => p.slideBackgroundImage});
  background-size: cover;
`
const StyledHeader = styled.h1`
  font-size: ${pxToVw(54)}vw;
  line-height: ${pxToVw(66)}vw;
  width: ${pxToVw(766)}vw;
  font-weight: 700;
  text-align: center;
  min-height: ${pxToVw(1)}vw;
`

export default CoverTemplate
