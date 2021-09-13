import React, { FC, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { LocalizationContext } from 'lib/context'
import { ButtonBig } from 'components/Button/ButtonBig'
import { paths } from 'lib/navigation'
import './NoExperienceInstances.scss'

type NoExperienceInstancesProps = {
  experienceId: number
}

export const NoExperienceInstances: FC<NoExperienceInstancesProps> = ({
  experienceId,
}) => {
  const {
    t: {
      business: { addNewInstance, helper },
    },
  } = useContext(LocalizationContext)
  const history = useHistory()

  return (
    <div className="no-experience-instances__add-new-container">
      <p className="no-experience-instances__title">{helper.addInstance}</p>
      <div className="no-experience-instances__add-new-btn">
        <ButtonBig
          title={addNewInstance}
          type="full"
          onPress={() =>
            history.push(paths.addExperienceInstance(experienceId))
          }
        />
      </div>
    </div>
  )
}
