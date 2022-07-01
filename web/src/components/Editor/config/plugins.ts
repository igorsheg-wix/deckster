import {
  createAutoformatPlugin,
  createBlockquotePlugin,
  createBoldPlugin,
  createCodeBlockPlugin,
  createCodePlugin,
  createDndPlugin,
  createExitBreakPlugin,
  createHeadingPlugin,
  createHorizontalRulePlugin,
  createItalicPlugin,
  createNodeIdPlugin,
  createParagraphPlugin,
  createPlateUI,
  createResetNodePlugin,
  createSelectOnBackspacePlugin,
  createSoftBreakPlugin,
  createStrikethroughPlugin,
  createSubscriptPlugin,
  createSuperscriptPlugin,
  createTrailingBlockPlugin,
  createUnderlinePlugin,
} from '@udecode/plate'
import { createDashMenuPlugin } from '../components/DashMenu/createMentionPlugin'
import { createMyPlugins } from '../Editor.types'
import { components } from './components'
import { CONFIG } from './config'

const basicElements = createMyPlugins(
  [
    createBlockquotePlugin(),
    createCodeBlockPlugin(),
    createHeadingPlugin(),
    createParagraphPlugin(),
    createHorizontalRulePlugin(),
  ],
  {
    components,
  }
)

const basicMarks = createMyPlugins(
  [
    createBoldPlugin(),
    createCodePlugin(),
    createItalicPlugin(),
    createStrikethroughPlugin(),
    createSubscriptPlugin(),
    createSuperscriptPlugin(),
    createUnderlinePlugin(),
  ],
  {
    components: createPlateUI(),
  }
)

const logic = createMyPlugins(
  [
    //@ts-ignore
    createAutoformatPlugin(CONFIG.autoformat),
    createDashMenuPlugin(),
    createNodeIdPlugin(),
    createDndPlugin(),
    createSoftBreakPlugin(CONFIG.softBreak),
    createExitBreakPlugin(CONFIG.exitBreak),
    createResetNodePlugin(),
    createTrailingBlockPlugin(CONFIG.trailingBlock),
    createSelectOnBackspacePlugin(CONFIG.selectOnBackspace),
  ],
  { components }
)

export const PLUGINS = {
  basicElements,
  basicMarks,
  logic,
}
