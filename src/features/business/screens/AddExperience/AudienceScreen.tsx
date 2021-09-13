import React, { FC, useContext } from 'react'
import { useSelector } from 'react-redux'
import { LocalizationContext } from 'lib/context'
import { Header } from 'components/Header/Header'
import { ButtonBig } from 'components/Button/ButtonBig'
import { isSelectedFilter } from 'lib/utils/filters'
import { HelperText } from '../../components/HelperText'
import {
  getAgeRestrictions,
  getDifficultyLevels,
  getGenderRestrictions,
} from '../../store/business.selectors'

import { FiltersGroups } from '../../store/business.slice'
import { SelectOptionList } from '../../components/SelectOptionList'

type Props = {
  step: number
  updateStep: any
  onClickBack: any
}

export const AudienceScreen: FC<Props> = ({
  step,
  updateStep,
  onClickBack,
}) => {
  const {
    t: { business },
  } = useContext(LocalizationContext)
  const genders = useSelector(getGenderRestrictions)
  const age = useSelector(getAgeRestrictions)
  const difficultyLevels = useSelector(getDifficultyLevels)

  return (
    <>
      <Header
        title={business.steps.audience}
        hideBackButton={false}
        backButtonVariant={'close'}
        subTitle={`${business.step} ${step} ${business.of} 7`}
        onBackAdditional={() => onClickBack(true)}
        onBackHistory={false}
      />
      <div className="audience container container-fullheight container-fullheight-withButton">
        <div className="audience__list">
          <HelperText text={business.helper.audience} />
          <SelectOptionList
            title={business.placeholders.labels.gender}
            array={genders}
            type={FiltersGroups.GenderRestrictions}
          />
          <SelectOptionList
            title={business.placeholders.labels.age}
            array={age}
            type={FiltersGroups.AgeRestrictions}
          />
          <SelectOptionList
            title={business.placeholders.labels.difficultyLevel}
            array={difficultyLevels}
            type={FiltersGroups.DifficultyLevels}
          />
        </div>
        <ButtonBig
          backButton
          backButtonAction={() => {
            updateStep(4)
          }}
          title={`${business.continue} >`}
          type="full"
          disabled={[
            !isSelectedFilter(genders),
            !isSelectedFilter(age),
            !isSelectedFilter(difficultyLevels),
          ].some(Boolean)}
          onPress={() => {
            updateStep(6)
          }}
        />
      </div>
    </>
  )
}
