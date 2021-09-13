import React, { FC, useContext, useEffect } from 'react'
import { Modal } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { ButtonBig } from 'components/Button/ButtonBig'
import { LocalizationContext } from 'lib/context'
import { RequestState } from 'lib/types'
import { getWebView } from 'lib/utils'
import { postMessageNative } from 'lib/utils/postMessage'
import {
  experienceInstancesSlice,
  getDeleteInstanceRequestState,
} from '../../store'

import './DeleteInstanceModal.scss'

type Props = {
  idToDelete?: number
  open: boolean
  onClose: () => void
}

export const DeleteInstanceModal: FC<Props> = ({
  onClose,
  open,
  idToDelete,
}) => {
  const dispatch = useDispatch()
  const { t } = useContext(LocalizationContext)
  const deleteInstanceRequestState = useSelector(getDeleteInstanceRequestState)

  const onClickDelete = () => {
    if (idToDelete) {
      dispatch(experienceInstancesSlice.actions.deleteInstance(idToDelete))
    }
  }

  const onClickContactSupport = () => {
    if (getWebView()) {
      postMessageNative('mail:turky_997@hotmail.com')
    } else {
      window.open('mailto:turky_997@hotmail.com', '_self')
    }
  }
  const onClickGoBack = () => {
    onClose()
  }

  useEffect(() => {
    if (deleteInstanceRequestState === RequestState.Success) {
      onClose()
    }
  }, [deleteInstanceRequestState, onClose])

  return (
    <Modal onClose={onClose} open={open} className="archive-instance-modal">
      <div className="archive-instance-modal__container">
        <p className="archive-modal__question">
          {t.experience.deleteInstance.deleteInstance}
        </p>
        <p className="archive-modal__disclaimer">
          {deleteInstanceRequestState === RequestState.Error
            ? t.experience.deleteInstance.errorAlreadyBooked
            : t.experience.deleteInstance.disclaimer}
        </p>
        {deleteInstanceRequestState === RequestState.Error ? (
          <ButtonBig
            onPress={onClickContactSupport}
            title={t.experience.deleteInstance.contactSupportCTA}
            customStyle={{ marginBottom: '20px' }}
          />
        ) : (
          <ButtonBig
            disabled={deleteInstanceRequestState === RequestState.IsFetching}
            onPress={onClickDelete}
            variant="purple"
            title={t.experience.deleteInstance.deleteInstanceCTA}
            customStyle={{ marginBottom: '20px' }}
          />
        )}
        <ButtonBig
          onPress={onClickGoBack}
          variant={'outlined'}
          title={t.experience.deleteInstance.goBackCTA}
          customStyle={{ marginBottom: '20px' }}
        />
      </div>
    </Modal>
  )
}
