import { createPluginFactory } from '@udecode/plate-core'
import { ELEMENT_DASHMENU_INPUT } from 'components/Editor/Editor.types'
import { mentionOnKeyDownHandler } from './handlers/mentionOnKeyDownHandler'
import { isSelectionInMentionInput } from './queries'
import { MentionPlugin } from './types'
import { withMention } from './withDashMenu'

export const createDashMenuPlugin = createPluginFactory<MentionPlugin>({
  key: ELEMENT_DASHMENU_INPUT,
  isElement: true,
  isInline: true,
  // isVoid: true,
  handlers: {
    onKeyDown: mentionOnKeyDownHandler({ query: isSelectionInMentionInput }),
  },
  withOverrides: withMention,
  options: {
    trigger: '/',
  },

  then: (_, { key }) => ({
    options: {
      id: key,
    },
  }),
})
