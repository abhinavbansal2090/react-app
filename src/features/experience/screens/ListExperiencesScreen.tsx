import React, { FC, useCallback, useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroll-component'
import { routes } from 'lib/navigation'
import { Undefineable } from 'lib/types'
import { Header } from 'components/Header'
import { ButtonBig } from 'components/Button/ButtonBig'
import { LocalizationContext } from 'lib/context'
import { experienceSlice } from '../store/experience.slice'
import { getMyExperiences } from '../store/experience.selector'
import { ArchiveModal, ExperienceListItem } from '../components'
import './ListExperiencesScreen.scss'

const Loader = () => <p>...</p>

export const ListExperiencesScreen: FC = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const myExperiences = useSelector(getMyExperiences)
  const { t } = useContext(LocalizationContext)
  const [page, setPage] = useState(0)
  const [showModal, setShowModal] = useState(false)
  const [idToArchive, setIdToArchive] = useState<Undefineable<number>>()

  const next = () => {
    if (!myExperiences?.data.length) {
      return
    }

    const newPage = page + 1
    setPage(newPage)
    dispatch(experienceSlice.actions.fetchExperienceMine({ Page: newPage }))
  }

  const onRefresh = useCallback(() => {
    setPage(0)
    dispatch(experienceSlice.actions.fetchExperienceMine({ Page: 0 }))
  }, [dispatch])

  const onArchiveClick = (id: number) => {
    dispatch(experienceSlice.actions.setArchiveError(undefined))
    setShowModal(true)
    setIdToArchive(id)
  }

  useEffect(() => {
    onRefresh()
  }, [onRefresh])

  const renderList = () => (
    <InfiniteScroll
      next={next}
      pullDownToRefresh
      pullDownToRefreshThreshold={10}
      refreshFunction={onRefresh}
      hasMore={(myExperiences?.total || 0) > (myExperiences?.data?.length || 0)}
      loader={Loader}
      dataLength={myExperiences?.data.length || 0}
      style={{ overflow: 'hidden' }}
    >
      {myExperiences?.data.map((experience, idx) => (
        <ExperienceListItem
          key={idx}
          onArchiveClick={onArchiveClick}
          experience={experience}
        />
      ))}
    </InfiniteScroll>
  )

  const renderAddNewButton = () => (
    <div className="list-experiences-screen__add-new-container">
      <p className="list-experiences-screen__title">
        {t.experience.noResultsCTA}
      </p>
      <ButtonBig
        title={t.experience.addExperienceBigCTA}
        onPress={() => history.push(routes.addExperience)}
        customStyle={{ flexShrink: 1 }}
      />
    </div>
  )

  return (
    <>
      <Header
        showAdd
        title={t.experience.manageExperiences}
        hideBackButton
        backButtonVariant={'back'}
        onBackDirection={routes.home}
      />
      <div className={'container container-fullheight list-experiences-screen'}>
        {myExperiences?.data.length ? renderList() : renderAddNewButton()}
        <ArchiveModal
          isOpen={showModal}
          setIdToArchive={setIdToArchive}
          setIsOpen={setShowModal}
          idToArchive={idToArchive}
          onConfirmArchive={() => setPage(0)}
        />
      </div>
    </>
  )
}
