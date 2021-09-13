import { useSelector } from 'react-redux'
import React, { FC, useContext } from 'react'
import { LocalizationContext } from 'lib/context'
import { Header } from 'components/Header/Header'
import {
  getPlaces,
  getRegions,
} from 'features/business/store/business.selectors'
import { HelperText } from 'features/business/components/HelperText'
import { Search } from 'features/business/components/Search'
import { FiltersGroups } from 'features/business/store/business.slice'
import { ButtonBig } from 'components/Button/ButtonBig'
import { getSelectedIds, isSelectedFilter } from 'lib/utils/filters'

type Props = {
  step: number
  updateStep: any
  onClickBack: any
}

export const LocationScreen: FC<Props> = ({
  step,
  updateStep,
  onClickBack,
}) => {
  const { t } = useContext(LocalizationContext)
  const regions = useSelector(getRegions)
  const selectedRegions = getSelectedIds(regions)
  const places = useSelector(getPlaces)

  const getActivePlaces = () => {
    return places?.filter((place) => {
      if (place.regionId)
        if (selectedRegions.includes(place.regionId)) return place
    })
  }
  return (
    <>
      <Header
        title={t.business.steps.locations}
        subTitle={`${t.business.step} ${step} ${t.business.of} 7`}
        hideBackButton={false}
        backButtonVariant={'close'}
        onBackAdditional={() => onClickBack(true)}
        onBackHistory={false}
      />
      <div className="select-category container container-fullheight container-fullheight-withButton">
        <div className="select-category__list">
          <HelperText text={t.business.helper.locations} />
          <Search
            array={getActivePlaces()}
            placeholder={t.business.search}
            type={FiltersGroups.Places}
          />
        </div>
        <ButtonBig
          title={`${t.business.continue} >`}
          backButton
          type="full"
          backButtonAction={() => {
            updateStep(2)
          }}
          disabled={!isSelectedFilter(places)}
          onPress={() => {
            updateStep(4)
          }}
        />
      </div>
    </>
  )
}
