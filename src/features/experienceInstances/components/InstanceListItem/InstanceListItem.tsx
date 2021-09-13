import React, { CSSProperties, FC, useContext } from 'react'
import moment from 'moment'
import { ExperienceInstance } from 'lib/models'
import { icons } from 'assets'
import { LocalizationContext } from 'lib/context'
import { getDaysFromDuration, getHoursFromDuration, withRtl } from 'lib/utils'
import './InstanceListItem.scss'

type Props = {
  experienceInstance: ExperienceInstance
  onClick: () => void
  showBin?: boolean
  onBinClick?: () => void
}

type TextWithIconProps = {
  icon: any
  styles?: CSSProperties
}

export const InstanceListItem: FC<Props> = ({
  experienceInstance,
  onClick,
  onBinClick,
  showBin,
}) => {
  const { t, isRtl } = useContext(LocalizationContext)
  const {
    remainingSlots,
    bookingLimit,
    duration,
    price,
    time,
  } = experienceInstance
  const seatsOccupied = bookingLimit - remainingSlots

  const getDuration = () => {
    const days = getDaysFromDuration(Number(duration))

    const daysToDisplay = `${
      days > 0
        ? isRtl
          ? `${t.experience.d} ${days}`
          : `${days} ${t.experience.d}`
        : ''
    }`

    return isRtl
      ? `${t.experience.h} ${getHoursFromDuration(
          Number(duration)
        )} ${daysToDisplay}`
      : `${daysToDisplay} ${getHoursFromDuration(Number(duration))} ${
          t.experience.h
        }`
  }

  return (
    <div className={withRtl('instance-list-item__container')} onClick={onClick}>
      <div className={withRtl('instance-list-item__container-top')}>
        <div>
          <TextWithIcon icon={icons.calendar}>
            {moment(time).format('DD/MM/YYYY, h:mm A')}
          </TextWithIcon>
          <div className={withRtl('instance-list-item__container-inline')}>
            <TextWithIcon icon={icons.clock}>{getDuration()}</TextWithIcon>
            <TextWithIcon icon={icons.label}>
              {price} {t.experience.sar}
            </TextWithIcon>
          </div>
        </div>
        <TextWithIcon icon={icons.users}>
          {isRtl
            ? `${t.experience.guests} ${bookingLimit}\\${seatsOccupied}`
            : `${seatsOccupied}/${bookingLimit} ${t.experience.guests}`}
        </TextWithIcon>
      </div>
      {showBin && onBinClick && (
        <div
          className={withRtl('instance-list-item__bin-icon-btn')}
          onClick={(event) => {
            event.stopPropagation()
            onBinClick()
          }}
        >
          <img
            alt={''}
            src={icons.bin}
            className={withRtl('instance-list-item__bin-icon')}
          />
        </div>
      )}
    </div>
  )
}

const TextWithIcon: FC<TextWithIconProps> = ({ children, icon }) => {
  return (
    <div className={withRtl('instance-list-item__text-with-icon')}>
      <img
        alt={''}
        src={icon}
        className={withRtl('instance-list-item__icon')}
      />
      {children}
    </div>
  )
}
