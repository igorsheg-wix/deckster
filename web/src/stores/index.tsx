import { PlateEditor, Value } from '@udecode/plate'
import { MenuItem } from 'components/Editor/Editor.types'
import createElementOnSelectItem from 'components/Editor/components/DashMenu/handlers/createElementOnSelectItem'
import blockMenuItems from 'components/Editor/components/DashMenu/menuItems'
import produce from 'immer'
import type { Descendant } from 'slate'
import type { Slide } from 'types'
import create from 'zustand'

interface DashMenuStore<V extends Value = Value> {
  isOpen: boolean
  text: string
  filteredItems: MenuItem[] | []
  setFilteredItems: (items: MenuItem[] | []) => void
  open: () => void
  close: () => void
  reset: () => void
  setText: (text: string) => void
  moveDown: () => void
  moveUp: () => void
  highlightIndex: (index: number) => void
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
  filteredItems: blockMenuItems(),
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
    setFilteredItems: (filteredItems) =>
      set({ dashmenu: { ...get().dashmenu, filteredItems } }),
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
    highlightIndex: (index: number) =>
      set({
        dashmenu: {
          ...get().dashmenu,
          highlightedIndex: index,
        },
      }),
  },
  cursorOnSlide: 0,
  //@ts-ignore
  set: (fn: any) => set(produce(fn)),
}))

export default useDecksterStore
