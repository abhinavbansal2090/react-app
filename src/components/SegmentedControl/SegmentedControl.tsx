import React, { FC } from 'react'
import { List } from '@material-ui/core'
import { SegmentedControlItem } from './SegmentedControlItem'

import './SegmentedControl.scss'

type Props = {
  segments: { name: string }[]
  selected: number
  updateSelected: any
}

export const SegmentedControl: FC<Props> = ({
  selected,
  updateSelected,
  segments,
}) => {
  return (
    <div className="segmented-control">
      <List>
        {segments.map(({ name }, idx: number) => {
          return (
            <SegmentedControlItem
              onPress={() => {
                updateSelected(idx)
              }}
              key={idx}
              title={name}
              selected={selected === idx}
            />
          )
        })}
      </List>
    </div>
  )
}
