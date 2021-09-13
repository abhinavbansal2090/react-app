import React, { FC, useContext } from 'react'
import { Experience } from 'lib/models'
import { withRtl } from 'lib/utils'
import { LocalizationContext } from 'lib/context'
import './ExperienceListItem.scss'

type Props = {
  experience: Experience
}

export const NumberOfInstancesText: FC<Props> = ({ experience }) => {
  const { t } = useContext(LocalizationContext)
  const numOfInstancesText =
    experience.instanceCount === 1
      ? `1 ${t.experience.instance}`
      : `${experience.instanceCount} ${t.experience.instances}`

  if (experience.isArchived) {
    return (
      <p
        className={withRtl(
          'experience-list-item__instance-text experience-list-item__instance-text--single'
        )}
      >
        {t.experience.archived}
      </p>
    )
  } else {
    return experience.isApproved ? (
      <p
        className={
          !experience.instanceCount
            ? withRtl('experience-list-item__instance-text')
            : `${withRtl(
                'experience-list-item__instance-text'
              )} experience-list-item__instance-text--single`
        }
      >
        {!experience.instanceCount
          ? t.experience.addNewInstances
          : numOfInstancesText}
      </p>
    ) : (
      <p
        className={`${withRtl(
          'experience-list-item__instance-text'
        )} experience-list-item__instance-text--not-verified`}
      >
        {t.experience.notVerified}
      </p>
    )
  }
}
