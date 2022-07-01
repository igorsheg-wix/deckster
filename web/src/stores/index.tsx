import produce from 'immer'
import type { Slide } from 'types'
import create from 'zustand'
import type { Descendant } from 'slate'
import {
  getBlockAbove,
  isEndPoint,
  withoutNormalizing,
  insertText,
  select,
  withoutMergingHistory,
  removeNodes,
  insertNodes,
  focusEditor,
  PlateEditor,
  Value,
} from '@udecode/plate'
import {
  ELEMENT_DASHMENU_INPUT,
  MenuItem,
  MyValue,
} from 'components/Editor/Editor.types'
import { Range } from 'slate'
import createElementOnSelectItem from 'components/Editor/components/DashMenu/createElementOnSelectItem'

const onSelectItem = (editor: PlateEditor, item: string) => {
  const pathAbove = getBlockAbove(editor)?.[1]
  const isBlockEnd =
    editor.selection &&
    pathAbove &&
    isEndPoint(editor, editor.selection.anchor, pathAbove)

  // const isCursorAfterTrigger = getTextFromTrigger(editor, {
  //   at: Range.start(editor.selection),
  //   trigger: '/',
  //   searchPattern: dashmenu.text,
  // })
  // if (!isCursorAfterTrigger) {
  //   return
  // }
  // const { range, textAfterTrigger } = isCursorAfterTrigger

  // const yay = select(editor, Range.start(editor.selection))
  // console.log(yay)
  withoutNormalizing(editor, () => {
    if (isBlockEnd) {
      insertText(editor, ' ')
    }

    editor.selection && select(editor, Range.start(editor.selection))

    withoutMergingHistory(editor, () =>
      removeNodes(editor, {
        match: (node) => node.type === ELEMENT_DASHMENU_INPUT,
      })
    )

    insertNodes(editor, {
      type: item,
      children: [{ text: '' }],
    })
    focusEditor(editor)
  })
}

interface DashMenuStore<V extends Value = Value> {
  isOpen: boolean
  text: string
  open: () => void
  close: () => void
  reset: () => void
  setText: (text: string) => void
  moveDown: () => void
  moveUp: () => void
  onYay: () => void
  highlightedIndex: number
  onSelectItem: (
    ev:
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
      | React.KeyboardEvent<Element>,
    e: PlateEditor<V>,
    item: MenuItem
  ) => void
}
interface GoogleUserInfo {
  id: string
  email: string
  picture: string
}

export interface DecksterStore {
  userInfo: GoogleUserInfo | null
  accessToken: string | undefined
  editorNodes: Descendant[]
  cursorOnSlide: number
  slides: Slide[]
  dashmenu: DashMenuStore
  set: (fn: (draft: DecksterStore, args: any) => void) => void
}

const dashMenuBaseStore = {
  isOpen: false,
  text: '',
  highlightedIndex: 0,
  onSelectItem: createElementOnSelectItem,
  onYay: () => {},
}

const useDecksterStore = create<DecksterStore>((set, get) => ({
  userInfo: null,
  accessToken: undefined,
  editorNodes: [],
  slides: [],
  dashmenu: {
    ...dashMenuBaseStore,
    open: () => set({ dashmenu: { ...get().dashmenu, isOpen: true } }),
    close: () => set({ dashmenu: { ...get().dashmenu, isOpen: false } }),
    setText: (text) => set({ dashmenu: { ...get().dashmenu, text } }),
    moveDown: () =>
      set({
        dashmenu: {
          ...get().dashmenu,
          highlightedIndex: get().dashmenu.highlightedIndex + 1,
        },
      }),
    moveUp: () =>
      set({
        dashmenu: {
          ...get().dashmenu,
          highlightedIndex: get().dashmenu.highlightedIndex - 1,
        },
      }),
    reset: () => set({ dashmenu: { ...get().dashmenu, ...dashMenuBaseStore } }),
  },
  cursorOnSlide: 0,
  //@ts-ignore
  set: (fn: any) => set(produce(fn)),
}))

export default useDecksterStore
