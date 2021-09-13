import React, { CSSProperties, FC, useContext } from 'react'
import { Button } from '@material-ui/core'

import './ButtonBig.scss'
import { useHistory } from 'react-router-dom'
import { withRtl } from '../../lib/utils'
import { LocalizationContext } from '../../lib/context'

type Props = {
  title: any
  disabled?: boolean
  backButton?: boolean
  backButtonText?: string
  backButtonAction?: () => void
  type?: 'normal' | 'full'
  position?: 'relative' | 'fixed'
  actionType?: 'button' | 'submit'
  variant?: 'normal' | 'outlined' | 'red' | 'purple'
  onPress?: any
  customStyle?: CSSProperties
}

export const ButtonBig: FC<Props> = ({
  title,
  disabled,
  onPress,
  type = 'normal',
  variant = 'normal',
  backButton = false,
  backButtonText,
  actionType = 'button',
  backButtonAction,
  position = 'relative',
  customStyle = {},
}) => {
  const history = useHistory()
  const {
    t: { business },
  } = useContext(LocalizationContext)

  return (
    <div
      className={withRtl(
        backButton ? 'ButtonBig-backButton' : 'ButtonBig-default'
      )}
    >
      {backButton ? (
        <Button
          className={`main ButtonBack ButtonBig  ${
            type === 'full' ? 'main-full' : ''
          } ${position === 'fixed' ? 'ButtonBig-fixed' : ''} `}
          style={{ position: position }}
          onClick={() => {
            backButtonAction ? backButtonAction() : history.goBack()
          }}
        >
          {backButtonText ?? `< ${business.helper.back}`}
        </Button>
      ) : (
        ''
      )}
      <Button
        type={actionType}
        className={`main ButtonBig ${variant} ${
          type === 'full' ? 'main-full' : ''
        } ${position === 'fixed' ? 'ButtonBig-fixed' : ''}`}
        style={{
          position: position,
          ...customStyle,
        }}
        onClick={onPress}
        disabled={disabled}
      >
        {title}
      </Button>
    </div>
  )
}
