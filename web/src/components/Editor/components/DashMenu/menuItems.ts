import { ELEMENT_H1, ELEMENT_H2, ELEMENT_H3, ELEMENT_HR } from '@udecode/plate'
import { HeadingIcon, DividerHorizontalIcon } from '@radix-ui/react-icons'
import { MenuItem } from 'components/Editor/Editor.types'

export default function blockMenuItems(): MenuItem[] {
  return [
    {
      key: ELEMENT_H1,
      lable: 'Main heading',
      keywords: 'h1 heading1 title',
      icon: HeadingIcon,
      shortcut: '^ ⇧ 1',
      attrs: { level: 1 },
    },
    {
      key: ELEMENT_H2,
      lable: 'Secondary heading',
      keywords: 'h2 heading2',
      icon: HeadingIcon,
      shortcut: '^ ⇧ 2',
      attrs: { level: 2 },
    },
    {
      key: ELEMENT_H3,
      lable: 'Terniary heading',
      keywords: 'h3 heading3',
      icon: HeadingIcon,
      shortcut: '^ ⇧ 3',
      attrs: { level: 3 },
    },
    {
      key: 'separator',
    },
    {
      key: ELEMENT_HR,
      lable: 'New slide divider',
      icon: DividerHorizontalIcon,
      shortcut: `⌘ _`,
      keywords: 'horizontal rule break line',
    },
  ]
}
