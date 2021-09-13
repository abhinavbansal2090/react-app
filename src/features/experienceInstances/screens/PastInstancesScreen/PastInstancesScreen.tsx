import React, { FC, useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroll-component'
import { experienceInstancesSlice } from 'features/experienceInstances/store/experienceInstances.slice'
import {
  getExperienceInstances,
  getExperienceName,
} from 'features/experienceInstances/store/experienceInstances.selectors'
import { getLanguageId } from 'features/locale/store/locale.selector'
import { paths } from 'lib/navigation'
import { ExperienceRoutingParams } from 'lib/types/experience'
import { Header } from 'components/Header'
import { InstanceListItem } from '../../components'

const Loader = () => <p>...</p>

export const PastInstancesScreen: FC = () => {
  const dispatch = useDispatch()
  const { experienceId: expIdString } = useParams<ExperienceRoutingParams>()
  const experienceId = Number.parseInt(expIdString)
  const [page, setPage] = useState(0)
  const experienceInstances = useSelector(getExperienceInstances)
  const languageId = useSelector(getLanguageId)
  const experienceName = useSelector(
    getExperienceName(experienceId, languageId)
  )
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
        pastInstances: true,
      })
    )
  }

  const onRefresh = useCallback(() => {
    setPage(0)
    dispatch(
      experienceInstancesSlice.actions.getInstancesOfExperience({
        experienceId,
        page: 0,
        pastInstances: true,
      })
    )
  }, [dispatch, experienceId])

  useEffect(() => {
    dispatch(experienceInstancesSlice.actions.resetInstancesOfExperience())
    onRefresh()
  }, [dispatch, onRefresh])

  return (
    <>
      <Header
        hideBackButton={false}
        backButtonVariant={'back'}
        title={experienceName}
      />
      <div className="container container-fullheight">
        <div style={{ width: '100%', justifySelf: 'flex-start' }}>
          <InfiniteScroll
            next={next}
            pullDownToRefresh
            pullDownToRefreshThreshold={10}
            refreshFunction={onRefresh}
            hasMore={
              experienceInstances.total > experienceInstances.data.length
            }
            loader={Loader}
            dataLength={experienceInstances.data.length}
            style={{ overflow: 'hidden' }}
          >
            {experienceInstances.data.map((experienceInstance, idx) => (
              <InstanceListItem
                key={idx}
                experienceInstance={experienceInstance}
                onClick={() =>
                  history.push(
                    paths.experienceInstance(
                      experienceId,
                      experienceInstance.id
                    )
                  )
                }
              />
            ))}
          </InfiniteScroll>
        </div>
      </div>
    </>
  )
}
