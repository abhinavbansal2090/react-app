import React, { FC, useContext } from 'react'
import { CircularProgress } from '@material-ui/core'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useScript } from 'lib/hooks/useScript'
import { paths } from 'lib/navigation'
import { Header } from 'components/Header'
import { LocalizationContext } from 'lib/context'
import { getExperienceName } from 'features/experienceInstances/store/experienceInstances.selectors'
import { getLanguageId } from 'features/locale/store/locale.selector'
import { ExperienceRoutingParams } from 'lib/types/experience'
import { Map } from './components/Map'

export const MapScreen: FC = () => {
  const [coreLoaded] = useScript(
    'https://js.api.here.com/v3/3.1/mapsjs-core.js',
    'core'
  )
  const [serviceLoaded] = useScript(
    'https://js.api.here.com/v3/3.1/mapsjs-service.js',
    'service'
  )
  const [eventsLoaded] = useScript(
    'https://js.api.here.com/v3/3.1/mapsjs-mapevents.js',
    'events'
  )
  const [uiLoaded] = useScript(
    'https://js.api.here.com/v3/3.1/mapsjs-ui.js',
    'ui'
  )
  const [clusterLoaded] = useScript(
    'https://js.api.here.com/v3/3.1/mapsjs-clustering.js',
    'cluster'
  )
  const [dataLoaded] = useScript(
    'https://js.api.here.com/v3/3.1/mapsjs-data.js',
    'data'
  )
  const {
    t: { business },
  } = useContext(LocalizationContext)
  const { experienceId: expIdString } = useParams<ExperienceRoutingParams>()
  const experienceId = Number.parseInt(expIdString)
  const languageId = useSelector(getLanguageId)
  const experienceName = useSelector(
    getExperienceName(experienceId, languageId)
  )
  return [
    coreLoaded,
    serviceLoaded,
    eventsLoaded,
    uiLoaded,
    clusterLoaded,
    dataLoaded,
  ].every(Boolean) ? (
    <Map />
  ) : (
    <>
      <Header
        hideBackButton={false}
        title={business.maps.meetingPoint}
        subTitle={experienceName}
        backButtonVariant="back"
        onBackDirection={paths.addExperienceInstance(experienceId)}
      />
      <div className="container container-fullheight  map__container loader">
        <CircularProgress />
      </div>
    </>
  )
}
