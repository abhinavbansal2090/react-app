import React, { FC, useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { ExperienceRoutingParams } from 'lib/types/experience'
import { LocalizationContext } from 'lib/context'
import { routes, paths } from 'lib/navigation'
import { Header } from 'components/Header'
import { getLanguageId } from 'features/locale/store/locale.selector'
import './ExperienceScreen.scss'
import { SegmentedControl } from 'components/SegmentedControl/SegmentedControl'
import { InstancesList } from 'features/experienceInstances/components/InstancesList'
import { capitalizeFirstLetter } from 'lib/utils'
import { LanguageIds } from 'lib/i18n'
import {
  getExperience,
  getExperienceName,
} from 'features/experienceInstances/store/experienceInstances.selectors'
import { ExperienceDetails } from '../../components/ExperienceDetails/ExperienceDetails'

export const ExperienceScreen: FC = () => {
  const {
    t: {
      experience: { instances, preview },
    },
  } = useContext(LocalizationContext)
  const { experienceId: expIdString } = useParams<ExperienceRoutingParams>()
  const experienceId = Number.parseInt(expIdString)
  const languageId = useSelector(getLanguageId)
  const experienceName = useSelector(
    getExperienceName(experienceId, languageId)
  )
  const experience = useSelector(getExperience(experienceId))
  const [selected, updateSelected] = useState(
    languageId === LanguageIds.English ? 1 : 0
  )
  const segments =
    languageId === LanguageIds.English
      ? [{ name: preview }, { name: capitalizeFirstLetter(instances) }]
      : [{ name: capitalizeFirstLetter(instances) }, { name: preview }]

  useEffect(() => {
    updateSelected(languageId === LanguageIds.English ? 1 : 0)
  }, [languageId])

  return (
    <>
      <Header
        hideBackButton={false}
        backButtonVariant={'back'}
        onBackDirection={routes.manage}
        title={experienceName}
        showAdd
        addBtnRoute={paths.addExperienceInstance(experienceId)}
      />
      <SegmentedControl
        segments={segments}
        selected={selected}
        updateSelected={updateSelected}
      />
      <div className={'container container-fullheight experience-screen'}>
        {(selected && languageId === LanguageIds.English) ||
        (!selected && languageId === LanguageIds.Arabic) ? (
          <InstancesList experienceId={experienceId} />
        ) : (
          experience && <ExperienceDetails experience={experience} />
        )}
      </div>
    </>
  )
}
