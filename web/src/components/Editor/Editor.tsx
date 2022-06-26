import { marked } from 'marked'
import React, { useCallback, useMemo } from 'react'
import {
  createEditor,
  Descendant,
  Editor,
  Element as SlateElement,
  Node,
  Point,
  Range,
  Text,
  Transforms,
} from 'slate'
import { withHistory } from 'slate-history'
import {
  Editable,
  ReactEditor,
  RenderElementProps,
  Slate,
  withReact,
} from 'slate-react'
import useDecksterStore from 'stores'
import styles from './Editor.module.scss'

const SHORTCUTS = {
  '*': 'list-item',
  '-': 'list-item',
  '+': 'list-item',
  '>': 'block-quote',
  '#': 'heading-one',
  '##': 'heading-two',
  '###': 'heading-three',
  '####': 'heading-four',
  '#####': 'heading-five',
  '######': 'heading-six',
}

const DecksterEditor = () => {
  const setEditorRawContent = useDecksterStore((s) => s.set)

  // const setSlideToCursor = (
  //   ev: MouseEvent<HTMLTextAreaElement> | KeyboardEvent<HTMLTextAreaElement>
  // ) => {
  //   decksterStore.set((s) => {
  //     s.cursorOnSlide = getCursorActiveSlide(
  //       ev.currentTarget.value,
  //       ev.currentTarget.selectionStart
  //     )
  //   })
  // }

  // const handleEditorChange = (ev: ChangeEvent<HTMLTextAreaElement>) => {
  //   ev.preventDefault()
  //   decksterStore.set((s) => {
  //     s.editorRawContent = ev.target.value
  //     s.cursorOnSlide = getCursorActiveSlide(
  //       ev.target.value,
  //       ev.target.selectionStart
  //     )
  //   })
  // }
  // Add the initial value.
  const initialValue: Descendant[] = [
    {
      children: [{ text: '' }],
    },
  ]

  const editor = useMemo(
    //@ts-ignore
    () => withShortcuts(withHistory(withReact(createEditor()))),
    []
  )
  const renderElement = useCallback(
    (props: RenderElementProps) => <Element {...props} />,
    []
  )

  const serialize = (nodes) => {
    return nodes.map((n) => Node.string(n)).join('\n')
  }
  const onChangeHanlder = () => {
    setEditorRawContent((s) => {
      s.editorRawContent = serialize(editor.children)
    })
  }

  const decorate = useCallback(([node, path]: any) => {
    const ranges: any = []

    if (!Text.isText(node)) {
      return ranges
    }

    const tokens = marked.lexer(node.text)
    console.log('node.text', tokens)

    return ranges
  }, [])

  return (
    <div className={styles.root}>
      <Slate
        onChange={() => onChangeHanlder()}
        editor={editor}
        value={initialValue}
      >
        <Editable
          decorate={decorate}
          renderElement={renderElement}
          placeholder="Start wiring your story"
        />
      </Slate>
    </div>
  )
}

const withShortcuts = (editor: ReactEditor): ReactEditor => {
  const { deleteBackward, insertText } = editor

  editor.insertText = (text) => {
    const { selection } = editor

    if (text === ' ' && selection && Range.isCollapsed(selection)) {
      const { anchor } = selection
      const block = Editor.above(editor, {
        match: (n) => Editor.isBlock(editor, n),
      })
      const path = block ? block[1] : []
      const start = Editor.start(editor, path)
      const range = { anchor, focus: start }
      const beforeText = Editor.string(editor, range)
      const type = SHORTCUTS[beforeText]

      if (type) {
        Transforms.select(editor, range)
        Transforms.delete(editor)
        const newProperties: Partial<SlateElement> = {
          type,
        }
        Transforms.setNodes<SlateElement>(editor, newProperties, {
          match: (n) => Editor.isBlock(editor, n),
        })

        if (type === 'list-item') {
          const list: BulletedListElement = {
            type: 'bulleted-list',
            children: [],
          }
          Transforms.wrapNodes(editor, list, {
            match: (n) =>
              !Editor.isEditor(n) &&
              SlateElement.isElement(n) &&
              n.type === 'list-item',
          })
        }

        return
      }
    }

    insertText(text)
  }

  editor.deleteBackward = (...args) => {
    const { selection } = editor

    if (selection && Range.isCollapsed(selection)) {
      const match = Editor.above(editor, {
        match: (n) => Editor.isBlock(editor, n),
      })

      if (match) {
        const [block, path] = match
        const start = Editor.start(editor, path)

        if (
          !Editor.isEditor(block) &&
          SlateElement.isElement(block) &&
          block.type !== 'paragraph' &&
          Point.equals(selection.anchor, start)
        ) {
          const newProperties: Partial<SlateElement> = {
            type: 'paragraph',
          }
          Transforms.setNodes(editor, newProperties)

          if (block.type === 'list-item') {
            Transforms.unwrapNodes(editor, {
              match: (n) =>
                !Editor.isEditor(n) &&
                SlateElement.isElement(n) &&
                n.type === 'bulleted-list',
              split: true,
            })
          }

          return
        }
      }

      deleteBackward(...args)
    }
  }

  return editor
}

const Element = ({ attributes, children, element }: any) => {
  switch (element.type) {
    case 'block-quote':
      return <blockquote {...attributes}>{children}</blockquote>
    case 'bulleted-list':
      return <ul {...attributes}>{children}</ul>
    case 'heading-one':
      return <h1 {...attributes}>{children}</h1>
    case 'heading-two':
      return <h2 {...attributes}>{children}</h2>
    case 'heading-three':
      return <h3 {...attributes}>{children}</h3>
    case 'heading-four':
      return <h4 {...attributes}>{children}</h4>
    case 'heading-five':
      return <h5 {...attributes}>{children}</h5>
    case 'heading-six':
      return <h6 {...attributes}>{children}</h6>
    case 'list-item':
      return <li {...attributes}>{children}</li>
    default:
      return <p {...attributes}>{children}</p>
  }
}

// const Wrap = styled.div`
//   width: 100%;
//   height: 100%;
//   display: flex;
//   padding: 30px;
//   justify-content: center;
//   align-items: flelx-start;
//   box-sizing: border-box;
//   max-height: calc(100vh - 96px);
//   flex-direction: row;
//   justify-content: flex-start;
//   box-shadow: 1px 0 0 #ebebeb;

//   [role='textbox'] {
//     flex-grow: 1;
//     flex-shrink: 1;
//     /* resize: none;
//     outline: none;
//     border: none; */
//     font-size: 16px;
//   }

//   p {
//     margin-bottom: 1rem;
//   }

//   h1,
//   h2,
//   h3,
//   h4,
//   h5 {
//     margin: 3rem 0 1.38rem;
//     font-family: 'Poppins', sans-serif;
//     font-weight: 400;
//     line-height: 1.3;
//   }

//   h1 {
//     margin-top: 0;
//     font-size: 1.383rem;
//   }

//   h2 {
//     font-size: 1.296rem;
//   }

//   h3 {
//     font-size: 1.215rem;
//   }

//   h4 {
//     font-size: 1.138rem;
//   }

//   h5 {
//     font-size: 1.067rem;
//   }

//   small,
//   .text_small {
//     font-size: 0.937rem;
//   }
// `

// const StyledEditor = styled(Editable)`
//   flex-grow: 1;
//   flex-shrink: 1;
//   resize: none;
//   outline: none;
//   border: none;
//   font-size: 16px;
// `

export { DecksterEditor }
