import React, { FC } from 'react'
import { SelectOption } from 'components/SelectOption/SelectOption'
import { getLabelsTranslationByLocale } from 'features/locale/utils'
import { initializeSlice } from 'features/initialize/initialize.slice'
import { store } from 'lib/store/store'
import { withRtl } from 'lib/utils'

type Props = {
  title: string
  array: any
}

export const SelectOptionListPayment: FC<Props> = ({ title, array }) => {
  return (
    <div className={withRtl('selectOptionList')}>
      <p className="helper-label">{title}</p>
      {array?.map(({ title, isChecked, id }: any, idx: number) => (
        <SelectOption
          key={id}
          title={getLabelsTranslationByLocale(title)}
          isChecked={isChecked}
          onPress={() => {
            store.dispatch(initializeSlice.actions.setFilter({ key: id }))
          }}
          className={'payments__select-option'}
        />
      ))}
    </div>
  )
}
