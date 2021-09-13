import React, { FC } from 'react'
import clsx from 'clsx'
import { MenuItem as MaterialMenuItem } from '@material-ui/core'
import { icons } from 'assets'
import { withRtl } from 'lib/utils'
import './SelectOption.scss'

type Props = {
  title?: string
  icon?: string
  isChecked?: boolean
  onPress?: any
  className?: string
}

export const SelectOption: FC<Props> = ({
  title,
  icon,
  isChecked,
  onPress,
  className,
}) => {
  return (
    <MaterialMenuItem
      className={withRtl(clsx('selectOption', 'touchableContainer', className))}
      onClick={onPress}
    >
      <p className="title">
        {title}
        <span>{icon}</span>
      </p>

      {isChecked && <img src={icons.tick} alt="tick Icon" className="tick" />}
    </MaterialMenuItem>
  )
}
