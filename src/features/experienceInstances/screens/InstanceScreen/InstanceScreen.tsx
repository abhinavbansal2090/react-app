import React, { FC, useContext } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Menu, MenuItem } from '@material-ui/core'
import moment from 'moment'
import { LocalizationContext } from 'lib/context'
import { getWebView } from 'lib/utils'
import { paths } from 'lib/navigation'
import { Header } from 'components/Header'
import {
  ExperienceInstanceRoutingParams,
  ExperienceRoutingParams,
} from 'lib/types/experience'
import { getIsRtl, getLanguageId } from 'features/locale/store/locale.selector'
import { SelectOption } from 'components/SelectOption/SelectOption'
import {
  contactOptions,
  contactOptionsEnum,
} from 'lib/constants/contactOptions'
import { getLabelsTranslationByLocale } from 'features/locale/utils'
import { postMessageNative } from 'lib/utils/postMessage'
import { Label } from '../../components'
import {
  getExperienceInstanceById,
  getExperienceName,
} from '../../store/experienceInstances.selectors'

export const InstanceScreen: FC = () => {
  const {
    t: {
      business: { instancesFields },
      experience: { guests },
    },
  } = useContext(LocalizationContext)
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [phoneNumber, setPhoneNumber] = React.useState('')

  const history = useHistory()
  const { experienceId: expIdString } = useParams<ExperienceRoutingParams>()
  const experienceId = Number.parseInt(expIdString)
  const { instanceId: instanceIdString } = useParams<
    ExperienceInstanceRoutingParams
  >()
  const instanceId = Number.parseInt(instanceIdString)
  const languageId = useSelector(getLanguageId)
  const isRtl = useSelector(getIsRtl)
  const experienceInstance = useSelector(getExperienceInstanceById(instanceId))
  const experienceName = useSelector(
    getExperienceName(experienceId, languageId)
  )

  const mainContainerStyle = {
    direction: isRtl ? ('rtl' as 'rtl') : ('ltr' as 'ltr'),
    paddingTop: 0,
  }

  if (!experienceInstance) {
    history.push(paths.experience(experienceId))
    return <></>
  }

  const getGuestsLimitValue = () => {
    const guestsLimitValue = `${
      experienceInstance.bookingLimit - experienceInstance.remainingSlots
    }/${experienceInstance.bookingLimit}`
    return isRtl
      ? `${guests.toLocaleLowerCase('ar')} ${guestsLimitValue}`
      : `${guestsLimitValue} ${guests.toLocaleLowerCase('en')}`
  }

  const handleClose = (index: number) => {
    setAnchorEl(null)
    onContactClick(index)
  }
  const onContact = (event: any, phoneNumber: string) => {
    if (getWebView()) {
      postMessageNative(`tel:${phoneNumber}`)
    } else {
      setPhoneNumber(phoneNumber)
      setAnchorEl(event.currentTarget)
    }
  }
  const onContactClick = (index: number) => {
    switch (index) {
      case contactOptionsEnum.Call:
        window.open(`tel:${phoneNumber}`, '_self')
        break
      case contactOptionsEnum.SMS:
        window.open(`sms://${phoneNumber}`, '_self')
        break
      case contactOptionsEnum.WhatsApp:
        window.open(
          `https://api.whatsapp.com/send?phone=${phoneNumber}`,
          '_self'
        )
        break
      default:
        break
    }
  }

  return (
    <>
      <Header
        hideBackButton={false}
        backButtonVariant={'back'}
        onBackDirection={paths.experience(experienceId)}
        title={moment(experienceInstance.time).format('DD/MM/YYYY, h:mm A')}
        subTitle={experienceName}
      />
      <div
        className="container container-fullheight guests-list__container"
        style={mainContainerStyle}
      >
        <Label name={instancesFields.guestsLimit} />
        <SelectOption title={getGuestsLimitValue()} />
        <Label name={''} />
        {experienceInstance.bookings.map((booking, idx) => (
          <>
            <SelectOption
              key={idx}
              onPress={(event: any) => {
                onContact(event, booking.user.phoneNumber)
              }}
              title={
                isRtl
                  ? `${booking.user.firstName} ${booking.user.lastName}`
                  : `${booking.user.lastName} ${booking.user.firstName}`
              }
            />
          </>
        ))}
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem
            onClick={() => {
              handleClose(contactOptionsEnum.Call)
            }}
          >
            {getLabelsTranslationByLocale(
              contactOptions[contactOptionsEnum.Call].title
            )}
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleClose(contactOptionsEnum.SMS)
            }}
          >
            {getLabelsTranslationByLocale(
              contactOptions[contactOptionsEnum.SMS].title
            )}
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleClose(contactOptionsEnum.WhatsApp)
            }}
          >
            {getLabelsTranslationByLocale(
              contactOptions[contactOptionsEnum.WhatsApp].title
            )}
          </MenuItem>
        </Menu>
      </div>
    </>
  )
}
