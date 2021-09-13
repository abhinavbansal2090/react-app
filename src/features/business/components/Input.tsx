import React, { CSSProperties, FC } from 'react'
import TextField from '@material-ui/core/TextField'

import './Input.scss'

type Props = {
  type?: string
  name?: string
  label: string
  placeholder: string
  onLeave?: any
  value: any
  error?: boolean
  onChange: any
  multiline?: boolean
  rows?: number
  errorText?: string
  style?: CSSProperties
}

export const Input: FC<Props> = ({
  label,
  type = 'text',
  name,
  placeholder,
  value,
  onLeave,
  errorText = '',
  error = false,
  onChange,
  multiline = false,
  rows = 8,
  style,
}) => {
  return (
    <>
      <TextField
        className="input-full-width standard-full-width"
        label={label}
        type={type}
        error={error}
        onBlur={onLeave}
        name={name ? name : label}
        multiline={multiline}
        rows={rows}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
        style={style}
      />
      <p className="input__error">{errorText}</p>
    </>
  )
}
