import React, { FC, useContext } from 'react'
import { MenuItem as MaterialMenuItem } from '@material-ui/core'
import { icons } from 'assets'
import { LocalizationContext } from 'lib/context'
import './Selector.scss'
import { withRtl } from 'lib/utils'

type Props = {
  text: string
  onPress: any
}

export const Selector: FC<Props> = ({ text, onPress }) => {
  const { isRtl } = useContext(LocalizationContext)
  return (
    <>
      <MaterialMenuItem
        onClick={onPress}
        className={withRtl('selector menuItem touchableContainer')}
      >
        <p>{text}</p>
        <img
          src={isRtl ? icons.backArrowLeft : icons.backArrowRight}
          className="arrow"
          alt="back Icon"
        />
      </MaterialMenuItem>
    </>
  )
}
