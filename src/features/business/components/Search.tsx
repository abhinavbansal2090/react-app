import React, { FC, useState } from 'react'
import { getLabelsTranslationByLocale } from 'features/locale/utils'
import { SelectOption } from 'components/SelectOption/SelectOption'
import { store } from 'lib/store/store'
import { businessSlice, FiltersGroups } from '../store/business.slice'
import { SearchBar } from './SearchBar'

type Props = {
  array: any
  placeholder: string
  type: FiltersGroups
}

export const Search: FC<Props> = ({ array, placeholder, type }) => {
  const [text, setText] = useState('')
  const renderArray = () => {
    let searchedArray = array
    if (text !== '') {
      searchedArray = array?.filter((item: any) => {
        return getLabelsTranslationByLocale(item.title)
          ?.toLowerCase()
          .includes(text.toLowerCase())
      })
    }
    return searchedArray?.map(
      ({ title, isChecked, iconEmoji, id }: any, index: number) => (
        <SelectOption
          key={id}
          icon={iconEmoji}
          title={getLabelsTranslationByLocale(title)}
          isChecked={isChecked}
          onPress={() =>
            store.dispatch(
              businessSlice.actions.setFilter({
                type: type,
                key: index,
              })
            )
          }
        />
      )
    )
  }
  return (
    <>
      <SearchBar
        textValue={text}
        placeholder={placeholder}
        onChangeText={setText}
      />
      {renderArray()}
    </>
  )
}
