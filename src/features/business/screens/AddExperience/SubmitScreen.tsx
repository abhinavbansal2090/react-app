import React, { FC, useCallback, useContext, useEffect, useState } from 'react'
import moment from 'moment'
import { CircularProgress } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import { useStore } from 'react-redux'
import { LocalizationContext } from 'lib/context'
import { icons } from 'assets'
import { routes } from 'lib/navigation'
import { ButtonBig } from 'components/Button/ButtonBig'
import {
  getActivities,
  getSelectedDescriptions,
  getSelectedId,
} from 'lib/utils/filters'
import { ExperienceRepository } from 'services/experiences/repository'

import './SubmitScreen.scss'

export const SubmitScreen: FC = () => {
  const { t } = useContext(LocalizationContext)
  const [loading, updateLoading] = useState(true)
  const history = useHistory()
  const s = useStore().getState()

  const sendImagesSequential = useCallback(
    async (id: number, images: any[], idx = 0): Promise<any> => {
      await ExperienceRepository.addPhoto(images[idx], id)
      if (idx === images.length - 1) {
        updateLoading(false)
        return
      }
      const newIdx = idx + 1
      return await sendImagesSequential(id, images, newIdx)
    },
    []
  )

  const submitExperience = useCallback(async () => {
    const query = {
      descriptions: getSelectedDescriptions(s.business.name, s.business.desc),
      added: moment().format(),
      categoryId: getSelectedId(s.business.category),
      regionId: getSelectedId(s.business.regions),
      genderRestrictionId: getSelectedId(s.business.genderRestrictions),
      ageRestrictionId: getSelectedId(s.business.ageRestrictions),
      difficultyLevelId: getSelectedId(s.business.difficultyLevels),
      activityIds: getActivities(s.business.activities),
      poiId: getSelectedId(s.business.places),
      latitude: 39.958997,
      longitude: 7.801123,
    }

    const response = await ExperienceRepository.addExperience(query)
    if (response.ok) {
      const images = Object.values(s.business.images)
      if (images.length > 0) {
        sendImagesSequential(response.data.id, images)
      } else {
        updateLoading(false)
      }
    } else {
      console.log('Error', response.data.statusText)
    }
  }, [
    s.business.name,
    s.business.desc,
    s.business.category,
    s.business.regions,
    s.business.genderRestrictions,
    s.business.ageRestrictions,
    s.business.difficultyLevels,
    s.business.activities,
    s.business.places,
    s.business.images,
    sendImagesSequential,
  ])

  useEffect(() => {
    submitExperience()
  }, [submitExperience])

  const rednerSuccess = () => {
    return (
      <>
        <div className="submit__icon">
          <img src={icons.check} alt="Tick icon" />
        </div>
        <p className="submit__info">{t.business.submit.sucess}</p>
        <p className="submit__subtitle">{t.business.submit.verifed}</p>
        <ButtonBig
          title={t.business.continue}
          onPress={() => {
            history.push(routes.manage)
          }}
        />
      </>
    )
  }

  return (
    <div className="submit container container-fullheight">
      {loading ? <CircularProgress /> : rednerSuccess()}
    </div>
  )
}
