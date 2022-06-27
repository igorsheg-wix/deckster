import produce from 'immer'
import type { Slide } from 'types'
import create from 'zustand'
import type { Descendant } from 'slate'

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
  set: (fn: (draft: DecksterStore, args: any) => void) => void
}

const useDecksterStore = create<DecksterStore>((set) => ({
  userInfo: null,
  accessToken: undefined,
  editorNodes: [],
  slides: [],
  cursorOnSlide: 0,
  //@ts-ignore
  set: (fn: any) => set(produce(fn)),
}))

export default useDecksterStore
