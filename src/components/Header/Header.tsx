import React, { FC } from 'react'

import './Header.scss'
import { useHistory } from 'react-router-dom'
import { Add, BackButton, CloseButton } from './components'

type Props = {
  title?: string
  subTitle?: string
  hideBackButton?: boolean
  hideBackButtonText?: boolean
  onBackAdditional?: any
  onBackHistory?: boolean
  onBackDirection?: any
  backButtonVariant?: 'close' | 'back'
  showAdd?: boolean
  addBtnRoute?: string
}

export const Header: FC<Props> = ({
  hideBackButton = true,
  subTitle,
  onBackAdditional,
  children,
  onBackDirection,
  onBackHistory = true,
  backButtonVariant,
  title,
  showAdd,
  addBtnRoute,
}) => {
  const history = useHistory()

  const onBackClick = () => {
    onBackAdditional && onBackAdditional()
    if (onBackHistory)
      onBackDirection ? history.push(onBackDirection) : history.goBack()
  }

  return (
    <div className="container container-top ">
      <div
        className={
          subTitle
            ? 'headerContainer-subtitle headerContainer'
            : 'headerContainer'
        }
      >
        {showAdd && <Add onClickRoute={addBtnRoute} />}
        <div className="headerContainer__subtitle">
          <h5 className="headerContainer__title">{title}</h5>
          <span>{subTitle}</span>
        </div>
        {!hideBackButton &&
          (backButtonVariant === 'back' ? (
            <BackButton onClick={onBackClick} />
          ) : (
            <CloseButton onClick={onBackClick} />
          ))}
      </div>
      {children}
    </div>
  )
}
