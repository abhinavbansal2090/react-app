import React, { FC, useContext } from 'react'
import { useSelector } from 'react-redux'
import { LocalizationContext } from 'lib/context'
import { store } from 'lib/store/store'
import { Header } from 'components/Header/Header'
import { SelectOption } from 'components/SelectOption/SelectOption'
import { getLabelsTranslationByLocale } from 'features/locale/utils'
import { ButtonBig } from 'components/Button/ButtonBig'
import { isSelectedFilter } from 'lib/utils/filters'
import { HelperText } from '../../components/HelperText'
import { getCategories } from '../../store/business.selectors'
import { businessSlice, FiltersGroups } from '../../store/business.slice'
import './SelectCategoryScreen.scss'

type Props = {
  step: number
  updateStep: any
  onClickBack: any
}

export const SelectCategoryScreen: FC<Props> = ({
  step,
  updateStep,
  onClickBack,
}) => {
  const {
    t: { business },
  } = useContext(LocalizationContext)

  const categories = useSelector(getCategories)

  return (
    <>
      <Header
        title={business.steps.category}
        subTitle={`${business.step} ${step} ${business.of} 7`}
        hideBackButton={false}
        backButtonVariant={'close'}
        onBackAdditional={() => onClickBack(true)}
        onBackHistory={false}
      />

      <div className="select-category container container-fullheight container-fullheight-withButton">
        <div className="select-category__list">
          <HelperText text={business.helper.category} />
          {categories?.map(
            ({ title, isChecked, id, iconEmoji }: any, idx: number) => (
              <SelectOption
                key={id}
                icon={iconEmoji}
                title={getLabelsTranslationByLocale(title)}
                isChecked={isChecked}
                onPress={() =>
                  store.dispatch(
                    businessSlice.actions.setFilter({
                      type: FiltersGroups.Category,
                      key: idx,
                    })
                  )
                }
              />
            )
          )}
        </div>
        <ButtonBig
          title={`${business.continue} >`}
          backButton
          type="full"
          disabled={!isSelectedFilter(categories)}
          onPress={() => {
            updateStep(2)
          }}
        />
      </div>
    </>
  )
}
