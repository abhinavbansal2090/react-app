import React, { CSSProperties, FC, useContext } from 'react'

import { Changa, FONT_WEIGHTS } from 'lib/constants'
import { LocalizationContext } from 'lib/context'
import { getLineHeightByOS } from 'lib/utils'

export type CustomFontProps = {
  fontWeight?: keyof typeof FONT_WEIGHTS
  fontFamily?: Changa
  style?: CSSProperties
}

export type TextProps = CustomFontProps

export const StyledText: FC<TextProps> = (props: TextProps) => {
  const { fontFamily, fontWeight, style, ...otherProps } = props
  const { isRtl } = useContext(LocalizationContext)
  const chosenFontFamily =
    fontFamily || fontWeight ? FONT_WEIGHTS[fontWeight!] : Changa.regular

  return (
    <p
      style={{
        fontFamily: chosenFontFamily,
        direction: isRtl ? 'rtl' : 'ltr',
        fontSize: 16,
        lineHeight: `${getLineHeightByOS(16)}px`,
        ...style,
      }}
      {...otherProps}
    />
  )
}
