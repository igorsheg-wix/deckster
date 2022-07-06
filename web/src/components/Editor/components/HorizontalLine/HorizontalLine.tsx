import { Value } from '@udecode/plate'
import { ElementProps } from 'components/Editor/Editor.types'
import React from 'react'
import { useSelected, useFocused } from 'slate-react'
import styles from './HorizontalLine.module.scss'
import classnames from 'classnames'
interface HorizontalLineElementProps<V extends Value> extends ElementProps<V> {}

export const HorizontalLineElement = <V extends Value>(
  props: HorizontalLineElementProps<V>
) => {
  const { attributes, children, nodeProps } = props
  const selected = useSelected()
  const focused = useFocused()

  const css = classnames(styles.hr, selected && focused && styles.selected)
  return (
    <div {...attributes} {...nodeProps} data-deckster-node="hr">
      <div contentEditable={false} className={styles.hrWrap}>
        <hr className={css} contentEditable={false} />
        <span> Slide 2 </span>
      </div>
      {children}
    </div>
  )
}
