import React, { FC, useState } from 'react'
import { InputBase } from '@material-ui/core'
import { icons } from 'assets'

import './SearchBar.scss'

type Props = {
  textValue: string
  placeholder: string
  onEnter?: () => void
  onChangeText: (text: string) => void
  onFocus?: () => void
  onBlur?: () => void
}

export const SearchBar: FC<Props> = ({
  onChangeText,
  placeholder,
  textValue,
  onEnter,
  onBlur,
  onFocus,
}) => {
  const [active, setActive] = useState(false)

  const _onChangeText = (event: any) => {
    onChangeText(event.target.value)
  }

  return (
    <div className="searchBar">
      <div className="searchBar-icon">
        <img
          src={active ? icons.searchTinted : icons.searchLight}
          alt="search Icon"
        />
      </div>
      <InputBase
        onKeyPress={(ev) => {
          if (ev.key === 'Enter') {
            if (onEnter) onEnter()
            ev.preventDefault()
          }
        }}
        onFocus={() => {
          setActive(true)

          if (onFocus) {
            onFocus()
          }
        }}
        onBlur={() => {
          setActive(false)

          if (onBlur) {
            onBlur()
          }
        }}
        value={textValue}
        onChange={_onChangeText}
        placeholder={placeholder}
      />
    </div>
  )
}
