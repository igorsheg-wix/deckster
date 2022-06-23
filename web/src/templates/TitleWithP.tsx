import React from 'react'
import styled from 'styled-components'
import { pxToVw } from 'utils/calcs'
import { marked as slideParser } from 'utils/slide-token-parser'

const getParagraphObject = (
  tokens: slideParser.TokensList | slideParser.Token[]
) => {
  const pTokens = tokens.filter((t) => t.type === 'paragraph')
  return pTokens as slideParser.Tokens.Paragraph[]
}

const getHeadingObject = (
  tokens: slideParser.TokensList | slideParser.Token[]
) => {
  return tokens.find((t) => t.type === 'heading' && t.depth === 1) as
    | slideParser.Tokens.Heading
    | undefined
}

interface SlideTemplate {
  tokens: slideParser.TokensList | slideParser.Token[]
}

const TitleAndParagraph = ({ tokens }: SlideTemplate) => {
  const headingText = getHeadingObject(tokens)?.text || ''

  return (
    <Wrap>
      <h1 data-deckster="true">{slideParser.parseInline(headingText)}</h1>
      <div
        dangerouslySetInnerHTML={{
          __html: slideParser.parser(getParagraphObject(tokens)),
        }}
      />
    </Wrap>
  )
}

const Wrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  flex-direction: column;

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-left: ${pxToVw(80)}vw;
    margin-bottom: ${pxToVw(20)}vw;
  }

  h1 {
    margin-left: ${pxToVw(80)}vw;
    font-size: ${pxToVw(45)}vw;
    line-height: ${pxToVw(54)}vw;
    font-weight: 700;
    width: ${pxToVw(766)}vw;
    min-height: ${pxToVw(1)}vw;
  }
  p {
    font-size: ${pxToVw(21)}vw;
    line-height: ${pxToVw(30)}vw;
    font-weight: 400;
    width: ${pxToVw(766)}vw;
    margin-left: ${pxToVw(80)}vw;
  }
`

const StyledHeader = styled.h1`
  margin-left: ${pxToVw(80)}vw;
  font-size: ${pxToVw(45)}vw;
  line-height: ${pxToVw(54)}vw;
  font-weight: 600;
  width: ${pxToVw(766)}vw;
`

const Paragraph = styled.p`
  font-size: ${pxToVw(18.5)}vw;
  line-height: ${pxToVw(30)}vw;
  font-weight: 400;
  width: ${pxToVw(766)}vw;
  margin-left: ${pxToVw(80)}vw;
`

export default TitleAndParagraph
