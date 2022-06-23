import React, { ChangeEvent, KeyboardEvent, MouseEvent } from 'react'
import useDecksterStore from 'stores'
// import { useViewerStore } from 'public/store'
import styled from 'styled-components'
import getCursorActiveSlide from 'utils/cursor-to-slide'

const Editor = () => {
  const decksterStore = useDecksterStore()

  const setSlideToCursor = (
    ev: MouseEvent<HTMLTextAreaElement> | KeyboardEvent<HTMLTextAreaElement>
  ) => {
    decksterStore.set((s) => {
      s.cursorOnSlide = getCursorActiveSlide(
        ev.currentTarget.value,
        ev.currentTarget.selectionStart
      )
    })
  }

  const handleEditorChange = (ev: ChangeEvent<HTMLTextAreaElement>) => {
    ev.preventDefault()
    decksterStore.set((s) => {
      s.editorRawContent = ev.target.value
      s.cursorOnSlide = getCursorActiveSlide(
        ev.target.value,
        ev.target.selectionStart
      )
    })
  }

  return (
    <Wrap>
      <StyledEditor
        placeholder="Your next awesome deck starts here..."
        onChange={handleEditorChange}
        onClick={(ev) => setSlideToCursor(ev)}
        onKeyDown={(ev) => setSlideToCursor(ev)}
      />
    </Wrap>
  )
}

const Wrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  padding: 30px;
  justify-content: center;
  align-items: flelx-start;
  box-sizing: border-box;
  max-height: calc(100vh - 96px);
  flex-direction: row;
  justify-content: flex-start;
  box-shadow: 1px 0 0 #ebebeb;
`

const StyledEditor = styled.textarea`
  flex-grow: 1;
  flex-shrink: 1;
  resize: none;
  outline: none;
  border: none;
  font-size: 16px;
`

export { Editor }
