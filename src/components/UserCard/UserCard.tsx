import React, { FC, useContext } from 'react'
import { icons } from 'assets'
import { DARK_GREY } from 'lib/constants/colors'
import { LocalizationContext } from 'lib/context'
import { StyledText } from '../StyledText/StyledText'

type Props = {
  firstName: string
  lastName: string
  textColor?: string
  fontWeight?: number
}

export const UserCard: FC<Props> = ({
  firstName,
  lastName,
  fontWeight = 500,
  textColor = DARK_GREY,
}) => {
  const { isRtl } = useContext(LocalizationContext)

  const ProviderAvatar = () => (
    <img
      src={icons.avatar}
      alt={'avatar'}
      style={{
        width: 36,
        height: 36,
      }}
    />
  )
  const ProviderName = () => (
    <StyledText
      style={{ padding: '0 16px', color: textColor, fontWeight: fontWeight }}
    >
      {isRtl ? `${lastName} ${firstName}` : `${firstName} ${lastName}`}
    </StyledText>
  )

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: isRtl ? 'row-reverse' : 'row',
        alignItems: 'center',
      }}
    >
      <ProviderAvatar />
      <ProviderName />
    </div>
  )
}
