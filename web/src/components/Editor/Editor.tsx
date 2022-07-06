import { Plate, Value } from '@udecode/plate'
import React from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import DashMenu from './components/DashMenu/DashMenu'
import { PLUGINS } from './config/plugins'
import styles from './Editor.module.scss'

const DecksterEditor = () => {
  const editableProps = {
    placeholder: "Type '/' to insert, or start writing…",
  }

  const handleEditorChange = (value: Value) => {}

  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <div id="deckster-editor" className={styles.root}>
          <Plate
            onChange={handleEditorChange}
            plugins={[
              ...PLUGINS.basicElements,
              ...PLUGINS.basicMarks,
              ...PLUGINS.logic,
            ]}
            editableProps={editableProps}
          >
            <DashMenu />
          </Plate>
        </div>
      </DndProvider>
    </>
  )
}

export { DecksterEditor }
