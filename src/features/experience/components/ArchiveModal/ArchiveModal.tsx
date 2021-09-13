import React, { FC, useContext, useState } from 'react'
import { Modal } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { ButtonBig } from 'components/Button/ButtonBig'
import { LocalizationContext } from 'lib/context'
import './ArchiveModal.scss'
import { getArchiveError } from '../../store/experience.selector'
import { experienceSlice } from '../../store/experience.slice'

type Props = {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  idToArchive?: number
  setIdToArchive: (id?: number) => void
  onConfirmArchive: () => void
}

export const ArchiveModal: FC<Props> = ({
  isOpen,
  setIsOpen,
  idToArchive,
  onConfirmArchive,
  setIdToArchive,
}) => {
  const dispatch = useDispatch()
  const [archiveButtonClicked, setArchiveButtonClicked] = useState(false)
  const archiveError = useSelector(getArchiveError)
  const {
    t: {
      experience: { archiveModal },
    },
  } = useContext(LocalizationContext)
  const onBackPress = () => {
    setIsOpen(false)
    setIdToArchive(undefined)
    setArchiveButtonClicked(false)
  }
  const onArchivePress = () => {
    if (idToArchive) {
      onConfirmArchive()
      dispatch(
        experienceSlice.actions.archiveExperience({ experienceId: idToArchive })
      )
      setArchiveButtonClicked(true)
    }
  }

  const renderArchiveButton = () => {
    if (!archiveButtonClicked) {
      return (
        <ButtonBig
          customStyle={{ marginBottom: '20px' }}
          variant={'purple'}
          title={archiveModal.archiveCTA}
          onPress={onArchivePress}
        />
      )
    }

    return archiveError ? (
      <p className="archive-modal__archive-msg archive-modal__archive-msg--error">
        {archiveError}
      </p>
    ) : (
      <p className="archive-modal__archive-msg">
        {archiveModal.archiveSuccess}
      </p>
    )
  }

  return (
    <Modal open={isOpen} className="archive-modal" onClose={onBackPress}>
      <div className="archive-modal__container">
        <p className="archive-modal__question">{archiveModal.question}</p>
        <p className="archive-modal__disclaimer">{archiveModal.disclaimer}</p>
        {renderArchiveButton()}
        <ButtonBig
          customStyle={{ marginBottom: '20px' }}
          variant={'outlined'}
          title={archiveModal.goBackCTA}
          onPress={onBackPress}
        />
      </div>
    </Modal>
  )
}
