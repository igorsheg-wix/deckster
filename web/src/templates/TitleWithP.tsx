import {
  getNodeString,
  isType,
  PlateEditor,
  usePlateSelectors,
  Value,
} from '@udecode/plate'
import React from 'react'
import styled from 'styled-components'
import { pxToVw } from 'utils/calcs'

const getParagraphObject = (tokens: Value) => {
  const pTokens = tokens.filter((t) => t.type === 'paragraph')
  return pTokens as Value
}

const getHeadingObject = (editor: PlateEditor<Value>, nodes: Value) => {
  const ctxNode = nodes.find((n) => isType(editor, n, 'h1'))

  return ctxNode ? getNodeString(ctxNode) : ''
}

interface SlideTemplate {
  tokens: Value
  editor: PlateEditor<Value>
}

const TitleAndParagraph = ({ tokens, editor }: SlideTemplate) => {
  // console.log('From viewer', editorValue)
  // console.log('tokens -------------->', tokens)

  // const heading = findNode(editor, {
  //   match: (n) => n.type === 'h1',
  // })
  // console.log('headingh', heading)
  // // console.log('tokens', tokens)

  if (!editor) return null

  // const yay =
  //   getHeadingObject(editor) &&
  //   serializeHtml(editor, { nodes: [getHeadingObject(editor)] })
  // console.log('HTML ----->', yay)
  // console.log('Tokens ----->', tokens)

  const headingText = getHeadingObject(editor, tokens)

  // console.log(
  //   'headingText -------->',
  //   headingText ? getNodeString(headingText) : ''
  // )

  return (
    <Wrap>
      {/* {serializeHtml(editor, { nodes: tokens[0] })} */}
      <h1 data-deckster="true">{headingText}</h1>
      {/* <div>{JSON.stringify(getParagraphObject(tokens))}</div> */}
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
