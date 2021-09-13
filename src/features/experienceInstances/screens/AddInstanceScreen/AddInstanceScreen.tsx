import React, { FC, useContext, useEffect, useState } from 'react'
import { Property } from 'csstype'
import { NativeSelect, TextField } from '@material-ui/core'
import { useHistory, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { paths } from 'lib/navigation'
import { LocalizationContext } from 'lib/context'
import { useCustomTextInputStyle, withRtl } from 'lib/utils'
import { ExperienceRoutingParams } from 'lib/types/experience'
import { Header } from 'components/Header'
import { ButtonBig } from 'components/Button/ButtonBig'
import { experienceInstancesSlice } from 'features/experienceInstances/store/experienceInstances.slice'
import { getIsRtl, getLanguageId } from 'features/locale/store/locale.selector'
import { Selector } from 'features/business/components/Selector'
import { store } from 'lib/store/store'
import {
  getCreatedExperienceInstanceAdd,
  getDidErrorOccur,
  getDidSendSuccessfully,
  getExperienceName,
  getIsSending,
  getMapObject,
} from '../../store/experienceInstances.selectors'
import { Label } from '../../components'
import { isRequiredDataExists } from './AddInstanceScreen.helpers'

import './AddInstanceScreen.scss'

export const AddInstanceScreen: FC = () => {
  const {
    t: {
      business: {
        continue: saveAndContinue,
        instancesFields,
        saveAndAddAnother,
        maps,
        instanceSendingMessages,
        placeholders: { instances: instancesPlaceholders },
      },
    },
  } = useContext(LocalizationContext)
  const experienceInstanceAdd = useSelector(getCreatedExperienceInstanceAdd)
  const [time, setTime] = useState(experienceInstanceAdd?.time || '')
  const [durationHours, setDurationHours] = useState(() => {
    const duration = experienceInstanceAdd?.duration || 0

    return Math.floor(duration % 24)
  })
  const [durationDays, setDurationDays] = useState(() => {
    const duration = experienceInstanceAdd?.duration || 0

    return Math.floor(duration / 24)
  })
  const [price, setPrice] = useState(experienceInstanceAdd?.price || 0)
  const [bookingLimit, setBookingLimit] = useState(
    experienceInstanceAdd?.bookingLimit || 0
  )
  const [exitScreen, setExitScreen] = useState(false)
  const history = useHistory()
  const { experienceId: expIdString } = useParams<ExperienceRoutingParams>()
  const experienceId = Number.parseInt(expIdString)
  const languageId = useSelector(getLanguageId)
  const map = useSelector(getMapObject)
  const didErrorOccur = useSelector(getDidErrorOccur)
  const didSendSuccessfully = useSelector(getDidSendSuccessfully)
  const isSending = useSelector(getIsSending)
  const experienceName = useSelector(
    getExperienceName(experienceId, languageId)
  )
  const isRtl = useSelector(getIsRtl)
  const dispatch = useDispatch()
  const textFieldClasses = useCustomTextInputStyle()

  useEffect(() => {
    if (!didErrorOccur && !isSending && exitScreen) {
      history.push(paths.experience(experienceId))
    }
  }, [didErrorOccur, isSending, exitScreen, history, experienceId])

  const validateInputs = () =>
    isRequiredDataExists({
      experienceId,
      time,
      bookingLimit,
      price,
      map,
      durationHours,
      durationDays,
    })

  const textFieldInputProps = {
    classes: textFieldClasses,
    style: {
      paddingLeft: 16,
      paddingRight: 16,
      direction: isRtl ? 'rtl' : ('ltr' as Property.Direction),
    },
  }
  const textFieldInputStyle = {
    display: 'flex',
    direction: isRtl ? 'rtl' : ('ltr' as Property.Direction),
  }
  const onPress = () => {
    if (map) {
      const { rallyLocation, latitude, longitude } = map
      dispatch(
        experienceInstancesSlice.actions.postExperienceInstance({
          experienceId: experienceId,
          time,
          bookingLimit,
          price,
          rallyLocation,
          latitude,
          longitude,
          duration: durationDays * 24 + durationHours, // DURATION IS STORED IN HOURS
        })
      )
    }
  }

  const onPressMeetingPoint = () => {
    store.dispatch(
      experienceInstancesSlice.actions.setExperienceInstance({
        experienceId,
        time,
        bookingLimit,
        price,
        duration: durationDays * 24 + durationHours, // DURATION IS STORED IN HOURS
      })
    )
    history.push(paths.addExperienceInstanceMap(experienceId))
  }

  return (
    <>
      <Header
        hideBackButton={false}
        onBackDirection={paths.experience(experienceId)}
        title={instancesFields.newInstance}
        subTitle={experienceName}
      />
      <div className="add-instance__container">
        <Label name={instancesFields.dateAndTime} />
        <TextField
          placeholder={instancesPlaceholders.dateAndTime}
          type="datetime-local"
          InputProps={textFieldInputProps}
          style={textFieldInputStyle}
          value={time}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setTime(e.currentTarget.value)
          }
        />
        <div>
          <Label name={instancesFields.duration} />
          <div className={withRtl('add-instance__native-select-container')}>
            <NativeSelect
              value={durationDays}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                setDurationDays(Number(e.currentTarget.value))
              }
            >
              {Array(14)
                .fill('')
                .map((_, idx) => (
                  <option
                    key={`duration-days-${idx}`}
                    value={idx}
                  >{`${idx} ${instancesFields.days}`}</option>
                ))}
            </NativeSelect>
            <NativeSelect
              value={durationHours}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                setDurationHours(Number(e.currentTarget.value))
              }
            >
              {Array(24)
                .fill('')
                .map((_, idx) => (
                  <option
                    key={`duration-hours-${idx}`}
                    value={idx}
                  >{`${idx} ${instancesFields.hours}`}</option>
                ))}
            </NativeSelect>
          </div>
        </div>
        <Label name={instancesFields.price} />
        <TextField
          InputProps={textFieldInputProps}
          placeholder={instancesPlaceholders.price}
          type="number"
          value={price > 0 ? price : undefined}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPrice(Number(Number(e.currentTarget.value).toFixed(2)))
          }
        />
        <Label name={instancesFields.guestsLimit} />
        <TextField
          InputProps={textFieldInputProps}
          style={textFieldInputStyle}
          value={bookingLimit > 0 ? bookingLimit : undefined}
          placeholder={instancesPlaceholders.guestsLimit}
          type="number"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setBookingLimit(Number(e.currentTarget.value))
          }
        />
        <Label name={maps.meetingPoint} />
        <Selector
          text={
            map?.rallyLocation === undefined
              ? maps.select
              : map.rallyLocation[languageId - 1].location
          }
          onPress={onPressMeetingPoint}
        />
        <div className="add-instance__msg-container">
          {!isSending && didErrorOccur && (
            <p className="add-instance__error">
              {instanceSendingMessages.error}
            </p>
          )}
          {!isSending && didSendSuccessfully && (
            <p className="add-instance__continue">
              {instanceSendingMessages.continue}
            </p>
          )}
        </div>
        <div className="add-instance__btn-container">
          <ButtonBig
            title={saveAndContinue}
            type="full"
            customStyle={{
              marginTop: 16,
            }}
            disabled={!validateInputs() || isSending}
            onPress={() => {
              setExitScreen(false)
              onPress()
              setExitScreen(true)
            }}
          />
          <ButtonBig
            title={saveAndAddAnother}
            type="full"
            variant={'outlined'}
            customStyle={{
              marginTop: 16,
              marginBottom: 16,
            }}
            disabled={!validateInputs() || isSending}
            onPress={onPress}
          />
        </div>
      </div>
    </>
  )
}
