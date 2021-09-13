import React, { FC } from 'react'
import { icons } from 'assets'

import './HelperText.scss'

type Props = {
  text: string
}

export const HelperText: FC<Props> = ({ text }) => {
  return (
    <div className="helper">
      <p>{text}</p>
      <img src={icons.info} alt="Icon info" />
    </div>
  )
}
