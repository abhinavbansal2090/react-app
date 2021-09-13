import React, { FC, useContext, useRef, useState } from 'react'
import { IconButton } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import { LocalizationContext } from 'lib/context'
import { icons } from 'assets'
import { businessSlice } from 'features/business/store/business.slice'

type Props = {
  order: number
}

export const PhotoItem: FC<Props> = ({ order }) => {
  const {
    t: { business },
  } = useContext(LocalizationContext)
  const dispatch = useDispatch()
  const [showText, updateShowText] = useState(true)
  const preview = useRef<HTMLLabelElement>(null)
  const handleFileSelected = (e: any) => {
    const files: File[] = e.target.files
    if (files[0]) {
      setPreview(files[0])
      dispatch(businessSlice.actions.setImage({ order, image: files[0] }))
    }
  }

  const fileDrop = (e: any) => {
    e.preventDefault()
    const files = e.dataTransfer.files
    if (files[0]) {
      setPreview(files[0])
      dispatch(businessSlice.actions.setImage({ order, image: files[0] }))
    }
  }
  const setPreview = (file: File) => {
    const reader = new FileReader()
    updateShowText(false)
    reader.readAsDataURL(file)
    reader.onloadend = function (e) {
      if (
        preview.current &&
        reader.result &&
        typeof reader.result === 'string'
      ) {
        preview.current.style.backgroundImage = `url(${reader.result})`
      }
    }
  }
  const preventOnDrag = (e: any) => {
    e.preventDefault()
  }

  return (
    <div className="photos__item">
      <input
        onChange={handleFileSelected}
        accept="image/*"
        id={`file-${order}`}
        type="file"
      />
      <label
        onDragOver={preventOnDrag}
        onDragEnter={preventOnDrag}
        onDragLeave={preventOnDrag}
        onDrop={fileDrop}
        ref={preview}
        className="photos__item__label"
        htmlFor={`file-${order}`}
      >
        {showText ? (
          <IconButton component="span" className="photos__item__text">
            <img src={icons.plus} alt="icon plus" />
            <p>{business.addPhoto}</p>
          </IconButton>
        ) : (
          ''
        )}
      </label>
    </div>
  )
}
