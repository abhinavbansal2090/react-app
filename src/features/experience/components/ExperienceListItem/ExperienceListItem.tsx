import React, { FC } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { paths } from 'lib/navigation'
import { icons } from 'assets'
import { Experience } from 'lib/models'
import { useExperienceTranslationByLocale } from 'lib/hooks'
import { withRtl } from 'lib/utils'
import { getIsRtl } from 'features/locale/store/locale.selector'
import './ExperienceListItem.scss'
import { NumberOfInstancesText } from './NumberOfInstancesText'

type Props = {
  experience: Experience
  onArchiveClick: (id: number) => void
}

export const ExperienceListItem: FC<Props> = ({
  experience,
  onArchiveClick,
}) => {
  const history = useHistory()
  const isRtl = useSelector(getIsRtl)
  const { description } = useExperienceTranslationByLocale(experience)
  const onExperienceClick = () => {
    history.push(paths.experience(experience.id))
  }
  const onClickArchiveExperience = () => {
    onArchiveClick(experience.id)
  }

  return (
    <div className="experience-list-item__container">
      {experience.isArchived ? (
        ''
      ) : (
        <div
          onClick={onClickArchiveExperience}
          className={
            isRtl
              ? 'experience-list-item__archive-icon experience-list-item__archive-icon--rtl'
              : 'experience-list-item__archive-icon'
          }
        >
          <img
            className={'experience-list-item__archive-icon-img'}
            src={icons.archive}
            alt={'archive'}
          />
        </div>
      )}
      <div onClick={onExperienceClick}>
        <div className="experience-list-item__image-container">
          <img
            className="experience-list-item__image"
            src={experience.images[0]?.imageUrl}
            alt={description?.name}
          />
        </div>
        <div className="experience-list-item__texts-container">
          <p className={withRtl('experience-list-item__name')}>
            {description?.name}
          </p>
          <NumberOfInstancesText experience={experience} />
        </div>
      </div>
    </div>
  )
}
