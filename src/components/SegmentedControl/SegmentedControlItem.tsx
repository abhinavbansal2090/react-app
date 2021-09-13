import React, { FC } from 'react'
import { ListItem } from '@material-ui/core'

type Props = {
  title: string
  onPress: () => void
  selected: boolean
}

export const SegmentedControlItem: FC<Props> = ({
  title,
  selected,
  onPress,
}) => {
  return (
    <ListItem button selected={selected} onClick={onPress}>
      {title}
    </ListItem>
  )
}
