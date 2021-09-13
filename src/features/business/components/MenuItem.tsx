import React, { FC, useContext } from 'react'
import { MenuItem as MaterialMenuItem } from '@material-ui/core'
import { LocalizationContext } from 'lib/context'
import { icons } from 'assets'

import './MenuItem.scss'

type Props = {
  placeholder: string
  onPress: () => void
}

export const MenuItem: FC<Props> = ({ placeholder, onPress }) => {
  const { isRtl } = useContext(LocalizationContext)

  return (
    <MaterialMenuItem className="menuItem touchableContainer" onClick={onPress}>
      <p className="filterText">{placeholder}</p>
      <img
        src={isRtl ? icons.backArrowLeft : icons.backArrowRight}
        alt="Back icon"
        className="arrow"
      />
    </MaterialMenuItem>
  )
}
