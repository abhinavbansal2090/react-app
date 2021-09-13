import React, { FC } from 'react'
import { useHistory } from 'react-router-dom'
import { Header } from 'components/Header/Header'
import { MenuItem } from 'features/business/components/MenuItem'
import { routes } from 'lib/navigation'

import './BusinessMenuScreen.scss'

type Props = {}

export const BusinessMenuScreen: FC<Props> = () => {
  const history = useHistory()

  return (
    <>
      <Header onBackDirection={routes.manage} title={'Business'} />
      <div className="container container-fullheight">
        <MenuItem
          placeholder="Manage experiences"
          onPress={() => {
            history.push(routes.manage)
          }}
        />
      </div>
    </>
  )
}
