import {
  getNodeString,
  isText,
  isType,
  PlateEditor,
  serializeHtml,
  Value,
} from '@udecode/plate'
import DOMPurify from 'dompurify'
import parse from 'html-react-parser'
import React, { useCallback, useEffect } from 'react'
import styled from 'styled-components'
import { pxToVw } from 'utils/calcs'
import { marked as slideParser } from 'utils/slide-token-parser'
const getParagraphObject = (editor: PlateEditor<Value>, nodes: Value) => {
  const ctxNodes = nodes.filter((n) => isType(editor, n, 'p'))
  console.log(isText(ctxNodes[0]))

  return ctxNodes
    ? serializeHtml(editor, {
        nodes: ctxNodes,
        convertNewLinesToHtmlBr: true,
        stripWhitespace: false,
      })
    : ''
}

const getHeadingObject = (editor: PlateEditor<Value>, nodes: Value) => {
  const ctxNode = nodes.find((n) => isType(editor, n, 'h1'))
  console.log(ctxNode ? ctxNode.text : '')

  return ctxNode
    ? serializeHtml(editor, {
        nodes: [ctxNode],
        convertNewLinesToHtmlBr: true,
        stripWhitespace: false,
      })
    : ''
}

interface SlideTemplate {
  tokens: Value
  editor: PlateEditor<Value>
}

const TitleAndParagraph = ({ tokens, editor }: SlideTemplate) => {
  const headingNode = tokens.find((n) => isType(editor, n, 'h1'))
  const paragraphNodes = tokens.filter((n) => isType(editor, n, 'p'))

  const paragparhContent = useCallback(
    () =>
      parse(
        DOMPurify.sanitize(getParagraphObject(editor, tokens), {
          ALLOWED_TAGS: ['br'],
        })
      ),
    [paragraphNodes]
  )

  const headingContent = useCallback(
    () =>
      parse(
        DOMPurify.sanitize(getHeadingObject(editor, tokens), {
          ALLOWED_TAGS: ['br'],
        })
      ),
    [headingNode]
  )

  return (
    <Wrap>
      <h1>{headingContent()}</h1>
      {paragparhContent()}
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
