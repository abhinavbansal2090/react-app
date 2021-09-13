import React, { FC, useContext } from 'react'
import { useSelector } from 'react-redux'
import { LocalizationContext } from 'lib/context'
import { Header } from 'components/Header/Header'
import { ButtonBig } from 'components/Button/ButtonBig'
import { isSelectedFilter } from 'lib/utils/filters'
import { FiltersGroups } from '../../store/business.slice'
import { getActivities } from '../../store/business.selectors'
import { Search } from '../../components/Search'
import { HelperText } from '../../components/HelperText'

type Props = {
  step: number
  updateStep: any
  onClickBack: any
}

export const ActivitiesScreen: FC<Props> = ({
  step,
  updateStep,
  onClickBack,
}) => {
  const { t } = useContext(LocalizationContext)
  const activities = useSelector(getActivities)

  return (
    <>
      <Header
        title={t.business.steps.activities}
        subTitle={`${t.business.step} ${step} ${t.business.of} 7`}
        hideBackButton={false}
        backButtonVariant={'close'}
        onBackAdditional={() => onClickBack(true)}
        onBackHistory={false}
      />
      <div className="select-category container container-fullheight container-fullheight-withButton">
        <div className="select-category__list">
          <HelperText text={t.business.helper.activities} />
          <Search
            array={activities}
            placeholder={t.business.search}
            type={FiltersGroups.Activities}
          />
        </div>
        <ButtonBig
          title={`${t.business.continue} >`}
          backButton
          backButtonAction={() => {
            updateStep(5)
          }}
          type="full"
          disabled={!isSelectedFilter(activities)}
          onPress={() => {
            updateStep(7)
          }}
        />
      </div>
    </>
  )
}
