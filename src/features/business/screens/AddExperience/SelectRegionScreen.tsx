import { useSelector } from 'react-redux'
import React, { FC, useContext } from 'react'
import { LocalizationContext } from 'lib/context'
import { Header } from 'components/Header/Header'
import { getRegions } from 'features/business/store/business.selectors'
import { HelperText } from 'features/business/components/HelperText'
import { Search } from 'features/business/components/Search'
import { FiltersGroups } from 'features/business/store/business.slice'
import { ButtonBig } from 'components/Button/ButtonBig'
import { isSelectedFilter } from 'lib/utils/filters'

type Props = {
  step: number
  updateStep: any
  onClickBack: any
}

export const SelectRegionScreen: FC<Props> = ({
  step,
  updateStep,
  onClickBack,
}) => {
  const { t } = useContext(LocalizationContext)
  const regions = useSelector(getRegions)

  return (
    <>
      <Header
        title={t.business.steps.region}
        subTitle={`${t.business.step} ${step} ${t.business.of} 7`}
        hideBackButton={false}
        backButtonVariant={'close'}
        onBackAdditional={() => onClickBack(true)}
        onBackHistory={false}
      />
      <div className="select-category container container-fullheight container-fullheight-withButton">
        <div className="select-category__list">
          <HelperText text={t.business.helper.region} />
          <Search
            array={regions}
            placeholder={t.business.search}
            type={FiltersGroups.Regions}
          />
        </div>
        <ButtonBig
          title={`${t.business.continue} >`}
          backButton
          type="full"
          backButtonAction={() => {
            updateStep(1)
          }}
          disabled={!isSelectedFilter(regions)}
          onPress={() => {
            updateStep(3)
          }}
        />
      </div>
    </>
  )
}
