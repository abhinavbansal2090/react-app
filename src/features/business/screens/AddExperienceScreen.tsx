import React, { FC, useContext, useState } from 'react'
import Modal from '@material-ui/core/Modal'
import { useHistory } from 'react-router-dom'
import { store } from 'lib/store/store'
import { ButtonBig } from 'components/Button/ButtonBig'
import { routes } from 'lib/navigation'
import { LocalizationContext } from 'lib/context'
import { businessSlice } from '../store/business.slice'
import {
  ActivitiesScreen,
  AudienceScreen,
  BasicInfoScreen,
  LocationScreen,
  PhotoScreen,
  SelectCategoryScreen,
  SelectRegionScreen,
  SubmitScreen,
} from './AddExperience'

export const clearFlow = (history: any) => {
  store.dispatch(businessSlice.actions.clearAllFilters())
  history.push(routes.manage)
}

export const AddExperienceScreen: FC = () => {
  const history = useHistory()
  const {
    t: { business },
  } = useContext(LocalizationContext)
  const [step, updateStep] = useState(1)
  const [modal, showModal] = useState(false)
  const manageSteps = () => {
    switch (step) {
      case 1:
        return (
          <SelectCategoryScreen
            step={step}
            onClickBack={showModal}
            updateStep={updateStep}
          />
        )
      case 2:
        return (
          <SelectRegionScreen
            step={step}
            onClickBack={showModal}
            updateStep={updateStep}
          />
        )
      case 3:
        return (
          <LocationScreen
            step={step}
            onClickBack={showModal}
            updateStep={updateStep}
          />
        )
      case 4:
        return (
          <BasicInfoScreen
            step={step}
            onClickBack={showModal}
            updateStep={updateStep}
          />
        )
      case 5:
        return (
          <AudienceScreen
            step={step}
            onClickBack={showModal}
            updateStep={updateStep}
          />
        )
      case 6:
        return (
          <ActivitiesScreen
            step={step}
            onClickBack={showModal}
            updateStep={updateStep}
          />
        )
      case 7:
        return (
          <PhotoScreen
            step={step}
            onClickBack={showModal}
            updateStep={updateStep}
          />
        )
      case 8:
        return <SubmitScreen />
      default:
        return <>Error</>
    }
  }

  return (
    <>
      {manageSteps()}
      <Modal
        className="modal"
        onClose={() => {
          showModal(false)
        }}
        open={modal}
      >
        <div className="exit_modal modal__container">
          <p className="modal__title">
            {business.discardNewExperienceModal.title}
          </p>
          <p className="modal__subtitle">
            {business.discardNewExperienceModal.subtitle}
          </p>
          <ButtonBig
            title={business.discardNewExperienceModal.discardCTA}
            onPress={() => {
              showModal(false)
              clearFlow(history)
            }}
          />
          <ButtonBig
            variant="outlined"
            title={business.discardNewExperienceModal.goBackCTA}
            onPress={() => {
              showModal(false)
            }}
          />
        </div>
      </Modal>
    </>
  )
}
