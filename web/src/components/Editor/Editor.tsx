import React, { useCallback, useMemo } from 'react'
import { createEditor, Descendant } from 'slate'
import { withHistory } from 'slate-history'
import { Editable, Slate, withReact } from 'slate-react'
import useDecksterStore from 'stores'
import { DecksterEditorElementProps } from 'types'
import styles from './Editor.module.scss'
import Element from './elements'
import Shortcuts from './shortcuts'

const DecksterEditor = () => {
  const setEditorRawContent = useDecksterStore((s) => s.set)

  const initialValue: Descendant[] = [
    {
      children: [{ text: '' }],
    },
  ]

  const editor = useMemo(
    //@ts-ignore
    () => Shortcuts(withHistory(withReact(createEditor()))),
    []
  )
  const renderElement = useCallback(
    (props: DecksterEditorElementProps) => <Element {...props} />,
    []
  )

  const onChangeHanlder = (value: Descendant[]) => {
    const isAstChange = editor.operations.some(
      (op) => 'set_selection' !== op.type
    )
    if (isAstChange) {
      setEditorRawContent((s) => {
        s.editorNodes = value
      })
    }
  }

  return (
    <div className={styles.root}>
      <Slate onChange={onChangeHanlder} editor={editor} value={initialValue}>
        <Editable
          renderElement={renderElement}
          placeholder="Start wiring your story"
        />
      </Slate>
    </div>
  )
}

export { DecksterEditor }
