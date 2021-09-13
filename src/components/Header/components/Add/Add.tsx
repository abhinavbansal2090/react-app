import React, { FC, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { routes } from 'lib/navigation'
import { icons } from 'assets'
import { LocalizationContext } from 'lib/context'
import './Add.scss'

type Props = {
  onClickRoute?: string
}

export const Add: FC<Props> = ({ onClickRoute = routes.addExperience }) => {
  const { t, isRtl } = useContext(LocalizationContext)
  const history = useHistory()

  return (
    <div
      className="add"
      style={{
        position: 'absolute',
        right: isRtl ? 'unset' : 16,
        left: isRtl ? 16 : 'unset',
      }}
      onClick={() => history.push(onClickRoute)}
    >
      <img
        src={icons.plus}
        alt={t.experience.addExperienceCTA}
        className="add__plus-icon"
      />
      <p>{t.experience.addExperienceCTA}</p>
    </div>
  )
}
