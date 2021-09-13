import React, { FC } from 'react'
import { SelectOption } from 'components/SelectOption/SelectOption'
import { getLabelsTranslationByLocale } from 'features/locale/utils'
import { store } from 'lib/store/store'
import { withRtl } from 'lib/utils'
import { businessSlice, FiltersGroups } from '../store/business.slice'
import './SelectOptionList.scss'

type Props = {
  title: string
  array: any
  type: FiltersGroups
}

export const SelectOptionList: FC<Props> = ({ title, array, type }) => {
  return (
    <div className={withRtl('selectOptionList')}>
      <p className="helper-label">{title}</p>
      {array?.map(({ title, isChecked, id }: any, idx: number) => (
        <SelectOption
          key={id}
          title={getLabelsTranslationByLocale(title)}
          isChecked={isChecked}
          onPress={() =>
            store.dispatch(
              businessSlice.actions.setFilter({
                type: type,
                key: idx,
              })
            )
          }
        />
      ))}
    </div>
  )
}
