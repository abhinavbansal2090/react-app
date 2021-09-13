import React, { createRef, FC, useContext, useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { apiKey } from 'lib/configs/geocoding/constans'
import { ButtonBig } from 'components/Button/ButtonBig'
import { paths } from 'lib/navigation'
import { Header } from 'components/Header'
import { ExperienceRoutingParams } from 'lib/types/experience'
import { getExperienceName } from 'features/experienceInstances/store/experienceInstances.selectors'
import { getLanguageId } from 'features/locale/store/locale.selector'
import { LocalizationContext } from 'lib/context'
import markerIcon from 'assets/icons/marker.svg'
import { SearchBar } from 'features/business/components/SearchBar'
import { LanguageIds } from 'lib/i18n'
import { ExperienceMap } from 'lib/models'
import { experienceInstancesSlice } from 'features/experienceInstances/store/experienceInstances.slice'
import { en } from 'lib/i18n/en'
import { ar } from 'lib/i18n/ar'

import './Map.scss'

type ServiceType = {
  geocode?: any
}
type Cords = {
  lat: number
  lng: number
}

export const Map: FC = () => {
  const mapContainer = createRef<HTMLDivElement>()
  const [text, setText] = useState('')
  const [map, setMap] = useState({})
  const dispatch = useDispatch()
  const [service, setService] = useState<ServiceType>({})
  const [Marker, updateMarker] = useState<ExperienceMap>({})
  const { experienceId: expIdString } = useParams<ExperienceRoutingParams>()
  const experienceId = Number.parseInt(expIdString)
  const languageId = useSelector(getLanguageId)
  const history = useHistory()
  const {
    t: { business },
  } = useContext(LocalizationContext)
  const experienceName = useSelector(
    getExperienceName(experienceId, languageId)
  )

  const loadMap = () => {
    const svgIcon = new H.map.Icon(markerIcon)

    const setMarker = ({ lat, lng }: Cords, map: any) => {
      map.removeObjects(map.getObjects())

      const pin = new H.map.Marker({ lat, lng }, { icon: svgIcon })
      map.addObject(pin)
    }
    const onTap = (evt: any, map: any) => {
      const position = map.screenToGeo(
        evt.currentPointer.viewportX,
        evt.currentPointer.viewportY
      )

      if (evt.target.data) {
        const props = evt.target.getData().properties
        if (props['name:ar'] && props['name:en']) {
          updateMarker({
            latitude: position.lat,
            longitude: position.lng,
            rallyLocation: [
              { languageId: LanguageIds.English, location: props['name:en'] },
              { languageId: LanguageIds.Arabic, location: props['name:ar'] },
            ],
          })
          setMarker(position, map)
        }
      } else {
        updateMarker({
          latitude: position.lat,
          longitude: position.lng,
          rallyLocation: [
            {
              languageId: LanguageIds.English,
              location: en.t.business.unnamedPlace,
            },
            {
              languageId: LanguageIds.Arabic,
              location: ar.t.business.unnamedPlace,
            },
          ],
        })
        setMarker(position, map)
      }
    }

    const platform = new H.service.Platform({
      apikey: apiKey,
    })
    const defaultLayers = platform.createDefaultLayers()
    const map = new H.Map(
      mapContainer.current,
      defaultLayers.vector.normal.map,
      {
        center: { lat: 24.774265, lng: 46.738586 },
        zoom: 6,
        pixelRatio: window.devicePixelRatio || 1,
      }
    )
    const resizeViewPort = () => map.getViewPort().resize()

    window.addEventListener('resize', resizeViewPort)

    new H.mapevents.Behavior(new H.mapevents.MapEvents(map))
    H.ui.UI.createDefault(map, defaultLayers)
    setService(platform.getSearchService())
    const provider = map.getBaseLayer().getProvider()
    const style = provider.getStyle()

    const changeListener = () => {
      if (style.getState() === H.map.Style.State.READY) {
        style.removeEventListener('change', changeListener)
        style.setInteractive(
          [
            'places',
            'roads',
            'pois',
            'earth',
            'water',
            'boundaries',
            'buildings',
            'road_labels',
            'landuse',
            'island_label',
          ],
          true
        )
        map.addEventListener('tap', (evt: any) => {
          onTap(evt, map)
        })
      }
    }
    style.addEventListener('change', changeListener)
    setMap(map)
    return resizeViewPort
  }

  useEffect(() => {
    const resizeViewPort = loadMap()
    return () => {
      window.removeEventListener('resize', resizeViewPort)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const searchMapByWord = (word: string, map: any) => {
    if (word.trim().length > 1) {
      service.geocode(
        {
          q: word,
        },
        (result: any) => {
          switch (result.items[0].localityType) {
            case 'city':
              map.setZoom(10)
              break
            default:
              map.setZoom(14)
              break
          }
          map.removeObjects(map.getObjects())
          updateMarker({})
          setCenter(result.items[0].position, map)
        },
        alert
      )
    }
  }

  const setCenter = ({ lat, lng }: Cords, map: any) => {
    map.setCenter({ lat, lng })
  }

  return (
    <>
      <Header
        hideBackButton={false}
        title={business.maps.meetingPoint}
        subTitle={experienceName}
        backButtonVariant="back"
        onBackDirection={paths.addExperienceInstance(experienceId)}
      />
      <div className="container container-fullheight  map__container">
        <div className="map__container-absolute map__container-absolute-top">
          <SearchBar
            textValue={text}
            placeholder={business.maps.search}
            onChangeText={setText}
            onEnter={() => {
              searchMapByWord(text, map)
            }}
          />
        </div>
        <div className="map" ref={mapContainer} />
        <div className="map__container-absolute map__container-absolute-bottom">
          {Object.keys(Marker).length !== 0 ? (
            <div className="absolute-box">
              <p>
                {Marker.rallyLocation
                  ? Marker.rallyLocation[LanguageIds.English - 1].location
                  : ''}
              </p>
              <p>
                {Marker.rallyLocation
                  ? Marker.rallyLocation[LanguageIds.Arabic - 1].location
                  : ''}
              </p>
            </div>
          ) : (
            ''
          )}
          <ButtonBig
            title={
              Object.keys(Marker).length === 0
                ? business.maps.pickAPoint
                : business.maps.continue
            }
            disabled={Object.keys(Marker).length === 0}
            onPress={() => {
              dispatch(experienceInstancesSlice.actions.setMap(Marker))
              history.push(paths.addExperienceInstance(experienceId))
            }}
          />
        </div>
      </div>
    </>
  )
}
