import {
  getNodeString,
  isType,
  PlateEditor,
  TElement,
  usePlateSelectors,
  Value,
} from '@udecode/plate'
import React from 'react'
import styled from 'styled-components'
import { Slide } from 'types'
import { pxToVw } from 'utils/calcs'
import { marked as slideParser } from 'utils/slide-token-parser'

const getHeadingObject = (editor: PlateEditor<Value>, nodes: Value) => {
  const ctxNode = nodes.find((n) => isType(editor, n, 'h1'))

  return ctxNode ? getNodeString(ctxNode) : ''
}

interface SlideTemplate {
  tokens: Value
  editor: PlateEditor<Value>
  slideBackgroundImage: Slide['backgroundImage']
}
const CoverTemplate = ({
  tokens,
  slideBackgroundImage,
  editor,
}: SlideTemplate) => {
  if (!editor) return null

  const headingText = getHeadingObject(editor, tokens)

  return (
    <Wrap slideBackgroundImage={slideBackgroundImage}>
      <StyledHeader data-deckster="true">
        {slideParser.parseInline(headingText as string)}
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
