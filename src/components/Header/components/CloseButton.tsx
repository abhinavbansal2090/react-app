import React, { FC, useContext } from 'react'
import { icons } from 'assets'
import { LocalizationContext } from 'lib/context'

type Props = {
  onClick: () => void
}

export const CloseButton: FC<Props> = ({ onClick }) => {
  const { isRtl } = useContext(LocalizationContext)

  return (
    <img
      style={{
        cursor: 'pointer',
        height: 24,
        width: 24,
        position: 'absolute',
        left: isRtl ? 'unset' : 16,
        right: isRtl ? 16 : 'unset',
      }}
      onClick={onClick}
      src={icons.close}
      alt={'close'}
    />
  )
}
