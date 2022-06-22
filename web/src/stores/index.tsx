import produce from 'immer'
import create from 'zustand'

interface DecksterStore {
  accessToken: string | undefined
  set: (fn: (draft: DecksterStore, args: any) => void) => void
}

const useDecksterStore = create<DecksterStore>((set) => ({
  accessToken: undefined,
  //@ts-ignore
  set: (fn: any) => set(produce(fn)),
}))

export default useDecksterStore
