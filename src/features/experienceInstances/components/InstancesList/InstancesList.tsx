import React, { FC, useCallback, useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroll-component'
import { experienceInstancesSlice } from 'features/experienceInstances/store/experienceInstances.slice'
import {
  getDeleteInstanceRequestState,
  getExperienceInstances,
} from 'features/experienceInstances/store/experienceInstances.selectors'
import { LocalizationContext } from 'lib/context'
import { paths } from 'lib/navigation'
import { RequestState, Undefineable } from 'lib/types'
import { NoExperienceInstances } from '../NoExperienceInstances'
import { InstanceListItem } from '../InstanceListItem'
import { DeleteInstanceModal } from '../DeleteInstanceModal'
import './InstancesList.scss'

type Props = {
  experienceId: number
}

const Loader = () => <p>...</p>

export const InstancesList: FC<Props> = ({ experienceId }) => {
  const dispatch = useDispatch()
  const { t } = useContext(LocalizationContext)
  const [page, setPage] = useState(0)
  const [archiveModalOpen, setArchiveModalOpen] = useState(false)
  const [idToDelete, setIdToDelete] = useState<Undefineable<number>>()
  const experienceInstances = useSelector(getExperienceInstances)
  const deleteInstanceRequestState = useSelector(getDeleteInstanceRequestState)
  const history = useHistory()

  const next = () => {
    if (!experienceInstances.data.length) {
      return
    }

    const newPage = page + 1
    setPage(newPage)
    dispatch(
      experienceInstancesSlice.actions.getInstancesOfExperience({
        experienceId,
        page: newPage,
      })
    )
  }

  const onRefresh = useCallback(() => {
    setPage(0)
    dispatch(
      experienceInstancesSlice.actions.getInstancesOfExperience({
        experienceId,
        page: 0,
      })
    )
  }, [dispatch, experienceId])

  const onClickSwitchInstances = () => {
    dispatch(experienceInstancesSlice.actions.resetInstancesOfExperience())
    history.push(paths.experiencePastInstances(experienceId))
  }

  const onClick = (instanceId: number) => {
    history.push(paths.experienceInstance(experienceId, instanceId))
  }

  const onBinClick = (instanceId: number) => {
    setIdToDelete(instanceId)
    setArchiveModalOpen(true)
  }

  const onModalClose = useCallback(() => {
    dispatch(
      experienceInstancesSlice.actions.setDeleteInstanceRequestState(
        RequestState.Initial
      )
    )
    setIdToDelete(undefined)
    setArchiveModalOpen(false)
    onRefresh()
  }, [dispatch, onRefresh])

  useEffect(() => {
    dispatch(experienceInstancesSlice.actions.resetInstancesOfExperience())
    onRefresh()
  }, [onRefresh, dispatch])

  useEffect(() => {
    if (deleteInstanceRequestState === RequestState.Success) {
      onRefresh()
    }
  }, [deleteInstanceRequestState, onRefresh])

  return !experienceInstances.data.length ? (
    <NoExperienceInstances experienceId={experienceId} />
  ) : (
    <div style={{ width: '100%', justifySelf: 'flex-start' }}>
      <DeleteInstanceModal
        open={archiveModalOpen}
        onClose={onModalClose}
        idToDelete={idToDelete}
      />
      <div className="instances__switch-btn" onClick={onClickSwitchInstances}>
        {t.experience.showPastInstancesCTA}
      </div>
      <InfiniteScroll
        next={next}
        pullDownToRefresh
        pullDownToRefreshThreshold={10}
        refreshFunction={onRefresh}
        hasMore={experienceInstances.total > experienceInstances.data.length}
        loader={Loader}
        dataLength={experienceInstances.data.length}
        style={{ overflow: 'hidden' }}
      >
        {experienceInstances.data.map((experienceInstance, idx) => (
          <InstanceListItem
            key={idx}
            experienceInstance={experienceInstance}
            onClick={() => onClick(experienceInstance.id)}
            showBin
            onBinClick={() => onBinClick(experienceInstance.id)}
          />
        ))}
      </InfiniteScroll>
    </div>
  )
}
