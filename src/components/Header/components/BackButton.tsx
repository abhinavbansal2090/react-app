import React, { FC, useContext } from 'react'
import { icons } from 'assets'
import { LocalizationContext } from 'lib/context'

type Props = {
  onClick: () => void
}

export const BackButton: FC<Props> = ({ onClick }) => {
  const { isRtl } = useContext(LocalizationContext)

  return (
    <img
      style={{
        cursor: 'pointer',
        height: 14,
        width: 8,
        position: 'absolute',
        left: isRtl ? 'unset' : '16px',
        right: isRtl ? '16px' : 'unset',
      }}
      onClick={onClick}
      src={isRtl ? icons.backArrowRight : icons.backArrowLeft}
      alt={'back'}
    />
  )
}
