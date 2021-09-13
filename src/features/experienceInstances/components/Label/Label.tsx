import React, { FC } from 'react'
import { Typography } from '@material-ui/core'
import './Label.scss'
import { withRtl } from 'lib/utils'

export const Label: FC<{ name: string }> = ({ name }) => (
  <div className={withRtl('add-instance-label__container')}>
    <Typography className={withRtl('add-instance-label__text')}>
      {name}
    </Typography>
  </div>
)
