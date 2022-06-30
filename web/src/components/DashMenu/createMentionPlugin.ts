import { createPluginFactory } from '@udecode/plate-core'
import {
  ELEMENT_DASHMENU,
  ELEMENT_DASHMENU_INPUT,
} from 'components/Editor/Editor.types'
import { mentionOnKeyDownHandler } from './handlers/mentionOnKeyDownHandler'
import { isSelectionInMentionInput } from './queries'
import { MentionPlugin } from './types'
import { withMention } from './withDashMenu'

/**
 * Enables support for autocompleting @mentions.
 */
export const createDashMenuPlugin = createPluginFactory<MentionPlugin>({
  key: ELEMENT_DASHMENU,
  isElement: true,
  isInline: true,
  isVoid: true,
  handlers: {
    onKeyDown: mentionOnKeyDownHandler({ query: isSelectionInMentionInput }),
  },
  withOverrides: withMention,
  options: {
    trigger: '/',
    createMentionNode: (item) => ({ value: item.text }),
  },
  plugins: [
    {
      key: ELEMENT_DASHMENU_INPUT,
      isElement: true,
      isInline: true,
    },
  ],
  then: (editor, { key }) => ({
    options: {
      id: key,
    },
  }),
})
