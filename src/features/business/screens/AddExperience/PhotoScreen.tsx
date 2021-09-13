import React, { FC, useContext } from 'react'
import { useSelector } from 'react-redux'
import { LocalizationContext } from 'lib/context'
import { Header } from 'components/Header/Header'
import { ButtonBig } from 'components/Button/ButtonBig'
import { HelperText } from 'features/business/components/HelperText'
import { getImages } from 'features/business/store/business.selectors'
import { store } from 'lib/store/store'
import { businessSlice } from 'features/business/store/business.slice'
import { PhotoItem } from '.'

import './PhotoScreen.scss'

type Props = {
  step: number
  updateStep: any
  onClickBack: any
}

export const PhotoScreen: FC<Props> = ({ step, updateStep, onClickBack }) => {
  const {
    t: { business },
  } = useContext(LocalizationContext)
  const images = [0, 1, 2, 3, 4, 5]
  const photos = useSelector(getImages)

  return (
    <>
      <Header
        title={business.steps.photos}
        hideBackButton={false}
        backButtonVariant={'close'}
        subTitle={`${business.step} ${step} ${business.of} 7`}
        onBackAdditional={() => onClickBack(true)}
        onBackHistory={false}
      />
      <div className="container photos container-fullheight container-fullheight-withButton">
        <HelperText text={business.helper.photos} />

        <div className="photos__container">
          {images.map((idx) => (
            <PhotoItem order={idx} key={idx} />
          ))}
        </div>
        <ButtonBig
          title={`${business.continue} >`}
          backButton
          type="full"
          disabled={Object.keys(photos).length === 0}
          backButtonAction={() => {
            store.dispatch(businessSlice.actions.clearImages())
            updateStep(6)
          }}
          onPress={() => {
            updateStep(8)
          }}
        />
      </div>
    </>
  )
}
